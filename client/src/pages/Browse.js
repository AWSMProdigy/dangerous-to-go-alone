import React, { useState, useEffect }  from 'react';
import "../../src/styles.css";
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { QUERY_LIBRARY } from '../utils/queries';
import { ADD_GAME } from '../utils/mutations';

const Browse = () => {
    const { loading, data } = useQuery(QUERY_LIBRARY);
    const [addUserGame] = useMutation(ADD_GAME);
    const [selectedGame, setGame] = useState("");

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

    if(loading){
        return(<h1>Loading...</h1>)
    }
    else {
      {data.games.map((game) => (
        <h1>{game}</h1>
      ))}
    }
    

}

