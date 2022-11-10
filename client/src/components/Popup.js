import React from 'react';
import './Popup.css';

function Popup(props){
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
                    </div>
                </div>
                <button className='closeBtn' onClick={() => props.setPopup({trigger: false})}>Close</button>
                {props.children}
            </div>
        </div>
    ) : ""
}

export default Popup;