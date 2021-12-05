import React, { useState }  from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import "../../src/styles.css";
import profile from "../assets/images/profile/profile.jpg";

import stardew from "../assets/images/profile/stardew.jpg";
import mario from "../assets/images/profile/mariokart.jpg";
import itTakes2 from "../assets/images/profile/ittakes2.jpg";
import ac from "../assets/images/profile/ac.jpg";

import { ADD_FRIEND, REMOVE_FRIEND, ADD_GAME, REMOVE_GAME, UPDATE_GAMES, UPDATE_AVAILABILITY, UPDATE_PLATFORM, UPDATE_DESC } from '../utils/mutations';
import { useMutation } from '@apollo/client';


import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [descText, setDesc] = useState('');
  const [availabilityText, setAvailability] = useState('');
  const [platformText, setPlatform] = useState('');
  const [allowEdit, setEdit] = useState(false);

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  console.log(data);

  const [addFriend] = useMutation(ADD_FRIEND);
  const [removeFriend] = useMutation(REMOVE_FRIEND);
  const [addGame] = useMutation(ADD_GAME);
  const [removeGame] = useMutation(REMOVE_GAME);
  const [updateGame] = useMutation(UPDATE_GAMES);
  const [updateAvailability] = useMutation(UPDATE_AVAILABILITY);
  const [updatePlatform] = useMutation(UPDATE_PLATFORM);
  const [updateDesc] = useMutation(UPDATE_DESC);


  const handleFriendSubmit = async (event) => {
    event.preventDefault();
    console.log(event.target.searchInput.value);
    try {
      const { data } = await addFriend({
        variables: {
          friendName: event.target.searchInput.value.trim()
        }
      })
    }
    catch(err){
      console.error(err);
    }
  }

  const handleFriendDelete = async (event) => {
    event.preventDefault();
    try {
      const { data } = await removeFriend({
        variables: {
          friendName: event.target.searchInput.value.trim()
        }
      })
    }
    catch(err){
      console.error(err);
    }
  }

  const handleAvailabilityChange = async (event) => {
    event.preventDefault();
    try {
      const { data } = await updateAvailability({
        variables: {
          availability: event.target.searchInput.value.trim()
        }
      })
    }
    catch(err){
      console.error(err);
    }
  }

  const handlePlatformChange = async (event) => {
    event.preventDefault();
    try {
      const { data } = await updatePlatform({
        variables: {
          platform: event.target.searchInput.value.trim()
        }
      })
    }
    catch(err){
      console.error(err);
    }
  }

  const user = data?.me || data?.user || {};
  const myProfile = userParam === undefined;
  console.log(userParam);
  console.log(myProfile);
  // redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (!user?.username) {
  //   return (
  //     <h4>
  //       You need to be logged in to see this. Use the navigation links above to
  //       sign up or log in!
  //     </h4>
  //   );
  // }

  function ShowFriendSearch(props){
    if(myProfile){
      return (
        <form className="form-inline input-group" id="searchFriend" onSubmit={handleFriendSubmit}>
            <input className="form-control mr-sm-2" type="search" placeholder="Find a friend" aria-label="Search" id="searchInput"></input>
            <button className="friends-btn my-5 my-sm-0" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                  </svg>
            </button>
          </form>
      )
    }
    return(<></>)
  }

  function ShowEditBtn(props){
    if(myProfile && !allowEdit){
      return(
        <button onClick={() => setEdit(!allowEdit)}></button>
      )
    }  
    return(<></>)
  }

  function EditPage(props){
    if(allowEdit){
      // return(
        
      // )
    }
  }


  return (
    <div className="container">
    <div className="row py-3">
        <div className="col-3 order-2" id="sticky-sidebar">
            <div className="sticky-top">
                <div className="flex-column">
                <div className="friends-search-bar">
                    <ShowFriendSearch/>
                </div>
                <div className="sidebar">
                    <h4><b>Games</b> <span className="red-text">86</span></h4>
                    <h4 className="mt-2"><b>Groups</b> <span className="red-text">3</span></h4>
                    <h4 className="mt-2"><b>Friends</b> <span className="red-text">18</span></h4>
                    {user.friends.map((friend, index) => (
                        <Link className="profile-sidebar-link" to={`/profiles/${friend}`}>
                          <p key={index} className="mt-1">{friend}</p>
                        </Link>
                    ))}
                      <h4 className="mt-3"><b>Quick Links</b></h4>
                    <Link className="profile-sidebar-link" to="/wishlist">
                      <p className="mt-1">Wish List</p>
                    </Link>
                    <Link className="profile-sidebar-link" to="/Library">
                      <p className="">Library</p>
                    </Link>
                </div>
                </div>
            </div>
        </div>
        <div className="col" id="main">
          <div className="row">
            <img className="img-fluid profile-img col-5" src={profile} alt=""></img>
            <div className="col-7">
              <h2 className="mb-3 mt-4 d-flex justify-content-start">
              <svg id="online-icon" className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#2aeb3d" class="bi bi-circle-fill" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="8"/></svg>
                {`${user.username}'s`} Profile 
              </h2>
              <h6 className="ml-2"><b>Platforms:</b> PC, Switch, Playstation</h6>
              <h6 className="mt-2 ml-2"><b>Last Online:</b> Now</h6>
              <p className="mt-2 ml-2 mt-4">Hey, I'm Sarah. I play all types of games but particularly enjoy multiplayer on PC, Switch, and Playstation. I'm into more casual games so if you're into Stardew Valley, Animal Crossing, or Mario Kart, let's play together! </p>
              <ShowEditBtn/>
            </div>

          </div>
          <div className="row mt-5 mb-4">
            <h2>Upcoming Schedule</h2>
            <div>
              <div className="col-12 flex-row mt-2">
                <div className="col-3">
                    <img className="scheduled-game mt-3" src={stardew} alt="Pixel house in front of mountains"></img>
                    <h6 className="mt-3 red-text"><b>Sat, Dec 11</b></h6>
                    <p className="small"> 7:00pm - 9:00pm EST</p>
                </div>
                <div className="col-3 ml-4">
                    <img className="scheduled-game mt-3" src={mario} alt="Pixel house in front of mountains"></img>
                    <h6 className="mt-3 red-text"><b>Sun, Dec 12</b></h6>
                    <p className="small"> 6:00pm - 10:00pm EST</p>
                </div>
                <div className="col-3 ml-4">
                    <img className="scheduled-game mt-3" src={itTakes2} alt="Pixel house in front of mountains"></img>
                    <h6 className="mt-3 red-text"><b>Wed, Dec 15</b></h6>
                    <p className="small"> 9:00pm - 11:00pm EST</p>
                </div>
                <div className="col-3">
                    <img className="scheduled-game mt-3" src={ac} alt="Pixel house in front of mountains"></img>
                    <h6 className="mt-3 red-text"><b>Fri, Dec 17</b></h6>
                    <p className="small"> 10:00pm - 1:00pm EST</p>
                </div>
                
              </div>
            </div>
          </div>
        </div>

    </div>
  </div>
  );
};

export default Profile;

