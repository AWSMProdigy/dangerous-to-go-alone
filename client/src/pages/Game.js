import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_GAME } from '../utils/queries';
import "../../src/styles.css";

import stardew from "../assets/images/libraryImages/stardew.jpg";

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
                  
                  <div className="sidebar">
                        <h4 className=""><b>Who's Playing?</b></h4>
                      {data.game.players.map((player, index) => (
                        <Link className="profile-sidebar-link" to={`/profiles/${player}`}>
                          <p className="mt-1">{player}</p>
                        </Link>
                      ))}
                  </div>
                </div>
                </div>
            </div>
        </div>

        <div className="col col-md-9" id="main">
          <div className="row">
            <img id="game" className="img-fluid col-lg-5 col-md-12 col-sm-10" src={stardew} alt=""></img>
            <div className="col-md-12 col-lg-7">
              <h2 className="ml-4 mb-3 mt-4 d-flex justify-content-start">
                
              </h2>
              <h6 className="ml-4"><b>Platforms:</b> <span className="red-text">{data.game.platforms}</span></h6>
              <h6 className="mt-2 ml-4"><b>Current Player Count:</b> <span className="red-text">{data.game.players.length}</span></h6>
              {/* <p className="mt-2 ml-4 mt-4">You've inherited your grandfather's old farm plot in Stardew Valley. Armed with hand-me-down tools and a few coins, you set out to begin your new life. Can you learn to live off the land and turn these overgrown fields into a thriving home? </p> */}
            </div>
          </div>
        </div>
    </div>
  </div>
  );
};

export default Game;

