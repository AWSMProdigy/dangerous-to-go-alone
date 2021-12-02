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
      <div className="container flex-row justify-space-between-lg align-center">
        <nav className="col-12 nav p-3 d-flex justify-content-between">
            <Link className="navItem" to="/">
            <img className="nav-logo" src={logo} alt="Dangerous Logo"></img>
            </Link>
            <div>
              {Auth.loggedIn() ? (
                <>
                  <Link className="navItem" to="/profile">
                  <h6>Profile</h6>
                  </Link>
                  <Link className="navItem" to="/library">
                  <h6>My Games</h6>
                  </Link>
                  <Link className="navItem" onClick={logout}>
                  <h6>Logout</h6>
                  </Link>
                  <Link className="navItem" to="/search">
                  <form className="form-inline my-2 input-group" id="searchForm">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" id="searchInput"></input>
                    <button className="btn my-5 my-sm-0" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
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
                    <button className="btn my-5 my-sm-0" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                          </svg>
                    </button>
                  </form>
                  </Link>
                </>
              )}
            </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
