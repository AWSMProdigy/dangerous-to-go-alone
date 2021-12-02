import React from 'react';
import "../../src/library.css";
import "../../src/styles.css";


import battle from "../assets/images/libraryImages/battle.jpg"
import halo from "../assets/images/libraryImages/halo.jpg"
import league from "../assets/images/libraryImages/league.jpg"
import cod from "../assets/images/libraryImages/cod.jpg"
const Library = () =>{
return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="col-12 bg-dark text-white p-3 mb-5">
          Viewing your games
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

export default Library;
