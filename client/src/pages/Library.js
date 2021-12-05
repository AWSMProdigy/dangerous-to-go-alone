import React from 'react';
import "../../src/styles.css";


import battle from "../assets/images/libraryImages/battlefield.jpg"
import halo from "../assets/images/libraryImages/haloinfinite.jpg"
import league from "../assets/images/libraryImages/LoL.jpg"
import cod from "../assets/images/libraryImages/blackops.jpg"
import forza from "../assets/images/libraryImages/forza.jpg"
import stardew from "../assets/images/libraryImages/stardew.jpg"
const Library = () => {
  return (

      <div class="row">

        <div class="col-sm-6 col-md-4">
          <div class="card border-white">
            <div class="card-body">

              <img class="img-fluid" src={battle} alt="battlefield"></img>
              <button class="custom-btn" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
</svg></button>

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
  );
};

export default Library;
