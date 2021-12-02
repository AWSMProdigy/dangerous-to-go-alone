import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import "../../src/library.css";
import "../../src/styles.css";

import Auth from '../utils/auth';
import battle from "../assets/images/libraryImages/battle.jpg"
import halo from "../assets/images/libraryImages/halo.jpg"
import league from "../assets/images/libraryImages/league.jpg"
import cod from "../assets/images/libraryImages/cod.jpg"
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
    <div>
      <div className="flex-row mb-3">
        <h2 className="col-12 bg-dark text-white p-3 mb-5">
          Viewing {userParam ? `${user.username}'s` : 'your'} games
        </h2>

      </div>
      <div class="row">

        <div class="col-sm-6 col-md-4">
          <div class="card border-white">

            <div class="card-body">
              <img class="bat" src={battle} alt="battlefield"></img>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-md-4">
          <div class="card border-white">

            <div class="card-body">
              <img class="bat" src={halo} alt="halo"></img>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-md-4">
          <div class="card border-white">
            
            <div class="card-body">
            <img class="bat" src={league} alt="leagueOfLegends"></img>
            </div>
          </div>
        </div>

        <div class="col-sm-6 col-md-4">
          <div class="card border-white">
            
            <div class="card-body">
            <img class="bat" src={cod} alt="callfoduty"></img>
            </div>
          </div>
        </div>

      </div>






    </div>
  );
};

export default Profile;

