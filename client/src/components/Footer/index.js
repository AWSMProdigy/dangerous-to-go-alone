import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/Dangerous-Logo-White.png';
import heart from '../../assets/8-bit_heart.png';
import '../../styles.css'

import Auth from '../../utils/auth';

const Footer = () => {
  return (
    <footer className="pt-5 p-5 bg-black">
      <div className="container text-left">
        <div className="row gy-4 flex-shrink-0">
          <div className="col-lg-4 col-md-6">
            <img id="footer-logo" className="mb-3" src={logo} alt="Dangerous Logo"></img>
            <p className="small text-muted d-block">&copy; 2021 Dangerous To Go Alone</p>
            <p className="small text-muted">
              Made with{' '} <img className="footer-heart" src={heart} alt="8-Bit Heart"></img>{' '}by the Beau Street Boys.
            </p>
          </div>
          <div className="col-lg-3 col-md-6 text-left">
            <h5 className="text-white mb-3">Quick Links</h5>
            <div>
              {Auth.loggedIn() ? (
                <>
                  <Link className="navItem" to="/me">
                  <h6>Profile</h6>
                  </Link>
                  <Link className="navItem" to="/Library">
                  <h6>Games</h6>
                  </Link>
                </>
              ) : (
                <>
                  <Link className="navItem" to="/Login">
                  <h6>Login</h6>
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-1-xs">
                <h5 className="text-white mb-3">Newsletter</h5>
                <p className="small text-muted">Want to stay updated on everything Dangerous To Go Alone is doing? Insert your email below to join our newsletter mailing list!</p>
                <form action="#">
                    <div className="input-group mb-3">
                      <input className="form-control" type="text" placeholder="Email" aria-label="Recipient's username" aria-describedby="button-addon2"></input>
                      <button className="btn" id="button-addon2" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                        </svg>
                      </button>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
