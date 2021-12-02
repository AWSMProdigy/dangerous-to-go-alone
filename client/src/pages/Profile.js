import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

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
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {userParam ? `${user.username}'s` : 'your'} games.
        </h2>
        <button>Add Games</button>
      </div>
      <div class="row">

        <div class="col-sm-6 col-md-4">
            <div class="card border-white">
                <div class="card-header">Heading 1</div>
                    <div class="card-body">
                        <p class="card-text">Some quick example text to build 
                           on the card 
                        title and make up the bulk of the card's content.</p>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-md-4">
            <div class="card border-white">
                <div class="card-header">Heading 1</div>
                    <div class="card-body">
                        <p class="card-text">Some quick example text to build 
                           on the card 
                        title and make up the bulk of the card's content.</p>
                    </div>
                </div>
            </div><div class="col-sm-6 col-md-4">
            <div class="card border-white">
                <div class="card-header">Heading 1</div>
                    <div class="card-body">
                        <p class="card-text">Some quick example text to build 
                           on the card 
                        title and make up the bulk of the card's content.</p>
                    </div>
                </div>
            </div>
      </div>



     


    </div>
  );
};

export default Profile;

