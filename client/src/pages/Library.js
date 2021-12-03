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

    <div className="pb-3 bg-black px-3">
   

<nav class="flex-row mb-3 col-12 d-flex addgames-btn">
  <div class="container-fluid">
    <h2 class="p-1 pt-3 mb-3 mt-3 text-white">My Games</h2>
    <form class="d-flex">
      <button class="custom-btn" type="submit">Add Games</button>
    </form>
  </div>
</nav>



      <div class="row">

        <div class="col-sm-6 col-lg-3">
          <div class="">
            <div class="card-body">
              <img class="img-fluid" src={battle} alt="battlefield"></img>
            </div>
          </div>
        </div>

        <div class="col-sm-6 col-lg-3">
          <div class="">
            <div class="card-body">
              <img class="img-fluid" src={halo} alt="halo"></img>
            </div>
          </div>
        </div>

        <div class="col-sm-6 col-lg-3">
          <div class="">
            <div class="card-body">
              <img class="img-fluid" src={league} alt="leagueOfLegends"></img>
            </div>
          </div>
        </div>

        <div class="col-sm-6 col-lg-3">
          <div class="">
            <div class="card-body">
              <img class="img-fluid" src={cod} alt="callfoduty"></img>
            </div>
          </div>
        </div>

        <div class="col-sm-6 col-lg-3 mt-5">
          <div class="">
            <div class="card-body">
              <img class="img-fluid" src={forza} alt="callfoduty"></img>
            </div>
          </div>
        </div>

        <div class="col-sm-6 col-lg-3 mt-5">
          <div class="">
            <div class="card-body">
              <img class="img-fluid" src={stardew} alt="callfoduty"></img>
            </div>
          </div>
        </div>

      </div>






    </div>
  );
};

export default Library;
