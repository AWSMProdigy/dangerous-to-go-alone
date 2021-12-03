import React from 'react';
import "../../src/styles.css";


import battle from "../assets/images/libraryImages/battlefield.jpg"
import halo from "../assets/images/libraryImages/haloinfinite.jpg"
import league from "../assets/images/libraryImages/LoL.jpg"
import cod from "../assets/images/libraryImages/blackops.jpg"
import forza from "../assets/images/libraryImages/forza.jpg"
import stardew from "../assets/images/libraryImages/stardew.jpg"
const Wishlist = () =>{
return (
    <div className="container mb-3">
      <div className="flex-row mb-3">
        <h2 className="col-12 p-1 pt-3 mb-3 mt-3">
          Your Games
        </h2>

      </div>
      <div className="row">
        <div className="col-sm-6 col-md-4">
          <div className="card border-white">

            <div className="card-body">
              <img className="bat" src={battle} alt="battlefield"></img>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-4">
          <div className="card border-white">

            <div className="card-body">
              <img className="bat" src={halo} alt="halo"></img>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-4">
          <div className="card border-white">
            
            <div className="card-body">
            <img className="bat" src={league} alt="leagueOfLegends"></img>

            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-4">
          <div className="card border-white">
            
            <div className="card-body">
            <img className="bat" src={cod} alt="callfoduty"></img>

            </div>
          </div>
        </div>

      </div>






    </div>
  );
};

export default Wishlist;
