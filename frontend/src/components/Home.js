// src/components/Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../home.css'

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Home Page</h1>
      <p>This is the main page of your website.</p>
      <div className="links">
        <Link to="/login" className="link">Login</Link>
        <Link to="/signup" className="link">Sign Up</Link>
      </div>
    </div>
  );
};

export default Home;
