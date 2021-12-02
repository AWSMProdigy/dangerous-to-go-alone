import React from 'react';
import { Link } from 'react-router-dom';
import manGaming from '../assets/images/man-gaming-triangle.png';

const Home = () => {

  return (
    <main className="main">
      <div className="row bg-black">
        <div id="hero" className="hero col-8">
          <img className="img-fluid" src={manGaming} alt="Man staring at a screen with gaming headphones on"></img>
        </div>
      <div className="col-3 my-auto mx-1">
        <h1 className="text-light">It's Dangerous To Go Alone...</h1>
        <h1 className="text-light mb-3">Take A Friend!</h1>
        <p className="text-light">Need some buds to play with or just want to organize the time spent gaming with your friends better? You've come to the right place.</p>
        <p className="text-light">Dangerous To Go Alone helps assist in pairing up friends and randos alike so no one has to play alone!</p>
        <Link to="/signup">
          <button type="button" className="custom-btn mt-4">Sign Up</button>
        </Link>
      </div>
      </div>
    </main>
  );
};

export default Home;
