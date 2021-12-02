import React from 'react';
import { Link } from 'react-router-dom';
import manGaming from '../assets/images/homepage/man-gaming-triangle.png';
import gameLibrary from '../assets/images/homepage/games-library.png';
import console from '../assets/images/homepage/console.png';
import battlefield from '../assets/images/homepage/battlefield.png';
import forza from '../assets/images/homepage/forza.png';
import stardew from '../assets/images/homepage/stardew.png';
import halo from '../assets/images/homepage/halo.png';

const Home = () => {

  return (
    <main className="main">
      <div className="row bg-black pb-5">
        <div id="hero" className="hero col-8">
          <img className="img-fluid" src={manGaming} alt="Man staring at a screen with gaming headphones on"></img>
        </div>
      <div className="col-3 my-auto mx-1">
        <h1 className="text-light mb-3">It's Dangerous To Go Alone...Take A Friend!</h1>
        <p className="text-light">Need some buds to play with or just want to organize the time spent gaming with your friends better? You've come to the right place.</p>
        <p className="text-light">Dangerous To Go Alone helps assist in pairing up friends and randos alike so no one has to play alone!</p>
        <Link to="/signup">
          <button type="button" class="custom-btn mt-3">Find Some Buds</button>
        </Link>
      </div>
      </div>

      <div className="row bg-black spacing">
      <div className="col-3 my-auto mx-auto">
        <h1 className="text-light mb-3 ml-3">Keep a Game Library</h1>
        <p className="text-light ml-3">Collect your games across all platforms into one convenient space. Even better, your friends can see what you choose to share so you can compare games and plan gaming sessions.</p>
        <Link to="/signup">
          <button type="button" class="custom-btn mt-3 ml-3">Build My Library</button>
        </Link>
      </div>
      <div className="col-8 g-0">
          <img className="img-fluid" src={gameLibrary} alt="A collection of xBox games"></img>
      </div>
      </div>

      <div className="row bg-black spacing">
        <div id="hero" className="hero col-8">
          <img className="img-fluid" src={console} alt="Man staring at a screen with gaming headphones on"></img>
        </div>
      <div className="col-3 my-auto mx-1">
        <h1 className="text-light">Pair Up Anywhere</h1>
        <p className="text-light">We encourage cross-platform gaming here. Match up with a friend on any console or PC.</p>
        <Link to="/signup">
          <button type="button" class="custom-btn mt-3">Match It Up</button>
        </Link>
      </div>
      </div>

      <div className="row mt-4">
        <div className="join-us">
        <h1 className="mt-3">Popular Right Now</h1>
          <div className="flex-row">
            <div className="col-3 mt-3">
              <img className="popular-now" src={battlefield} alt="Man looking over shoulder holding gun"></img>
            </div>
            <div className="col-3 mt-3">
              <img className="popular-now" src={forza} alt="Red Mercedes in the dirt"></img>
            </div>
            <div className="col-3 mt-3">
              <img className="popular-now" src={stardew} alt="Pixel house in front of mountains"></img>
            </div>
            <div className="col-3 mt-3">
              <img className="popular-now" src={halo} alt="Soldier holding gun"></img>
            </div>
          </div>
          <h3 className="mt-5">Ready To Join Us?</h3>
          <p className="justify-content-center">Join the biggest community of multiplayer gamers on the internet.</p>
          <Link to="/signup">
          <button type="button" class="custom-btn-join mt-3">Sign Up</button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
