import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import "../../src/styles.css";

import stardew from "../assets/images/libraryImages/stardew.jpg";

import { ADD_FRIEND } from '../utils/mutations';
import { useMutation } from '@apollo/client';


import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

const Game = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const [addFriend, { error }] = useMutation(ADD_FRIEND);

  const handleFormSubmit = async (event) => {
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


  


  const user = data?.me || data?.user || {};
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
                        <form className="form-inline input-group" id="searchFriend" onSubmit={handleFormSubmit}>
                          <input className="form-control mr-sm-2" type="search" placeholder="Search players" aria-label="Search" id="searchInput"></input>
                          <button className="friends-btn my-5 my-sm-0" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                          </button>
                        </form>
                      </Link>
                  </div>
                  <div className="sidebar">
                        <h4 className=""><b>Who's Playing?</b></h4>
                      <Link className="profile-sidebar-link" to="/profile/:guardian855">
                        <p className="mt-1">guardian855</p>
                      </Link>
                      <Link className="profile-sidebar-link" to="/profile/:pledias25">
                        <p className="">pledias25</p>
                      </Link>
                      <Link className="profile-sidebar-link" to="/profile/:RiFFRaFF">
                        <p className="">RiFFRaFF</p>
                      </Link>
                      <Link className="profile-sidebar-link" to="/profile/:bouttabebanned">
                        <p className="">bouttabebanned</p>
                      </Link>
                      <Link className="profile-sidebar-link" to="/profile/:beau69">
                        <p className="">beau69</p>
                      </Link>
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
                {userParam ? `${user.username}'s` : "Stardew Valley"} 
              </h2>
              <h6 className="ml-4"><b>Platforms:</b> <span className="red-text">PC, Switch, Playstation, XBox, iOS, Android</span></h6>
              <h6 className="mt-2 ml-4"><b>Current Player Count:</b> <span className="red-text">94,479</span></h6>
              <p className="mt-2 ml-4 mt-4">You've inherited your grandfather's old farm plot in Stardew Valley. Armed with hand-me-down tools and a few coins, you set out to begin your new life. Can you learn to live off the land and turn these overgrown fields into a thriving home? </p>
            </div>
          </div>
        </div>
    </div>
  </div>
  );
};

export default Game;

