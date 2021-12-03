import React from 'react';
import "../../src/styles.css";


import battle from "../assets/images/libraryImages/battlefield.jpg"
import halo from "../assets/images/libraryImages/haloinfinite.jpg"
import league from "../assets/images/libraryImages/LoL.jpg"
import cod from "../assets/images/libraryImages/blackops.jpg"
import forza from "../assets/images/libraryImages/forza.jpg"
import stardew from "../assets/images/libraryImages/stardew.jpg"
const Library = () =>{
return (
    <div className="container mb-3">
      <div className="flex-row mb-3">
        <h2 className="col-12 p-1 pt-3 mb-3 mt-3">
          Your Games
        </h2>

      </div>
      <div class="row">

        <div class="col-sm-6 col-md-4">
          <div class="card border-white">
            <div class="card-body">
              <img class="border image-fluid" src={battle} alt="battlefield"></img>
            </div>
          </div>
        </div>

        <div class="col-sm-6 col-md-4">
          <div class="card border-white">
            <div class="card-body">
              <img class="border image-flui" src={halo} alt="halo"></img>
            </div>
          </div>
        </div>

        <div class="col-sm-6 col-md-4">
          <div class="card border-white">
            <div class="card-body">
            <img class="border image-fluid" src={league} alt="leagueOfLegends"></img>
            </div>
          </div>
        </div>

        <div class="col-sm-6 col-md-4">
          <div class="card border-white">
            <div class="card-body">
            <img class="border image-fluid" src={cod} alt="callfoduty"></img>
            </div>
          </div>
        </div>

        <div class="col-sm-6 col-md-4">
          <div class="card border-white">
            <div class="card-body">
            <img class="border image-fluid" src={forza} alt="callfoduty"></img>
            </div>
          </div>
        </div>

        <div class="col-sm-6 col-md-4">
          <div class="card border-white">
            <div class="card-body">
            <img class="border image-fluid" src={stardew} alt="callfoduty"></img>
            </div>
          </div>
        </div>

      </div>






    </div>
  );
};

export default Library;
