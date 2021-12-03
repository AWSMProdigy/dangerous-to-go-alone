import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import "../../src/styles.css";
import profile from "../assets/images/profile/profile.jpg";

import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  // redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div className="container mt-4">
      <div className="flex-row mb-3">
        <img className="image-fluid profile-img" src={profile} alt=""></img>
        <div className="col-5 p-3">
            <h2 className=" mb-3 d-flex justify-content-start">
            <svg className="online-icon mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#2aeb3d" class="bi bi-circle-fill" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="8"/></svg>
              {userParam ? `${user.username}'s` : "User"}'s Profile 
            </h2>
            <h6 className="ml-2"><b>Platforms:</b> PC, Switch, Playstation</h6>
            <h6 className="mt-2 ml-2"><b>Last Online:</b> Now</h6>
            <p className="mt-2 ml-2 mt-4">Hey, I'm Sarah. I play all types of games but particularly enjoy multiplayer on PC, Switch, and Playstation. I'm into more casual games so if you're into Stardew Valley, Animal Crossing, or Mario Kart, let's play together! </p>
        </div>
        <div className="col-3 p-3 ml-5">
          <div className="friends-search-bar">
            <Link className="navItem" to="/search">
                    <form className="form-inline input-group" id="searchFriend">
                      <input className="form-control mr-sm-2" type="search" placeholder="Find a friend" aria-label="Search" id="searchInput"></input>
                      <button className="friends-btn my-5 my-sm-0" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                      </button>
                    </form>
            </Link>
          </div>
          <div className="sidebar p-3">
            <h4><b>Games</b> <span className="red-text">86</span></h4>
            <h4 className="mt-2"><b>Friends</b> <span className="red-text">18</span></h4>
              <Link className="profile-sidebar-link" to="/guardian855">
                <p className="mt-1">guardian855</p>
              </Link>
              <Link className="profile-sidebar-link" to="/pledias25">
                <p className="mt-1">pledias25</p>
              </Link>
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
      <div class="row">

      </div>






    </div>
  );
};

export default Profile;

