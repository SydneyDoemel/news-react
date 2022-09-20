import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import Business from '../views/Business';


export default function Nav({user, logMeOut, category, setCategory}) {
 
  return (
    
    <div>
     
      <nav className="navbar navbar-expand-lg bg-light">
    <div className="container-fluid">
      <a className="navbar-brand" href="/">Navbar</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
          </li>
          {/* <li className="nav-item">
            <Link className="nav-link" to="/contact">Contact</Link>
          </li> */}
          <li className="nav-item">
            <Link className="nav-link" to="/news">MyNews</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/top">Top Stories</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/preferences">Preferences</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/saved">Saved</Link>
          </li>
          <li>
          <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
          {/* <li className="nav-item">
            <Link className="nav-link" to="/feed">Finstagram</Link>
          </li> */}

          {user.username ?
            <>
              <li className="nav-item">
                <p className="nav-link">Hello, {user.username}</p>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to="/posts/create">Create Post</Link>
              </li> */}
              <li className="nav-item" onClick={logMeOut}>
                <Link className="nav-link" to="/login">Log Out</Link>
              </li>
            </>
            :
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">Sign Up</Link>
              </li>
              
            </>
          }




          {/* <li className="nav-item">
            <Link className="nav-link" to="/todo">To Do List</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/shop">Shop</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/cart">{this.props.cart.length} | {this.getSubTotal()}</Link>
          </li> */}
        </ul>
        <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>

  </div>
  )
}
