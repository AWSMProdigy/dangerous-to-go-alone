import React, { useState, useEffect }  from 'react';
import "../../src/styles.css";
import Select from 'react-select';

import battle from "../assets/images/libraryImages/battlefield.jpg"
import halo from "../assets/images/libraryImages/haloinfinite.jpg"
import league from "../assets/images/libraryImages/LoL.jpg"
import cod from "../assets/images/libraryImages/blackops.jpg"
import forza from "../assets/images/libraryImages/forza.jpg"
import stardew from "../assets/images/libraryImages/stardew.jpg"
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';


import { QUERY_LIBRARY } from '../utils/queries';
import { ADD_GAME } from '../utils/mutations';


const Library = () => {

  const { loading, data } = useQuery(QUERY_LIBRARY);
  const [addUserGame] = useMutation(ADD_GAME);
  const [selectedGame, setGame] = useState("");
  const [newGame, setNew] = useState("");

  useEffect(() => {
    setNew("")
  }, [newGame]);

  const handleChange = (event) => {
    if(event){
      setGame(event.value);
    }
  }



  const addGame = async () => {
    console.log(selectedGame);
    try{
      const { data } = await addUserGame({
        variables: {
          title: selectedGame
        }
      })
      console.log(selectedGame);
      setNew('Hi');
    }
    catch(err){
      console.error(err);
    }
  }

  const getPic = (title) => {
    let pic;
    switch(title){
      case "Battlefield 2042":
        pic=battle;
        break;
      case "Halo Infinite":
        pic=halo;
        break;
      case "League of Legends":
        pic=league;
        break;
      case "Black Ops 2":
        pic=cod;
        break;
        case "Forza Horizon 5":
        pic=forza;
        break;
      case "Stardew Valley":
        pic=stardew;
        break;
      default:
        pic = halo;
        break;
    }
    return pic;
  }

  if(loading){
    return(<h1>Loading...</h1>)
  }
  else {
    console.log(data.me.games);
    const gameTitles = data.games.map(a =>({label: a.title, value: a.title}));
    return (
      <main className="bg-black">
        <div id="games-library" className="pb-3 px-3">
        <div className="mb-3 d-flex justify-content-between align-items-end">
            <h2 className="p-2 ml-2 mt-4 text-white">My Games</h2>
            <div className="flex-row pb-2">
              <Select className="mr-4 red-text" options={gameTitles} placeholder={"Search for a game"} isClearable={true} onChange={handleChange}/>
              <button className="custom-btn mr-3" onClick={()=>addGame()}> + </button>
            </div>
        </div>

        <div className="flex-row">
        {data.me.games.map((game, index) => (
        <div className="col-sm-6 col-md-4 col-lg-2">
          <div className="p-3 game-library">
            <Link to={`/game/${game}`}>
            <img className="img-fluid pop-games" src={getPic(game)} alt={game}></img>
            </Link>
            {/* <button className="custom-btn game-btn mx-auto mt-3" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
              </svg>
            </button> */}
          </div>
        </div>
          ))}
        </div>
      </div>
      </main>

    );
  };
  }

  

export default Library;
