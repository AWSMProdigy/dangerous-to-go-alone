import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import logo from '../../assets/Dangerous-Logo-White.png';
import '../../styles.css'

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    window.location.assign('/');
  };
  return (
    <header className="bg-black text-light py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-sm align-center">
        <nav className="col-md-12 nav navbar-expand-md p-3 nav-wrapper">
            <Link className="navItem" to="/">
            <img className="nav-logo" src={logo} alt="Dangerous Logo"></img>
            </Link>
            <div class="collapse navbar-collapse justify-content-end" id="mynav">
              {Auth.loggedIn() ? (
                <>
                  <Link className="navItem" to="/me">
                  <h6>Profile</h6>
                  </Link>
                  <Link className="navItem" to="/Library">
                  <h6>Games</h6>
                  </Link>
                  <Link className="navItem" onClick={logout}>
                  <h6>Logout</h6>
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
            <div className="button-wrapper">
              <button id="custom-toggler"class="navbar-toggler" type="button" data-toggle="collapse" data-target="#mynav">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="30" fill="#f00" class="bi bi-list" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                  </svg>
              </button>
            </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
