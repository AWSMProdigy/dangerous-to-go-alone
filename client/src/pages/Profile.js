import React, { useState, useEffect }  from 'react';
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
    username: "",
    descText: "",
    fromTime: "",
    toTime: "",
    platformText: "",
    allowEdit: false,
    friends: []
  })

  useEffect(() => {
    if(!loading){
      setUserText({
        username: user?.username,
        descText: user?.description || "",
        fromTime: user?.fromTime || "",
        toTime: user?.toTime || "",
        platformText: user?.platform || "",
        allowEdit: userText.allowEdit,
        friends: user?.friends || []
      })
    }
    else{
      return (<h1>loading</h1>)
    }
  }, [loading]);
  

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
          fromTime: from,
          toTime: to
        }
      })
    }
    catch(err){
      console.error(err);
    }
  }

  const handlePlatformChange = async (platforms) => {
    try {
      const { data } = await updatePlatform({
        variables: {
          platform: platforms
        }
      })
      return platforms;
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
    handleDescChange(event.target.descInput.value.trim());
    console.log(event.target.toTime.value);
    console.log(event.target.fromTime.value);
    const pcString = event.target.pcInput.checked ? "PC " : "";
    const playstationString = event.target.playstationInput.checked ? "Playstation " : "";
    const xboxString = event.target.xboxInput.checked ? "Xbox " : "";
    const switchString = event.target.switchInput.checked ? "Switch " : "";
    const mobileString = event.target.mobileInput.checked ? "Mobile" : "";
    const platforms = pcString + playstationString + xboxString + switchString + mobileString
    handlePlatformChange(platforms);
    handleAvailabilityChange(event.target.fromTime.value, event.target.toTime.value);
    setUserText({
      username: userText.username,
      descText: event.target.descInput.value.trim(),
      fromTime: event.target.fromTime.value,
      toTime: event.target.toTime.value,
      platformText: platforms,
      allowEdit: false,
      friends: userText.friends
    });
  }

  const myProfile = userParam === undefined;
  // redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/me" />;
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
        <form className="form-inline input-group" id="searchFriend" onSubmit={() => handleFriendSubmit()}>
            <input className="form-control mr-sm-2" type="search" placeholder="Find a friend" aria-p="Search" id="searchInput"></input>
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
    const pcChecked = userText.platformText.includes("PC");
    const xboxChecked = userText.platformText.includes("Xbox");
    const playstationChecked = userText.platformText.includes("Playstation");
    const switchChecked = userText.platformText.includes("Switch");
    const mobileChecked = userText.platformText.includes("Mobile");
    if(userText.allowEdit){
      return(
        <form className="ml-2" onSubmit={handleProfileEdit}>
          <p htmlFor="Description"><b>Edit Description</b></p>
          <input className="description-input" name="Description" type="text" id="descInput" defaultValue={userText.descText}/>
          <p className="mt-2"><b>My Platforms</b></p>
          <div className="col-12 d-flex flex-wrap">
              <div className="d-flex flex-wrap flex-column col-6">
                <div className="col-lg-2 flex-row align-items-baseline">
                  <input type="checkbox" value="PC" id="pcInput" defaultChecked={pcChecked}></input>
                  <p className="ml-1">PC</p>
                </div>
                <div className="col-2 flex-row align-items-baseline">
                  <input type="checkbox" value="PC" id="playstationInput" defaultChecked={playstationChecked}></input>
                  <p className="ml-1">Playstation</p>
                </div>
                <div className="col-2 flex-row align-items-baseline">
                  <input type="checkbox" value="PC" id="xboxInput" defaultChecked={xboxChecked}></input>
                  <p className="ml-1">Xbox</p>
                </div>
              </div>
              <div className="d-flex flex-wrap flex-column col-6">
                <div className="col-2 flex-row align-items-baseline">
                  <input type="checkbox" value="PC" id="switchInput" defaultChecked={switchChecked}></input>
                  <p className="ml-1">Switch</p>
                </div>
                <div className="col-2 flex-row align-items-baseline">
                  <input type="checkbox" value="PC" id="mobileInput" defaultChecked={mobileChecked}></input>
                  <p className="ml-1">Mobile</p>
                </div>
              </div>
          </div>
          <p className="mt-2" htmlFor="Availability"><b>Edit Availability</b></p>
          <select className="time-select"name="Availability" type="text" id="fromTime" defaultValue={userText.fromTime}>
            <TimeOptions/>
          </select>
          <select className="time-select" name="Availability" type="text" id="toTime" defaultValue={userText.toTime}>
            <TimeOptions/>
          </select>
          <br></br>
          <button className="custom-btn" type="submit" value="Submit">Save</button>
        </form>
      )
    }
  }

  function ShowEditBtn(props){
    if(myProfile && !userText.allowEdit){
      return(
        <button className="custom-btn ml-2" onClick={() => setUserText({
          username: userText.username,
          descText: userText.descText,
          fromTime: userText.fromTime,
          toTime: userText.toTime,
          platformText: userText.platformText,
          allowEdit: true,
          friends: userText.friends
        })}
        >Edit Profile</button>
      )
    }  
    return(
      <EditPage/>
    )
  }

  console.log(loading);

  if(loading){
    return(<h1>Loading...</h1>);
  }

  return (
    <div className="container">
    <div className="row py-3">
        <div className="col-sm-12 col-md-3 order-2" id="sticky-sidebar">
            <div className="sticky-top navbar-expand-md cond-sidebar-wrapper">
                <div className="flex-column">
                <div className="sidebarBtn-wrapper">
                  <button id="custom-toggler"class="navbar-toggler" type="button" data-toggle="collapse" data-target="#sidebarNav">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="30" fill="#f00" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                    </svg>
                  </button>
                </div>
                <div className="navbar-collapse sidebar-medium" id="sidebarNav">
                  <div className="friends-search-bar">
                      <Link className="navItem" to="/search">
                        <form className="form-inline input-group" id="searchFriend" onSubmit={handleFriendSubmit}>
                          <input className="form-control mr-sm-2" type="search" placeholder="Find a friend" aria-p="Search" id="searchInput"></input>
                          <button className="friends-btn my-5 my-sm-0" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                          </button>
                        </form>
                      </Link>
                  </div>
                  <div className="sidebar">
                      <h4><b>Games</b> <span className="red-text">86</span></h4>
                      <h4 className="mt-2"><b>Groups</b> <span className="red-text">3</span></h4>
                      <h4 className="mt-2"><b>Friends</b> <span className="red-text">18</span></h4>
                      {userText.friends.map((friend, index) => (
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
        </div>

        <div className="col col-md-9" id="main">
          <div className="row">
            <img id="profile-img" className="img-fluid col-lg-6 col-md-12 col-sm-10" src={profile} alt=""></img>
            <div className="col-md-12 col-lg-6">
              <h2 className="mb-3 mt-4 d-flex justify-content-start">
              <svg id="online-icon" className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#2aeb3d" class="bi bi-circle-fill" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="8"/></svg>
                {`${userText.username}'s`} Profile 
              </h2>
              <h6 className="ml-2"><b>Platforms:</b>{`${userText.platformText}`}</h6>
              <h6 className="mt-2 ml-2"><b>Availability:</b>{`${userText.fromTime}`} to {`${userText.toTime}`}</h6>
              <p className="mt-2 ml-2 mt-4">{`${userText.descText}`}</p>
              <ShowEditBtn/>
            </div>
          </div>

          <div className="row mt-5 mb-4 d-flex flex-wrap">
            <h2 className="play-sm ml-2">Wanna Play With Me?</h2>
            <div className="col-md-12">
              <div className="mt-2 d-flex flex-wrap ml-2">
                <div className="col-sm-12 col-md-6 col-lg-3 prof-games-sm play-sm">
                  <Link to="/game/:title">
                    <img className="scheduled-game mt-3" src={stardew} alt="Pixel house in front of mountains"></img>
                  </Link>
                    <h6 className="mt-3 red-text"><b>Sat, Dec 11</b></h6>
                    <p className="small"> 7:00pm - 9:00pm EST</p>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3 prof-games-sm play-sm">
                  <Link to="/game/:title">
                    <img className="scheduled-game mt-3" src={mario} alt="Mario characters riding go kart's on a rainbow track"></img>
                  </Link>
                    <h6 className="mt-3 red-text"><b>Sun, Dec 12</b></h6>
                    <p className="small"> 6:00pm - 10:00pm EST</p>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3 prof-games-sm play-sm">
                  <Link to="/game/:title">
                    <img className="scheduled-game mt-3" src={itTakes2} alt="Two small people flying on a dandelion"></img>
                  </Link>
                    <h6 className="mt-3 red-text"><b>Wed, Dec 15</b></h6>
                    <p className="small"> 9:00pm - 11:00pm EST</p>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3 prof-games-sm play-sm">
                  <Link to="/game/:title">
                    <img className="scheduled-game mt-3" src={ac} alt="Animated human and animal characters in a campsite"></img>
                  </Link>
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

