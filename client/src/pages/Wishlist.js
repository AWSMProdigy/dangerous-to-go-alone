import React from 'react';
import "../../src/styles.css";

const Wishlist = () =>{
return (
    <div className="container mb-3">
      <div className="flex-row">
        <h2 className="col-12 p-1 pt-3 mb-3 mt-3">
          Your Wishlist
        </h2>
      </div>
      <div className="row">
        <table class="ml-3">
          <tr className="wishlist-row">
            <th className="col-8 wishlist-header">Sid Meier's Civilization VI</th>
            <th><a href="https://www.amazon.com/Sid-Meiers-Civilization-VI-Nintendo-Switch/dp/B07HH8ZSMM/ref=sr_1_1?keywords=civ+6&qid=1638805748&sr=8-1" target="_blank" rel="noreferrer">
              <button className="custom-btn-wishlist mx-1">Amazon</button></a></th>
            <th><a href="https://store.steampowered.com/app/289070/Sid_Meiers_Civilization_VI/" target="_blank" rel="noreferrer">
              <button className="custom-btn-wishlist mx-1">Steam</button></a></th>
            <th><a href="https://www.gamestop.com/video-games/nintendo-switch/products/sid-meiers-civilization-vi---nintendo-switch/179369.html" target="_blank" rel="noreferrer">
              <button className="custom-btn-wishlist mx-1">GameStop</button></a></th>
            <th><a href="https://www.target.com/p/sid-meier-39-s-civilization-vi-nintendo-switch-digital/-/A-77362743#lnk=sametab" target="_blank" rel="noreferrer">
              <button className="custom-btn-wishlist mx-1">Target</button></a></th>
          </tr>

          <tr className="wishlist-row">
            <th className="col-8 wishlist-header">Terraria</th>
            <th><a href="https://www.amazon.com/Terraria-Nintendo-Switch/dp/B077TVSKSZ/ref=sr_1_3?keywords=terraria&qid=1638805767&sr=8-3" target="_blank" rel="noreferrer">
              <button className="custom-btn-wishlist mx-1">Amazon</button></a></th>
            <th><a href="https://store.steampowered.com/app/105600/Terraria/" target="_blank" rel="noreferrer">
              <button className="custom-btn-wishlist mx-1">Steam</button></a></th>
            <th><a href="https://www.gamestop.com/video-games/nintendo-switch/products/terraria---nintendo-switch/204007.html" target="_blank" rel="noreferrer">
              <button className="custom-btn-wishlist mx-1">GameStop</button></a></th>
            <th><a href="https://www.target.com/p/terraria-nintendo-switch-digital/-/A-79237772#lnk=sametab" target="_blank" rel="noreferrer">
              <button className="custom-btn-wishlist mx-1">Target</button></a></th>
          </tr>

          <tr className="wishlist-row">
            <th className="col-8 wishlist-header">Dead by Daylight</th>
            <th><a href="https://www.amazon.com/Dead-Daylight-Definitive-Nintendo-Switch/dp/B07TJWSZQT/ref=sr_1_4?keywords=dead+by+daylight&qid=1638805813&sr=8-4" target="_blank" rel="noreferrer">
              <button className="custom-btn-wishlist mx-1">Amazon</button></a></th>
            <th><a href="https://store.steampowered.com/app/381210/Dead_by_Daylight/" target="_blank" rel="noreferrer">
              <button className="custom-btn-wishlist mx-1">Steam</button></a></th>
            <th><a href="https://www.gamestop.com/video-games/nintendo-switch/products/dead-by-daylight-definitive-edition---nintendo-switch/204640.html" target="_blank" rel="noreferrer">
              <button className="custom-btn-wishlist mx-1">GameStop</button></a></th>
            <th><a href="https://www.target.com/p/dead-by-daylight-nintendo-switch-digital/-/A-77589823#lnk=sametab" target="_blank" rel="noreferrer">
              <button className="custom-btn-wishlist mx-1">Target</button></a></th>
          </tr>

          <tr className="wishlist-row">
            <th className="col-8 wishlist-header">Borderlands 3</th>
            <th><a href="https://www.amazon.com/Borderlands-3-Super-Deluxe-Xbox-One/dp/B07Q47W1B4/ref=sr_1_3?keywords=borderlands+3&qid=1638805833&sr=8-3" target="_blank" rel="noreferrer">
              <button className="custom-btn-wishlist mx-1">Amazon</button></a></th>
            <th><a href="https://store.steampowered.com/app/397540/Borderlands_3/" target="_blank" rel="noreferrer">
              <button className="custom-btn-wishlist mx-1">Steam</button></a></th>
            <th><a href="https://www.gamestop.com/video-games/xbox-one/products/borderlands-3/205948.html" target="_blank" rel="noreferrer">
              <button className="custom-btn-wishlist mx-1">GameStop</button></a></th>
            <th><a href="https://www.target.com/p/borderlands-3-xbox-one-digital/-/A-77435287#lnk=sametab" target="_blank" rel="noreferrer">
              <button className="custom-btn-wishlist mx-1">Target</button></a></th>
          </tr>

          <tr className="wishlist-row">
            <th className="col-8 wishlist-header">Back 4 Blood</th>
            <th><a href="https://www.amazon.com/Back-Blood-Ultimate-Xbox-X/dp/B08R21WNYD" target="_blank" rel="noreferrer">
              <button className="custom-btn-wishlist mx-1">Amazon</button></a></th>
            <th><a href="https://store.steampowered.com/app/924970/Back_4_Blood/" target="_blank" rel="noreferrer">
              <button className="custom-btn-wishlist mx-1">Steam</button></a></th>
            <th><a href="https://www.gamestop.com/video-games/xbox-series-x%7Cs/products/back-4-blood---xbox-one/234598.html" target="_blank" rel="noreferrer">
              <button className="custom-btn-wishlist mx-1">GameStop</button></a></th>
            <th><a href="https://www.target.com/p/back-4-blood-xbox-series-x-s-xbox-one-digital/-/A-84690681#lnk=sametab" target="_blank" rel="noreferrer">
              <button className="custom-btn-wishlist mx-1">Target</button></a></th>
          </tr>

          <tr className="wishlist-row">
            <th className="col-8 wishlist-header">Mortal Kombat 11</th>
            <th><a href="https://www.amazon.com/Mortal-Kombat-11-Ultimate-Xbox-One/dp/B09B94W9HG/ref=sr_1_3?keywords=mortal+kombat+11&qid=1638807667&sr=8-3" target="_blank" rel="noreferrer">
              <button className="custom-btn-wishlist mx-1">Amazon</button></a></th>
            <th><a href="https://store.steampowered.com/app/976310/Mortal_Kombat11/" target="_blank" rel="noreferrer">
              <button className="custom-btn-wishlist mx-1">Steam</button></a></th>
            <th><a href="https://www.gamestop.com/video-games/nintendo-switch/products/mortal-kombat-11---nintendo-switch/187499.html" target="_blank" rel="noreferrer">
              <button className="custom-btn-wishlist mx-1">GameStop</button></a></th>
            <th><a href="https://www.target.com/p/mortal-kombat-11-nintendo-switch/-/A-54422424#lnk=sametab" target="_blank" rel="noreferrer">
              <button className="custom-btn-wishlist mx-1">Target</button></a></th>
          </tr>

          <tr className="wishlist-row">
            <th className="col-8 wishlist-header">No Man's Sky</th>
            <th><a href="https://www.amazon.com/No-Mans-Sky-Xbox-One/dp/B07CB6YFYC/ref=sr_1_1?keywords=no+mans+sky&qid=1638805795&sr=8-1" target="_blank" rel="noreferrer">
              <button className="custom-btn-wishlist mx-1">Amazon</button></a></th>
            <th><a href="https://store.steampowered.com/app/275850/No_Mans_Sky/" target="_blank" rel="noreferrer">
              <button className="custom-btn-wishlist mx-1">Steam</button></a></th>
            <th><a href="https://www.gamestop.com/video-games/xbox-one/products/no-mans-sky/174932.html" target="_blank" rel="noreferrer">
              <button className="custom-btn-wishlist mx-1">GameStop</button></a></th>
          </tr>

          <tr className="wishlist-row">
            <th className="col-8 wishlist-header">Ultimate Chicken Horse</th>
            <th><a href="https://www.amazon.com/Ultimate-Chicken-Horse-Neigh-Versary-Nintendo-Switch/dp/B099YLVPVB/ref=sr_1_1?keywords=ultimate+chicken+horse&qid=1638805718&sr=8-1" target="_blank" rel="noreferrer">
              <button className="custom-btn-wishlist mx-1">Amazon</button></a></th>
            <th><a href="https://store.steampowered.com/app/386940/Ultimate_Chicken_Horse/" target="_blank" rel="noreferrer">
              <button className="custom-btn-wishlist mx-1">Steam</button></a></th>
            <th><a href="https://www.gamestop.com/video-games/nintendo-switch/products/ultimate-chicken-horse-a-neigh-versary-edition---nintendo-switch/304332.html" target="_blank" rel="noreferrer">
              <button className="custom-btn-wishlist mx-1">GameStop</button></a></th>
          </tr>

        </table>
      </div>
    </div>
  );
};

export default Wishlist;
