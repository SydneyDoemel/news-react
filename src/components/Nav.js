import React, { Component, useState } from 'react';
import '../nav.css'
import { Link } from 'react-router-dom';
import Business from '../views/Business';


export default function Nav({user, logMeOut, category, setCategory}) {
 
  return (
    
    <div>
     
      <nav className="navbar navbar-expand-lg bg-light">
    <div className="container-fluid">
      <Link className="navbar-brand" to='/'>MyNews</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      
          <li className="nav-item">
            <Link className="nav-link" to="/top">Top Stories</Link>
          </li>
          <li>
          <div className="dropdown">
          <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Categories
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <Link className="dropdown-item" onClick={()=>setCategory('Business')} to="/business" >Business</Link>
            <Link className="dropdown-item" onClick={()=>setCategory('Entertainment')} to="/entertainment">Entertainment</Link>
            <Link className="dropdown-item" onClick={()=>setCategory('Health')} to="/health">Health</Link>
            <Link className="dropdown-item" onClick={()=>setCategory('Science')} to="/science">Science</Link>
            <Link className="dropdown-item" onClick={()=>setCategory('Sports')} to="/sports">Sports</Link>
            <Link className="dropdown-item" onClick={()=>setCategory('Technology')} to="/technology">Technology</Link>
          </div>
        </div>
          </li>
        </ul>
          {user.username ?
            <>
                <div className='d-flex'>
                <div className='dropdown'>
                <button className="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Hello, {user.username}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <Link className="dropdown-item" to="/preferences">Preferences</Link>
                  <Link className="dropdown-item" to="/saved">Saved</Link>
                  <Link onClick={logMeOut} className="dropdown-item" to="/login">Log Out</Link>
                </div>
                </div>
                </div>
              
            </>
            :
            <>
             <li className="nav-item">
                <div className='dropdown'>
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Hello, Guest
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <Link className="dropdown-item" to="/login">Login</Link>
                  <Link className="dropdown-item" to="/signup">Sign Up</Link>
                  
                </div>
                </div>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">Sign Up</Link>
              </li> */}
              
            </>
          }

      
        {/* <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form> */}
      </div>
    </div>
  </nav>

  </div>
  )
}
