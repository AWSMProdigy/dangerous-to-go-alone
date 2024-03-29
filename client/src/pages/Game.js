import React, { useEffect, useRef, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery, useLazyQuery } from '@apollo/client';
import { QUERY_ME_GAME, QUERY_GAME } from '../utils/queries';
import { useMutation } from '@apollo/client';
import { ADD_LFG, UPDATE_LFG, CLOSE_LFG } from '../utils/mutations';
import "../../src/styles.css";
import Popup from '../components/Popup'

import battle from "../assets/images/gameImages/Battlefield 2042.jpg"
import halo from "../assets/images/gameImages/Halo Infinite.jpg"
import league from "../assets/images/gameImages/League of Legends.jpg"
import cod from "../assets/images/gameImages/Black Ops 2.jpg"
import forza from "../assets/images/gameImages/Forza Horizon 5.jpg"
import stardew from "../assets/images/gameImages/Stardew Valley.jpg"

import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

const Game = () => {
  const { title: titleParam } = useParams();
  const [playerArray, setPlayers] = useState([]);
  const [data, setData] = useState({
    me: null,
    game: null
  });
  const [popupState, setPopup] = useState({
    creator: "",
    title: "",
    capacity: "",
    players: [],
    playstyle: "",
    _id: "",
    me: "",
    trigger: false
  })
  const [lfgArray, setLfg] = useState([]);
  const [addLfg] = useMutation(ADD_LFG);
  const [updateLfg] = useMutation(UPDATE_LFG);
  const [closeLfg] = useMutation(CLOSE_LFG);
  // const [from, setFrom] = useState();
  // const [to, setTo] = useState()
  const [state, setState] = useState({
    to: "any",
    from: "any",
    platform: "Any",
    playstyle: "Any"
  })

  const didMount = useRef(false);

  const [tab, setTab] = useState("players");

  const [search] = useLazyQuery(Auth.loggedIn() ? QUERY_ME_GAME : QUERY_GAME, {
    variables: { gameTitle: titleParam },
    fetchPolicy: "network-only"
  });

  useEffect(()=> {
    if(didMount.current){
      filterPlayers();
    }
  }, [state]);

  useEffect(() => {
    console.log("UseEffect");
    didMount.current = true;
    retrieveInfo();
  }, []);

  const retrieveInfo = async() => {
    search().then(response => {
      console.log("Response: ");
      console.log(response);
      if(response){
        setPlayers(response.data.game.players);
        setData({
          me: response.data.me,
          game: response.data.game
        })
        setLfg(response.data.game.game.lfgList, () => {
          console.log("LfgArray: ");
          console.log(lfgArray);
        })
      }
    })
  }

  function handleTo(e){
    if(e.target.value === "any"){
      setState({
        to: e.target.value,
        from: state.from,
        platform: state.platform,
        playstyle: state.playstyle
      });
    }
    else{
      setState({
        to: parseInt(e.target.value),
        from: state.from,
        platform: state.platform,
        playstyle: state.playstyle
      });
    }
  }

  function handleFrom(e){
    if(e.target.value === "any"){
      setState({
        to: state.to,
        from: e.target.value,
        platform: state.platform,
        playstyle: state.playstyle
      })
    }
    else{
      setState({
        to: state.to,
        from: parseInt(e.target.value),
        platform: state.platform,
        playstyle: state.playstyle
      })
    }
  }

  function handlePlatform(e){
    setState({
      to: state.to,
      from: state.from,
      platform: e.target.value,
      playstyle: state.playstyle
    })
  }

  function handlePlaystyle(e){
    setState({
      to: state.to,
      from: state.from,
      platform: state.platform,
      playstyle: e.target.value
    })
  }

  const handleCreateLFG = async(e) => {
    e.preventDefault();
    try{
      await addLfg({
        variables: {
          gameTitle: titleParam,
          title: e.target[0].value,
          capacity: parseInt(e.target[1].value),
          creator: data.me.username,
          playstyle: "Casual"
        }
      }).then(response=> {
        console.log(response);
        setLfg(response.data.addLfg.lfgList);
      })
    }
    catch(err){
      console.error(err);
      alert(err);
    }
  }

  const handleUpdateLFG = async(add, _id, username) => {
    try{
      const {data} = await updateLfg({
        variables: {
          gameTitle: titleParam,
          _id: _id, 
          add: add,
          player: username
        }
      }).then(response=> {
        console.log(response);
        setLfg(response.data.updateLfg.lfgList);
      })
    }
    catch(err){
      console.error(err);
    }
  }

  const handleCloseLFG = async(_id) => {
    try{
      const {data} = await closeLfg({
        variables: {
          gameTitle: titleParam,
          _id: _id
        }
      }).then(response => {
        console.log(response);
        setLfg(response.data.closeLfg.lfgList);
      })
    }
    catch(err){
      console.error(err);
    }
  }

  function TimeOptions(){
    const n = 11;
    const twelveAM = <option value={0}>{`12 AM`}</option>
    const AMarray = [...Array(n)].map((e, i) => <option value={i+1}>{`${i+1} AM`}</option>)
    const twelvePM = <option value={12}>{`12 PM`}</option>
    const PMarray = [...Array(n)].map((e, i) => <option value={i+13}>{`${i+1} PM`}</option>)
    const fullArray = [twelveAM, ...AMarray, twelvePM, ...PMarray];
    return(
      fullArray
    )
  }

  function SelectTime(){
    return (
      <>
      <p>Availability</p>
      <select className="time-select"name="Availability" type="text" id="fromTime" onChange={handleFrom} defaultValue={state.from}>
        <TimeOptions/>
        <option value="any">N/A</option>
      </select>
      <select className="time-select" name="Availability" type="text" id="toTime" onChange={handleTo} defaultValue={state.to}>
        <TimeOptions/>
        <option value="any">N/A</option>
      </select>
      </>
    )
  }

  function filterPlayers(){
    console.log("Filter players");
    let newPlayerArray = data.game.players;
    if(state.playstyle!=="Any"){
      newPlayerArray = newPlayerArray.filter(player =>{
        return player.playstyle === state.playstyle;
      })
    }
    if(state.platform !== "Any"){
      newPlayerArray = data.game.players.filter(player => {
        return player.platform != null && player.platform.includes(state.platform);
      })
    }
    if(state.from !== "any" || state.to !== "any")
      newPlayerArray = newPlayerArray.filter(player => {
        if(!player.fromTime || !player.toTime){
          return true;
        }
        //12AM must = 0 and 12PM must = 12
        let start = parseInt(player.fromTime.split(" ")[0]);
        if(start != 12){
          if(player.fromTime.split(" ")[1] === "PM"){
            start += 12;
          }
        }
        let end = parseInt(player.toTime.split(" ")[0]);
        if(end != 12){
          if(player.toTime.split(" ")[1] === "PM"){
            end += 12;
          }
        }
        if(player.fromTime === "12 AM"){
          start = 0;
        }
        if(player.toTime === "12 AM"){
          end = 0;
        }
        //Handle the situations where a from or to time are not provided
        if(state.to === "any"){
          return state.from >= start && state.from < end;
        }
        if(state.from === "any"){
          return state.to > start && state.to <= end;
        }
        console.log("State.from:" + state.from + "start: " + start + "State.to: " + state.to + "end: " + end);
        //Both go over midnight
        if((state.from >= state.to && start > end)||(state.from > state.to && start >= end)){
          return (state.from >= end && state.to < start) || (state.from > end && state.to <= start);
        }
        //Only desired availability goes over midnight
        else if((state.from >= state.to && start < end) || (state.from > state.to && start <= end)){
          return (state.from <= end && state.to < start) || (state.from < end && state.to <= start)
        }
        //Only player availability goes over midnight
        else if((state.from <= state.to && start > end) || (state.from < state.to && start >= end)){
          return (state.from >= end && state.to > start) || (state.from > end && state.to >= start)
        }
        //Nothing goes over midnight
        return (state.from <= end && state.to > start) || (state.from < end && state.to >= start);
      })
    setPlayers(newPlayerArray);
  }

  function Tabs(){
    if(tab === "players"){
      return(
          Object.keys(playerArray).map((player, index) => (
          <div className="playerContainer">
            <Link className="player-entry profile-sidebar-link" to={`/profiles/${playerArray[player].username}`}>
              <p>{playerArray[player].username}</p>
            </Link>
            <p className='player-entry'>{playerArray[player].fromTime}-{playerArray[player].toTime}</p>
            <p className='player-entry'>{playerArray[player].platform}</p>
          </div>
        ))
      )
    }
    else{
      return(
        <>
        {(Auth.loggedIn() && data.me.canLfg) ? (
        <form className="lfgForm" onSubmit={handleCreateLFG}>
          <div>
            <label>Title of LFG:</label>
            <label>Capacity of LFG:</label>
          </div>
          <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <input className="lfgInput" name="lfgTitle" type="text" id="lfgTitle" default="Title for your LFG..."></input>  
            <input className="lfgInput" name="lfgCapacity" type="text" id="lfgCapacity" default="Capacity for your LFG..."></input>
          </div>          
          <button style={{width: "50%", border: "2px solid red"}}type='submit'>Create LFG</button>
        </form>
        ) : (
          <></>
        )}
        <>
        <div className="playerContainer">
          <p className='player-entry'>LFG Title</p>
          <p className='player-entry'>LFG Playstyle</p>
          <p className='player-entry'>LFG Player Count</p>
          <button className='player-entry' style={{visibility: "hidden"}}>Join LFG</button>
        </div>
        {
        Object.keys(lfgArray).map((lfg, index) => (
        <div className="playerContainer">
          <p className='player-entry'>{lfgArray[lfg].title}</p>
          <p className='player-entry'>{lfgArray[lfg].playstyle}</p>
          <p className='player-entry'>{lfgArray[lfg].players.length}/{lfgArray[lfg].capacity}</p>
          <button onClick={() => setPopup({creator: lfgArray[lfg].creator, title: lfgArray[lfg].title, capacity: lfgArray[lfg].capacity, players: lfgArray[lfg].players, playstyle: lfgArray[lfg].playstyle, trigger: true, _id: lfgArray[lfg]._id, me: data.me.username})}>Details</button>
          {(Auth.loggedIn() && data.me.username !== lfgArray[lfg].creator) ? (
            <>
            {(lfgArray[lfg].players.find(player => player === data.me.username) !== undefined && lfgArray[lfg].players.length < lfgArray[lfg].capacity) ? (
              <button onClick={() => handleUpdateLFG(false, lfgArray[lfg]._id, data.me.username)}>Leave LFG</button> 
            ) : (
              <button onClick={() => handleUpdateLFG(true, lfgArray[lfg]._id, data.me.username)}>Join LFG</button> 
            )}
            </>
          ) : (
            <button onClick={() => handleCloseLFG(lfgArray[lfg]._id)}>Delete LFG</button> 
          )}
        </div>
      ))
      }
      <Popup state={popupState} setPopup={setPopup} updateLfg={handleUpdateLFG}></Popup>
      </>
      </>
    )  
  }
}

  if(data.me === null || data.game === null){
    return <h1>Loading...</h1>
  }
  let pic;
  console.log("Switch")
  switch(data.game.game.title){
    case "Battlefield 2042":
      pic=battle;
      break;
    case "Halo Infinite":
      pic=halo;
      break;
    case "League of Legends":
      pic=league;
      break;
    case "Black Ops 2":
      pic=cod;
      break;
      case "Forza Horizon 5":
      pic=forza;
      break;
    case "Stardew Valley":
      pic=stardew;
      break;
    default:
      pic = halo;
      break;
  }

  console.log("html")
  return (
    <div className="container mt-5">
        <div className="col col-md-12" id="main">
          <div className="row">
            <img id="game" className="img-fluid col-lg-5 col-md-12 col-sm-10" src={pic} alt=""></img>
            <div className="col-md-12 col-lg-7 game-sm-spacing">
            <h2 className="ml-4 mb-3 d-flex justify-content-start">
              <b>{data.game.game.title}</b>
            </h2>
            <h6 className="ml-4"><b>Platforms:</b> <span className="red-text">{data.game.platforms}</span></h6>
            <h6 className="mt-2 ml-4"><b>Current Player Count:</b> <span className="red-text">{data.game.players.length}</span></h6>
            {/* <p className="mt-2 ml-4 mt-4">You've inherited your grandfather's old farm plot in Stardew Valley. Armed with hand-me-down tools and a few coins, you set out to begin your new life. Can you learn to live off the land and turn these overgrown fields into a thriving home? </p> */}
            {(tab === "players") ? (
            <>
              <h4 className="ml-4 mt-5 mb-3">Players</h4>
              <div className="playerContainer">
                <p className='player-entry'>Username</p>
                <div className='player-entry'>
                  <SelectTime></SelectTime>
                </div>
                <select className='player-entry' name="plats" defaultValue="Any Platform" onChange={handlePlatform}>
                  <option value="Any">Any Platform</option>
                  <option value="PC">PC</option>
                  <option value="Xbox Series">Xbox Series</option>
                  <option value="Xbox One">Xbox One</option>
                  <option value="PS4">PS4</option>
                  <option value="PS5">PS5</option>
                </select>
                <select className='player-entry' name="playstyle" defaultValue="Any" onChange={handlePlaystyle}>
                  <option value="Any">Any</option>
                  <option value="Casual">Casual</option>
                  <option value="Serious">Serious</option>    
                </select>
              </div>
              </>
            ) :
            (
              <></>
            )}
            <div className="gameTabs">
              <button className={tab === "players" ? "selected" : "notSelected"} onClick={() => setTab("players")}>Players</button>
              <button className={tab === "players" ? "notSelected" : "selected"} onClick={() => setTab("lfg")}>LFG</button>
            </div>
            <hr></hr>
            <Tabs></Tabs>
            
          </div>
        </div>
      </div>
  </div>
  );
};

export default Game;

