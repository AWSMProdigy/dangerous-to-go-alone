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
            <th className="col-8">Stardew Valley</th>
            <th><a href="https://www.amazon.com/Stardew-Valley-Nintendo-Switch/dp/B08F8KRRGL/ref=sr_1_3?keywords=stardew+valley&qid=1638560414&sr=8-3" target="_blank" rel="noreferrer">
              <button className="custom-btn-wishlist mx-1">Amazon</button></a></th>
            <th><a href="https://store.steampowered.com/app/413150/Stardew_Valley/" target="_blank" rel="noreferrer">
              <button className="custom-btn-wishlist mx-1">Steam</button></a></th>
            <th><a href="https://www.gamestop.com/video-games/nintendo-switch/products/stardew-valley---nintendo-switch/220265.html" target="_blank" rel="noreferrer">
              <button className="custom-btn-wishlist mx-1">GameStop</button></a></th>
            <th><a href="https://www.target.com/p/stardew-valley-nintendo-switch-digital/-/A-54011133#lnk=sametab" target="_blank" rel="noreferrer">
              <button className="custom-btn-wishlist mx-1">Target</button></a></th>
          </tr>

          <tr className="wishlist-row">
            <th className="col-8 wishlist-header">Game Name</th>
            <th><a href="#" target="_blank" rel="noreferrer">
              <button className="custom-btn-wishlist mx-1">Amazon</button></a></th>
            <th><a href="#" target="_blank" rel="noreferrer">
              <button className="custom-btn-wishlist mx-1">Steam</button></a></th>
            <th><a href="#" target="_blank" rel="noreferrer">
              <button className="custom-btn-wishlist mx-1">GameStop</button></a></th>
            <th><a href="#" target="_blank" rel="noreferrer">
              <button className="custom-btn-wishlist mx-1">Target</button></a></th>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Wishlist;
