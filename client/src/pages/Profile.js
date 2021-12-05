import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import "../../src/styles.css";
import profile from "../assets/images/profile/profile.jpg";

import stardew from "../assets/images/profile/stardew.jpg";
import mario from "../assets/images/profile/mariokart.jpg";
import itTakes2 from "../assets/images/profile/ittakes2.jpg";
import ac from "../assets/images/profile/ac.jpg";

import { ADD_FRIEND } from '../utils/mutations';
import { useMutation } from '@apollo/client';


import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

const Profile = () => {
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
                          <input className="form-control mr-sm-2" type="search" placeholder="Find a friend" aria-label="Search" id="searchInput"></input>
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
                      <Link className="profile-sidebar-link" to="/profile/:guardian855">
                        <p className="mt-1">guardian855</p>
                      </Link>
                      <Link className="profile-sidebar-link" to="/profile/:pledias25">
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
            </div>
        </div>

        <div className="col col-md-9" id="main">
          <div className="row">
            <img className="img-fluid profile-img col-lg-5 col-md-12 col-sm-10" src={profile} alt=""></img>
            <div className="col-md-12 col-lg-7">
              <h2 className="mb-3 mt-4 d-flex justify-content-start">
              <svg id="online-icon" className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#2aeb3d" class="bi bi-circle-fill" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="8"/></svg>
                {userParam ? `${user.username}'s` : "User"}'s Profile 
              </h2>
              <h6 className="ml-2"><b>Platforms:</b> PC, Switch, Playstation</h6>
              <h6 className="mt-2 ml-2"><b>Last Online:</b> Now</h6>
              <p className="mt-2 ml-2 mt-4">Hey, I'm Sarah. I play all types of games but particularly enjoy multiplayer on PC, Switch, and Playstation. I'm into more casual games so if you're into Stardew Valley, Animal Crossing, or Mario Kart, let's play together! </p>
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
                    <p className="small"> 10:00pm - 1:00am EST</p>
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

