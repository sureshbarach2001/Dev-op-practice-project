// src/components/Login.js

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useNavigate hook
import "../login.css";  // Import CSS for styling

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");  // State for managing error messages

  const navigate = useNavigate();  // Hook for navigation

  // Handle back button navigation
  const handleBack = () => {
    navigate("/");  // Navigate to the home page
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");  // Reset error state before making the request

    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/login/", {
        username,
        password,
      });

      // Store the token in localStorage upon successful login
      localStorage.setItem("token", response.data.token);
      alert("Login successful");
      navigate("/");  // Redirect to the home page after successful login
    } catch (error) {
      console.error("Login failed", error);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      <div className="header">
        <h1>Login Page</h1>
        <button onClick={handleBack}>Back to Home</button>
      </div>
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          {error && <div className="error-message">{error}</div>}  {/* Display error if any */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
