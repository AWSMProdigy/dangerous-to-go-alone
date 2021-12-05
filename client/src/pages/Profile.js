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
    const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  const user = data?.me || data?.user || {};
  const [userText, setUserText] = useState({
    descText: user?.description,
    fromTime: user?.fromTime,
    platformText: user?.platform,
    allowEdit: false
  })

  

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

  const handleAvailabilityChange = async (from, to) => {
    try {
      const { data } = await updateAvailability({
        variables: {
          from: from,
          to: to
        }
      })
    }
    catch(err){
      console.error(err);
    }
  }

  const handlePlatformChange = async (pc, playstation, xbox, nintendo) => {
    const pcString = pc ? "PC, " : "";
    const playstationString = playstation ? "Playstation, " : "";
    const xboxString = xbox ? "Xbox, " : "";
    const switchString = nintendo ? "Switch" : "";
    const platforms = `${pcString, playstationString, xboxString, switchString}`
    try {
      const { data } = await updatePlatform({
        variables: {
          platform: platforms
        }
      })
    }
    catch(err){
      console.error(err);
    }
  }

  const handleDescChange = async (description) => {
    try{
      const { data } = await updateDesc({
        variables: {
          description: description
        }
      })
    }
    catch(err){
      console.error(err);
    }
  }

  const handleProfileEdit = async (event) => {
    event.preventDefault();
    console.log(event);
    handleDescChange(event.target.descInput.value.trim());
    handlePlatformChange(event.target.pcInput.value, event.target.xboxInput.value, event.target.playstationInput.value, event.target.switchInput.value);
    handleAvailabilityChange(event.target.fromTime.value, event.target.toTime.value);
    setUserText({allowEdit: false});
  }

  const myProfile = userParam === undefined;
  console.log(myProfile);
  // redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/me" />;
  }

  if (!loading) {
    setUserText({
      descText: user?.description,
      fromTime: user?.fromTime,
      platformText: user?.platform,
      allowEdit: userText.allowEdit
    })
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

  function TimeOptions(){
    const n = 12;
    const AMarray = [...Array(n)].map((e, i) => <option value={`${i+1} AM`}>{`${i+1} AM`}</option>)
    const PMarray = [...Array(n)].map((e, i) => <option value={`${i+1} PM`}>{`${i+1} PM`}</option>)
    const fullArray = [...AMarray, ...PMarray];
    return(
      fullArray
    )
  }

  function EditPage(props){
    if(userText.allowEdit){
      return(
        <form onSubmit={handleProfileEdit}>
          <label htmlFor="Description">Edit Description</label>
          <input name="Description" type="text" id="descInput"/>
          <label>My Platforms</label>
          <div>
            <label>PC</label>
            <input type="radio" value="PC" id="pcInput"></input>
            <label>PS5</label>
            <input type="radio" value="PS5" id="playstationInput"></input>
            <label>Xbox</label>
            <input type="radio" value="Xbox" id="xboxInput"></input>
            <label>Switch</label>
            <input type="radio" value="Switch" id="switchInput"></input>
          </div>
          <label htmlFor="Availability">Edit Availability</label>
          <select name="Availability" type="text" id="fromTime">
            <TimeOptions/>
          </select>
          <select name="Availability" type="text" id="toTime">
            <TimeOptions/>
          </select>
          <br></br>
          <input type="submit" value="Submit" />
        </form>
      )
    }
  }

  function ShowEditBtn(props){
    if(myProfile && !userText.allowEdit){
      return(
        <button onClick={() => setUserText(setUserText({allowEdit: true}))}></button>
      )
    }  
    return(
      <EditPage/>
    )
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
              <h6 className="ml-2"><b>Platforms:</b>{`${userText.platformText}`}</h6>
              <h6 className="mt-2 ml-2"><b>Last Online:</b> Now</h6>
              <p className="mt-2 ml-2 mt-4">{`${userText.descText}`}</p>
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

