import React from 'react';
import './Popup.css';
import Auth from '../utils/auth';

function Popup(props){

    const handleUpdate = async(add, _id, username) => {
        console.log(add, _id, username);
        await props.updateLfg(add, _id, username)
        .then(response => {
            console.log(response);
            props.setPopup({trigger: false})
        })
    }
    return ( props.state.trigger) ? (
        <div className='popup'>
            <div className='popupInner'>
                <div className='popupHeader'>
                    <h1>{props.state.title}<span> by {props.state.creator}</span></h1>
                </div>
                <div className='popupBody'>
                    <div className='popupInfo'>
                        <h2>Player Count: {props.state.players.length}/{props.state.capacity}</h2>
                        <h2>Playstyle: {props.state.playstyle}</h2>
                    </div>
                    <div className='popupPlayers'>
                        <h2>{props.state.players}</h2>
                        {(Auth.loggedIn() && props.state.me !== props.state.creator) ? (
                            <>
                            {(props.state.players.find(player => player === props.state.me) !== undefined && props.state.players.length < props.state.capacity) ? (
                            <button className='closeBtn' onClick={() => handleUpdate(false, props.state._id, props.state.me)}>Leave LFG</button> 
                            ) : (
                            <button className='closeBtn' onClick={() => handleUpdate(true, props.state._id, props.state.me)}>Join LFG</button> 
                            )}
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <button className='closeBtn' onClick={() => props.setPopup({trigger: false})}>Close</button>
            </div>
        </div>
    ) : ""
}

export default Popup;