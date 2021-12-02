import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/Dangerous-Logo-White.png';
import '../../styles.css'

import Auth from '../../utils/auth';

const Footer = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <footer className="mt-auto p-5 bg-black">
      <div className="container text-left mb-5">
        <div className="row gy-4 flex-shrink-0">
          <div className="col-lg-4 col-md-6">
            <img id="footer-logo" src={logo} alt="Dangerous Logo"></img>
            <p className="small text-muted mb-0 mt-2">&copy; Copyright 2021 Dangerous To Go Alone</p> 
            <p className="small text-muted mb-0">All Rights reserved.</p>
          </div>
          <div className="col-lg-3 col-md-6 text-left">
            <h5 className="text-white mb-3">Quick Links</h5>
            <div>
              {Auth.loggedIn() ? (
                <>
                  <Link className="navItem" to="/profile">
                  <h6>Profile</h6>
                  </Link>
                  <Link className="navItem" to="/library">
                  <h6>My Games</h6>
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
                      <button className="btn" id="button-addon2" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                        </svg>
                      </button>
                    </div>
                </form>
            </div>
        </div>


        {/* <h4>
          Made with{' '}
          <span
            className="emoji"
            role="img"
            aria-label="heart"
            aria-hidden="false"
          >
            ❤️
          </span>{' '}
          by the Tech Thoughts team.
        </h4> */}
      </div>
    </footer>
  );
};

export default Footer;
