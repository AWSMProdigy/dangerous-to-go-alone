import React, { useState, useEffect }  from 'react';
import "../../src/styles.css";
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { QUERY_LIBRARY } from '../utils/queries';
import { ADD_GAME } from '../utils/mutations';
import { Link } from 'react-router-dom';


const Browse = () => {
  const { loading, data } = useQuery(QUERY_LIBRARY);
  const [addUserGame] = useMutation(ADD_GAME);
  const [selectedGame, setGame] = useState("");
  const [listedGames, setListed] = useState([]);

  useEffect(() => {
    if(loading){

    }
    else{
      setListed(data.games)
    }
  }, [loading]);

  const addGame = async () => {
      console.log(selectedGame);
      try{
        const { data } = await addUserGame({
          variables: {
            title: selectedGame
          }
        })
        console.log(selectedGame);
      }
      catch(err){
        console.error(err);
      }
  }

  const handleChange = (event) => {
      if(event){
        setGame(event.value);
      }
    }

  const handleSearchChange = (event) => {
    console.log(event.target.value);
    setListed(data.games.filter(game => {
      return game.title.includes(event.target.value);
    }))
  }

  if(loading){
      return(<h1>Loading...</h1>)
  }
  else {
    return(
      <main>
      <div className='filters'>
        <div className='d-flex w-100 bg-black'>
          <h2>Action</h2>
          <h2>Racing</h2>
          <h2>Open-world</h2>
          <h2>Strategy</h2>
          <h2>RPG</h2>
        </div>
        <input className="form-control mr-sm-2" type="search" placeholder="Search game" aria-p="Search" id="searchInput" onInput={(e) => handleSearchChange(e)}></input>
      </div>
      <div className='d-flex flex-row align-items-stretch flex-wrap'>
        {listedGames.map((game, index) => (
          <div className="col-sm-6 col-md-4 col-lg-2 align-top">
            <div className="p-3">  
              <Link to={`/game/${game.title}`}><img className="img-fluid pop-games" alt={`${game.title}`}src={require(`../assets/images/gameImages/${game.title}.jpg`).default}></img></Link>
              <h2>{game.title}</h2>
            </div>
          </div>
        ))}
      </div>
      </main>
      
    )
  }
}

export default Browse;

