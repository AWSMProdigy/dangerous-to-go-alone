import React from 'react';
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

  const { loading, data } = useQuery(QUERY_GAME, {
    variables: { 
      title: titleParam 
    },
  });

 

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(data);
  let pic;
  switch(data.game.title){
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
        <div className="col col-md-9" id="main">
          <div className="row">
            <img id="game" className="img-fluid col-lg-5 col-md-12 col-sm-10" src={pic} alt=""></img>
            <div className="col-md-12 col-lg-7">
            <h2 className="ml-4 mb-3 d-flex justify-content-start">
              <b>{data.game.title}</b>
            </h2>
            <h6 className="ml-4"><b>Platforms:</b> <span className="red-text">{data.game.platforms}</span></h6>
            <h6 className="mt-2 ml-4"><b>Current Player Count:</b> <span className="red-text">{data.game.players.length}</span></h6>
            {/* <p className="mt-2 ml-4 mt-4">You've inherited your grandfather's old farm plot in Stardew Valley. Armed with hand-me-down tools and a few coins, you set out to begin your new life. Can you learn to live off the land and turn these overgrown fields into a thriving home? </p> */}
            <h4 className="ml-4 mt-5">Who's Playing?</h4>
            {data.game.players.map((player, index) => (
              <Link className="profile-sidebar-link" to={`/profiles/${player}`}>
                <p className="mt-1 ml-4">{player}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
  </div>
  );
};

export default Game;

