import React from 'react';
import './Popup.css';

function Popup(props){
    return ( props.state.trigger) ? (
        <div className='popup'>
            <div className='popupInner'>
                <button className='closeBtn' onClick={() => props.setPopup({trigger: false})}>Close</button>
                {props.children}
            </div>
        </div>
    ) : ""
}

export default Popup;