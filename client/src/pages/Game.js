import React, { useEffect, useRef, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME_GAME, QUERY_GAME } from '../utils/queries';
import { useMutation } from '@apollo/client';
import { ADD_LFG, UPDATE_LFG, CLOSE_LFG } from '../utils/mutations';
import "../../src/styles.css";

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
  const [lfgArray, setLfg] = useState([]);
  const [addLfg] = useMutation(ADD_LFG);
  const [updateLfg] = useMutation(UPDATE_LFG);
  const [closeLfg] = useMutation(CLOSE_LFG);
  // const [from, setFrom] = useState();
  // const [to, setTo] = useState()
  const [state, setState] = useState({
    playerArray: [],
    to: "any",
    from: "any",
    platform: "Any"
  })
  const [tab, setTab] = useState();

  let to;
  let from;
  let platform;

  const { loading, data } = useQuery(Auth.loggedIn() ? QUERY_ME_GAME : QUERY_GAME, {
    variables: { 
      gameTitle: titleParam 
    }
  });

  useEffect(() => {
    if(!loading){
      console.log("initial load");
      setState({
        playerArray: data.game.game.players,
        to: state.to,
        from: state.from,
        platform: state.platform
      });
    setTab("lfg");
    setLfg(data.game.game.lfgList);
    console.log(data);
    }
    else{
      return (<div>Loading...</div>)
    }
  }, [loading]);

  function handleTo(e){
    if(e.target.value === "any"){
      to = e.target.value;
    }
    else{
      to=parseInt(e.target.value);
    }
    from=state.from;
    platform = state.platform;
    filterPlayers();
  }

  function handleFrom(e){
    if(e.target.value === "any"){
      from = e.target.value;
    }
    else{
      from=parseInt(e.target.value);
    }
    to=state.to;
    platform = state.platform;
    filterPlayers();
  }

  function handlePlatform(e){
    platform = e.target.value;
    to=state.to;
    from = state.from;
    filterPlayers();
  }

  const handleCreateLFG = async(e) => {
    e.preventDefault();
    console.log(e);
    try{
      const {data} = await addLfg({
        variables: {
          gameTitle: titleParam,
          title: e.target[0].value,
          capacity: parseInt(e.target[1].value),
          creator: "Boutta Be Banned"
        }
      })
    }
    catch(err){
      console.error(err);
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
      })
    }
    catch(err){
      console.error(err);
    }
  }

  const handleCloseLFG = async(_id) => {
    console.log(_id)
    try{
      const {data} = await closeLfg({
        variables: {
          gameTitle: titleParam,
          _id: _id
        }
      })
    }
    catch(err){
      console.error(err);
    }
  }


  function TimeOptions(){
    const n = 12;
    const AMarray = [...Array(n)].map((e, i) => <option value={i+1}>{`${i+1} AM`}</option>)
    const PMarray = [...Array(n)].map((e, i) => <option value={i+13}>{`${i+1} PM`}</option>)
    const fullArray = [...AMarray, ...PMarray];
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
    let newPlayerArray = data.game.players;
    if(platform !== "Any"){
      newPlayerArray = data.game.players.filter(player => {
        return player.platform != null && player.platform.includes(platform);
      })
    }
    if(from !== "any" || to !== "any")
      newPlayerArray = newPlayerArray.filter(player => {
        console.log(!player.fromTime || !player.toTime);
        if(!player.fromTime || !player.toTime){
          return true;
        }
        let start = parseInt(player.fromTime.split(" ")[0]);
        if(player.fromTime.split(" ")[1] == "PM"){
          start += 12;
        }
        let end = parseInt(player.toTime.split(" ")[0]);
        if(player.toTime.split(" ")[1] == "PM"){
          end += 12;
        }
        if(to === "any"){
          console.log("hello")
          return from >= start && from < end;
        }
        if(from === "any"){
          return to > start && to <= end;
        }
        console.log(((start >= from && start < to) && end >= to));
        return (start <= from && (end <= to && end > from)) || (start >= from && end <= to) || ((start >= from && start < to) && end >= to);
      })
    console.log(from, to);
    setState({
      playerArray: newPlayerArray,
      from: from,
      to: to,
      platform: platform
    });
  }

  function Tabs(){
    if(tab === "players"){
      return(
          Object.keys(state.playerArray).map((player, index) => (
          <div className="playerContainer">
            <Link className="player-entry profile-sidebar-link" to={`/profiles/${state.playerArray[player].username}`}>
              <p>{state.playerArray[player].username}</p>
            </Link>
            <p className='player-entry'>{state.playerArray[player].fromTime}-{state.playerArray[player].toTime}</p>
            <p className='player-entry'>{state.playerArray[player].platform}</p>
            <p className='player-entry'>Casual</p>
          </div>
        ))
      )
    }
    else{
      console.log(lfgArray);
      return(
        <>
        {(Auth.loggedIn() && data.me.canLfg) ? (
        <form onSubmit={handleCreateLFG}>
          <input name="lfgTitle" type="text" id="lfgTitle" default="Title for your LFG..."></input>
          <input name="lfgCapacity" type="text" id="lfgCapacity" default="Capacity for your LFG..."></input>
          <button type='submit'></button>
        </form>
        ) : (
          <></>
        )}
        <>
        {
        Object.keys(lfgArray).map((lfg, index) => (
        <div className="playerContainer">
          {lfgArray[lfg].title}
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
      </>
      </>
    )  
  }
}

  if(loading){
    return (<div>Loading...</div>);
  }

  let pic;
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
              <p className='player-entry'>Playstyle</p>
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

