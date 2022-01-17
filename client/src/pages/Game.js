import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_GAME } from '../utils/queries';
import "../../src/styles.css";

import battle from "../assets/images/libraryImages/battlefield.jpg"
import halo from "../assets/images/libraryImages/haloinfinite.jpg"
import league from "../assets/images/libraryImages/LoL.jpg"
import cod from "../assets/images/libraryImages/blackops.jpg"
import forza from "../assets/images/libraryImages/forza.jpg"
import stardew from "../assets/images/libraryImages/stardew.jpg"

import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

const Game = () => {
  const { title: titleParam } = useParams();
  const [playerArray, setPlayers] = useState([]);
  const [from, setFrom] = useState();
  const [to, setTo] = useState()

  const { loading, data } = useQuery(QUERY_GAME, {
    variables: { 
      title: titleParam 
    },
  });

  useEffect(() => {
    if(!loading){
      setPlayers(data.game.players)
    }
    else{
      return (<div>Loading...</div>)
    }
  }, []);
  console.log(playerArray);

  function TimeOptions(){
    const n = 12;
    const AMarray = [...Array(n)].map((e, i) => <option value={`${i+1} AM`}>{`${i+1} AM`}</option>)
    const PMarray = [...Array(n)].map((e, i) => <option value={`${i+1} PM`}>{`${i+1} PM`}</option>)
    const fullArray = [...AMarray, ...PMarray];
    return(
      fullArray
    )
  }

  function filterPlayers(event){
    console.log(event.target.value);
    if(event.target.value === "Any"){
      console.log("hello?");
      setPlayers(data.game.players);
      return;
    }
    let newPlayerArray = data.game.players.filter(player => {
      return player.platform != null && player.platform.includes(event.target.value);
    })
      newPlayerArray = newPlayerArray.filter(player => {
        let start = parseInt(player.fromTime.split(" ")[0]);
        if(player.fromTime.split(" ")[1] == "PM"){
          start += 12;
        }
        let end = player.toTime.split(" ")[0];
        if(player.toTime.split(" ")[1] == "PM"){
          end += 12;
        }
        
      })
    
    console.log(newPlayerArray);
    setPlayers(newPlayerArray);
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
              <b>{data.game.title}</b>
            </h2>
            <h6 className="ml-4"><b>Platforms:</b> <span className="red-text">{data.game.platforms}</span></h6>
            <h6 className="mt-2 ml-4"><b>Current Player Count:</b> <span className="red-text">{data.game.players.length}</span></h6>
            {/* <p className="mt-2 ml-4 mt-4">You've inherited your grandfather's old farm plot in Stardew Valley. Armed with hand-me-down tools and a few coins, you set out to begin your new life. Can you learn to live off the land and turn these overgrown fields into a thriving home? </p> */}
            <h4 className="ml-4 mt-5 mb-3">Players</h4>
            <div className="playerContainer">
              <p className='player-entry'>Username</p>
              <div className='player-entry'>
                <p>Availability</p>
                <select className="time-select"name="Availability" type="text" id="fromTime" onChange={e=>setFrom(e.target.value)}>
                  <TimeOptions/>
                </select>
                <select className="time-select" name="Availability" type="text" id="toTime" onChange={e=>setTo(e.target.value)}>
                  <TimeOptions/>
                </select>
              </div>
              <select className='player-entry' name="plats" defaultValue="Any Platform" onChange={filterPlayers}>
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
              {Object.keys(playerArray).map((player, index) => (
                <div className="playerContainer">
                  <Link className="player-entry profile-sidebar-link" to={`/profiles/${playerArray[player].username}`}>
                    <p>{playerArray[player].username}</p>
                  </Link>
                  <p className='player-entry'>{playerArray[player].fromTime}-{playerArray[player].toTime}</p>
                  <p className='player-entry'>{playerArray[player].platform}</p>
                  <p className='player-entry'>Casual</p>
                </div>
              ))}
            
          </div>
        </div>
      </div>
  </div>
  );
};

export default Game;

