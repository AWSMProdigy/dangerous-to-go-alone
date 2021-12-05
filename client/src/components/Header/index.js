import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/Dangerous-Logo-White.png';
import '../../styles.css'

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
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
                  <Link className="navItem" to="/search">
                  <form className="form-inline my-2 input-group" id="searchForm">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" id="searchInput"></input>
                    <button className="btn my-5 my-sm-0" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                          </svg>
                    </button>
                  </form>
                  </Link>
                </>
              ) : (
                <>
                  <Link className="navItem" to="/Login">
                  <h6>Login</h6>
                  </Link>
                  <Link className="navItem" to="/search">
                  <form className="form-inline my-2 input-group" id="searchForm">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" id="searchInput"></input>
                    <button className="btn my-5 my-sm-0" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                          </svg>
                    </button>
                  </form>
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
