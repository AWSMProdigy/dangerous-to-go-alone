import React, { useState, useEffect }  from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import "../../src/styles.css";
import profile from "../assets/images/profile/profile.jpg";

import { ADD_FRIEND, REMOVE_FRIEND, ADD_GAME, REMOVE_GAME, UPDATE_GAMES, UPDATE_AVAILABILITY, UPDATE_PLATFORM, UPDATE_DESC, UPDATE_DISCORD, UPDATE_XBOX, UPDATE_STEAM, UPDATE_PLAYSTATION, UPLOAD_FILE, UPDATE_PROFPIC, UPDATE_ME } from '../utils/mutations';
import { useMutation } from '@apollo/client';




import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { username: userParam } = useParams();
  

  
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  const [showSteam, setSteam] = useState(false);
  const [showXbox, setXbox] = useState(false);
  const [showPlaystation, setPlaystation] = useState(false);
  const [refresh, useRefresh] = useState(false);
  const [allowEdit, setAllowEdit] = useState(false);
  const [userText, setUserText] = useState({
    username: "",
    descText: "",
    fromTime: "",
    toTime: "",
    platformText: "",
    friends: [],
    games: [],
    discord: "",
    steam: "",
    xbox: "",
    playstation: "",
    profPic: "",
    playstyle: ""
  })

  

  useEffect(() => {
    if(!loading){
      setUserText({
        username: user?.username,
        descText: user?.description || "",
        fromTime: user?.fromTime || "",
        toTime: user?.toTime || "",
        platformText: user?.platform || "",
        friends: user?.friends || [],
        games: user?.games || [],
        discord: user?.discord || "",
        steam: user?.steamName || "",
        xbox: user?.xboxName || "",
        playstation: user?.playstationName || "",
        profPic: user?.profPic || "",
        playstyle: user?.playstyle || ""
      })
      console.log(userText);
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
  const [updateDiscord] = useMutation(UPDATE_DISCORD);
  const [updateXbox] = useMutation(UPDATE_XBOX);
  const [updateSteam] = useMutation(UPDATE_STEAM);
  const [updatePlaystation] = useMutation(UPDATE_PLAYSTATION);
  const [updateMe] = useMutation(UPDATE_ME);
  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: data => {
      console.log("Upload finished");
    }
  });



  
  const handleFriendSubmit = async (event) => {
    event.preventDefault();
    console.log(event.target.searchInput.value);
    try {
      await addFriend({
        variables: {
          friendName: event.target.searchInput.value.trim()
        }
      }).then(response=> {
        console.log(response);
        setUserText({
          username: userText.username,
          descText: userText.descText,
          fromTime: userText.fromTime,
          toTime: userText.toTime,
          platformText: userText.platformText,
          friends: response.data.addFriend.friends,
          games: userText.games,
          discord: userText.discord,
          steam: userText.steam,
          xbox: userText.xbox,
          playstation: userText.playstation,
          profPic: userText.profPic,
          playstyle: userText.playstyle
        });
      })
    }
    catch(err){
      console.error(err);
      alert(err);
    }
  }

  const handleFriendDelete = async (friend) => {
    try {
      await removeFriend({
        variables: {
          friendName: friend
        }
      }).then(response=> {
        console.log(response);
        setUserText({
          username: userText.username,
          descText: userText.descText,
          fromTime: userText.fromTime,
          toTime: userText.toTime,
          platformText: userText.platformText,
          friends: response.data.removeFriend.friends,
          games: userText.games,
          discord: userText.discord,
          steam: userText.steam,
          xbox: userText.xbox,
          playstation: userText.playstation,
          profPic: userText.profPic,
          playstyle: userText.playstyle
        });
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

  const handleDiscordChange = async (discord) => {
    try{
      const { data } = await updateDiscord({
        variables: {
          discord: discord
        }
      })
    }
    catch(err){
      console.error(err);
    }
  }

  const handleXboxChange = async (xboxName) => {
    try{
      const { data } = await updateXbox({
        variables: {
          xboxName: xboxName
        }
      })
    }
    catch(err){
      console.error(err);
    }
  }

  const handlePlaystationChange = async (playstationName) => {
    try{
      const { data } = await updatePlaystation({
        variables: {
          playstationName: playstationName
        }
      })
    }
    catch(err){
      console.error(err);
    }
  }

  const handleSteamChange = async (steamName) => {
    try{
      const { data } = await updateSteam({
        variables: {
          steamName: steamName
        }
      })
    }
    catch(err){
      console.error(err);
    }
  }

  const handleMeChange = async(description, platform, fromTime, toTime, discord, xboxName, steamName, playstationName, playstyle) => {
    try{
      const { data } = await updateMe({
        variables: {
          description: description,
          platform: platform,
          steamName: steamName,
          fromTime: fromTime,
          toTime: toTime,
          discord: discord,
          xboxName: xboxName,
          playstationName: playstationName,
          playstyle: playstyle
        }
      })
    }
    catch(err){
      console.error(err);
    }
  }

  const handleFileUpload = async (file) => {
    try{
      const toDelete = user.profPic;
      if(!file){
        return;
      }
      const {data} = await uploadFile({
        variables:{
          file: file,
          toDelete: toDelete
        }
      })
      setUserText({
        username: userText.username,
        descText: userText.descText,
        fromTime: userText.fromTime,
        toTime: userText.toTime,
        platformText: userText.platformText,
        friends: userText.friends,
        games: userText.games,
        discord: userText.discord,
        steam: userText.steam,
        xbox: userText.xbox,
        playstation: userText.playstation,
        profPic: file.name,
        playstyle: userText.playstyle
      });
    }
    catch(err){
      console.error(err);
    }
    
  }

  const handleUpload = (event) => {
    const file = event.target.files[0];
    handleFileUpload(file);
  }
  

  const handleProfileEdit = async (event) => {
    event.preventDefault();
    // handleDescChange(event.target.descInput.value.trim());
    const pcString = event.target.pcInput.checked ? "PC " : "";
    const playstationString = event.target.playstationCheck.checked ? "Playstation " : "";
    const xboxString = event.target.xboxCheck.checked ? "Xbox " : "";
    const switchString = event.target.switchInput.checked ? "Switch " : "";
    const mobileString = event.target.mobileInput.checked ? "Mobile" : "";
    const platforms = pcString + playstationString + xboxString + switchString + mobileString
    const playstyle = event.target.Playstyle.value;
    // handlePlatformChange(platforms);
    // handleAvailabilityChange(event.target.fromTime.value, event.target.toTime.value);
    // handleDiscordChange(event.target.discordInput.value.trim());
    // handleXboxChange(event.target.xboxInput.value.trim());
    // handleSteamChange(event.target.steamInput.value.trim());
    // handlePlaystationChange(event.target.playstationInput.value.trim());
    handleMeChange(event.target.descInput.value.trim(), platforms, event.target.fromTime.value, event.target.toTime.value, event.target.discordInput.value.trim(), event.target.xboxInput.value.trim(), event.target.steamInput.value.trim(), event.target.playstationInput.value.trim(), playstyle);
    setUserText({
      username: userText.username,
      descText: event.target.descInput.value.trim(),
      fromTime: event.target.fromTime.value,
      toTime: event.target.toTime.value,
      platformText: platforms,
      friends: userText.friends,
      games: userText.games,
      discord: event.target.discordInput.value.trim(),
      steam: event.target.steamInput.value.trim(),
      xbox: event.target.xboxInput.value.trim(),
      playstation: event.target.playstationInput.value.trim(),
      profPic: userText.profPic,
      playstyle: playstyle
    });
    setAllowEdit(false);
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

  function ProfilePicture(){
    console.log("userText.profPic: " + userText.profPic);
    if(userText.profPic === undefined || userText.profPic === null || userText.profPic === ""){
      return <img id="profile-img" className="img-fluid col-lg-6 col-md-12 col-sm-10" src={profile} alt=""></img>
    }else{
      return <img id="profile-img" className="img-fluid col-lg-6 col-md-12 col-sm-10" src={`/profileImage/${userText.profPic}`} alt=""></img>
    }
    
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

  function NameChanges(props){
    const xboxVis = props.showXbox ? "visible" : "hidden";
    const steamVis = props.showSteam ? "visible" : "hidden";
    const playstationVis = props.showPlaystation ? "visible" : "hidden";
    return(
      <>
        <p htmlFor="Discord"><b>Discord:</b></p>
        <input className="description-input" name="Discord" type="text" id="discordInput" defaultValue={userText.discord}/>
        <p htmlFor="Steam"><b>Steam Username:</b></p>
        <input className="description-input" name="Steam" type="text" id="steamInput" defaultValue={userText.steam} style={{visibility: steamVis}}/>
        <p htmlFor="Xbox"><b>Xbox gamertag:</b></p>
        <input className="description-input" name="Xbox" type="text" id="xboxInput" defaultValue={userText.xbox} style={{visibility: xboxVis}}/>
        <p htmlFor="Playstation"><b>Playstation Username:</b></p>
        <input className="description-input" name="Playstation" type="text" id="playstationInput" defaultValue={userText.playstation} style={{visibility: playstationVis}}/>
      </>
    )
    }

  function EditPage(props){
    const [showSteam, setSteam] = useState(false);
    const [showXbox, setXbox] = useState(false);
    const [showPlaystation, setPlaystation] = useState(false);
    
    const pcChecked = userText.platformText.includes("PC");
    const xboxChecked = userText.platformText.includes("Xbox");
    const playstationChecked = userText.platformText.includes("Playstation");
    const switchChecked = userText.platformText.includes("Switch");
    const mobileChecked = userText.platformText.includes("Mobile");
    useEffect(() => {    
      setSteam(pcChecked);
      setXbox(xboxChecked);
      setPlaystation(playstationChecked);
    
  }, [pcChecked, xboxChecked, playstationChecked]);
    if(allowEdit){
      return(
        <form className="ml-2" onSubmit={handleProfileEdit}>
          <label class="custom-file-upload">
            <input type="file" onChange={handleUpload}></input>
            Upload Profile Picture
          </label>
          <p htmlFor="Description"><b>Edit Description</b></p>
          <input className="description-input" name="Description" type="text" id="descInput" defaultValue={userText.descText}/>
          <p className="mt-2"><b>My Platforms</b></p>
          <div className="col-12 d-flex flex-wrap">
              <div className="d-flex flex-wrap flex-column col-6">
                <div className="col-lg-2 flex-row align-items-baseline">
                  <input type="checkbox" value="PC" id="pcInput" defaultChecked={pcChecked} onClick={() => {setSteam(!showSteam)}}></input>
                  <p className="ml-1">PC</p>
                </div>
                <div className="col-2 flex-row align-items-baseline">
                  <input type="checkbox" value="Playstation" id="playstationCheck" defaultChecked={playstationChecked} onClick={() => {setPlaystation(!showPlaystation)}}></input>
                  <p className="ml-1">Playstation</p>
                </div>
                <div className="col-2 flex-row align-items-baseline">
                  <input type="checkbox" value="Xbox" id="xboxCheck" defaultChecked={xboxChecked} onClick={() => {setXbox(!showXbox)}}></input>
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
          <NameChanges showXbox={showXbox} showSteam={showSteam} showPlaystation={showPlaystation} /> 
          <p className="mt-2" htmlFor="Availability"><b>Edit Availability</b></p>
          <select className="time-select"name="Availability" type="text" id="fromTime" defaultValue={userText.fromTime}>
            <TimeOptions/>
          </select>
          <select className="time-select" name="Availability" type="text" id="toTime" defaultValue={userText.toTime}>
            <TimeOptions/>
          </select>
          <p className="mt-2" htmlFor="Playstyle"><b>Choose Playstyle</b></p>
          <select className="time-select"name="Playstyle" type="text" id="Playstyle" defaultValue={userText.playstyle}>
            <option value="Casual">Casual</option>
            <option value="Serious">Serious</option>
          </select>
          <br></br>
          <button className="custom-btn" type="submit" value="Submit">Save</button>
        </form>
      )
    }
    else{
      return(
        <></>
      )
    }
  }

  function ShowEditBtn(){
    if(myProfile && !allowEdit){
      return(
        <button className="custom-btn ml-2" onClick={() => setAllowEdit(true)}
        >Edit Profile</button>
      )
    }  
    return(
      <EditPage/>
    )
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
                      {myProfile ? (
                        <form className="form-inline input-group" id="searchFriend" onSubmit={handleFriendSubmit}>
                        <input className="form-control mr-sm-2" type="search" placeholder="Add friend" aria-p="Search" id="searchInput"></input>
                        <button className="friends-btn my-5 my-sm-0" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                              </svg>
                        </button>
                      </form>
                      ) : (
                        <></>
                      )
                    }
                      
                  </div>
                  <div className="sidebar">
                      <h4><b>Games</b> <span className="red-text">{userText.games.length}</span></h4>
                      {userText.games.map((game, index) => (
                        <Link className="profile-sidebar-link" to={`/game/${game}`}>
                          <p key={index} className="mt-1">{game}</p>
                        </Link>
                      ))}
                      {/* <h4 className="mt-2"><b>Groups</b> <span className="red-text">3</span></h4> */}
                      <h4 className="mt-2"><b>Friends</b> <span className="red-text">{userText.friends.length}</span></h4>
                      {userText.friends.map((friend, index) => ( 
                        <>
                          <Link className="profile-sidebar-link" to={`/profiles/${friend}`}>
                            <p key={index} className="mt-1">{friend}</p>
                          </Link>
                          {myProfile ? (
                            <button onClick={() => {handleFriendDelete(friend)}}>Remove Friend</button>
                          ) : (
                          <></>
                          )
                       }      
                        </>
                      ))}
                      {myProfile ? (
                        <>
                          <h4 className="mt-3"><b>Quick Links</b></h4>
                        <Link className="profile-sidebar-link" to="/wishlist">
                          <p className="mt-1">Wish List</p>
                        </Link>
                        <Link className="profile-sidebar-link" to="/Library">
                          <p className="">Library</p>
                        </Link>
                      </>
                      ) : (
                        <></>
                      )
                    }
                  </div>
                </div>
                </div>
            </div>
        </div>

        <div className="col col-md-9" id="main">
          <div className="row">
            <ProfilePicture/>
            <div className="col-md-12 col-lg-6">
              <h2 className="mb-3 mt-4 d-flex justify-content-start">
              <svg id="online-icon" className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#2aeb3d" class="bi bi-circle-fill" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="8"/></svg>
                {`${userText.username}'s`} Profile 
              </h2>
              <h6 className="ml-2"><b>Platforms:</b>{`${userText.platformText}`}</h6>
              <h6 className="mt-2 ml-2"><b>Availability:</b>{`${userText.fromTime}`} to {`${userText.toTime}`}</h6>
              <h6 className="mt-2 ml-2"><b>Discord:</b>{`${userText.discord}`}</h6>
              <h6 className="mt-2 ml-2"><b>Playstyle:</b>{`${userText.playstyle}`}</h6>
              <p className="mt-2 ml-2 mt-4">{`${userText.descText}`}</p>
              <ShowEditBtn/>
            </div>
          </div>

          
        </div>
    </div>
    <div className="row py-3">
      <h1>Library</h1>
      {userText.games.map((game, index) => (
        <div className="col-sm-6 col-md-4 col-lg-2">
          <div className="p-3 game-library">
            <Link to={`/game/${game}`}>
            <img className="img-fluid pop-games" src={require(`../assets/images/gameImages/${game}.jpg`).default} alt={game}></img>
            </Link>
            {/* <button className="custom-btn game-btn mx-auto mt-3" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
              </svg>
            </button> */}
          </div>
        </div>
          ))}
    </div>

    </div>
  );
};

export default Profile;

