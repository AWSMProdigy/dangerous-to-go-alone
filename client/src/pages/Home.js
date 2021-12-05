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
      <div className="row bg-black hero-row-one">
        <div id="hero" className="hero col-sm-12 col-md-12 col-lg-7 col-xl-8">
          <img className="img-fluid" src={manGaming} alt="Man staring at a screen with gaming headphones on"></img>
        </div>
      <div className="col-sm-10 col-md-10 col-lg-4 col-xl-3 my-auto mx-auto col-xs-12">
        <h1 id="take-friend" className="text-light mb-2 ml-3">It's Dangerous To Go Alone... Take A Friend!</h1>
        <p className="text-light ml-3">Need some buds to play with or just want to organize the time spent gaming with your friends better? You've come to the right place.</p>
        <p className="text-light ml-3">Dangerous To Go Alone helps assist in pairing up friends and randos alike so no one has to play alone!</p>
        <Link to="/signup">
          <button type="button" className="custom-btn mt-3 ml-3">Find Some Buds</button>
        </Link>
      </div>
      </div>

      <div className="row bg-black spacing">
        <div className="col-sm-10 col-md-3 my-auto mx-auto col-xs-12">
          <h1 className="text-light mb-3 ml-3">Keep a Game Library</h1>
          <p className="text-light ml-3">Collect your games across all platforms into one convenient space. Even better, your friends can see what you choose to share so you can compare games and plan gaming sessions.</p>
          <Link to="/signup">
            <button type="button" className="custom-btn mt-3 ml-3">Build My Library</button>
          </Link>
        </div>
        <div className="col-md-8 g-0">
            <img className="img-fluid game-library" src={gameLibrary} alt="A collection of xBox games"></img>
        </div>
      </div>

      <div className="row bg-black spacing">
        <div id="hero" className="hero col-md-8">
          <img className="img-fluid" src={console} alt="A close up shot of a Playstation controller"></img>
        </div>
        <div className="col-sm-10 col-md-3 my-auto mx-auto col-xs-12">
          <h1 className="text-light ml-3 pair-up">Pair Up Anywhere</h1>
          <p className="text-light ml-3">We encourage cross-platform gaming here. Match up with a friend on any console or PC.</p>
          <Link to="/signup">
            <button type="button" className="custom-btn mt-3 ml-3">Match It Up</button>
          </Link>
        </div>
      </div>

      <div className="row pt-1 pb-5 bg-black popular-row">
        <div className="join-us">
          <h1 className="pt-5 text-light">Popular Right Now</h1>
          <div className="flex-row flex-wrap">
            <div className="col-md-6 col-xl-3 mt-3">
              <img className="popular-item pop-games" src={battlefield} alt="Man looking over shoulder holding gun"></img>
            </div>
            <div className="col-sm-12 col-md-6 col-xl-3 mt-3">
              <img className="popular-item pop-games" src={forza} alt="Red Mercedes in the dirt"></img>
            </div>
            <div className="col-md-6 col-xl-3 mt-3">
              <img className="popular-item pop-games" src={stardew} alt="Pixel house in front of mountains"></img>
            </div>
            <div className="col-md-6 col-xl-3 mt-3">
              <img className="popular-item pop-games" src={halo} alt="Soldier holding gun"></img>
            </div>
          </div>
          <div className="col-12 flex-wrap justify-content-center">
            <h3 className="pt-5 text-light">Ready To Join Us?</h3>
            <p className="justify-content-center text-light flex-wrap mx-3">Join the biggest community of multiplayer gamers on the internet.</p>
            <Link to="/signup">
            <button type="button" className="custom-btn mt-3">Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
