import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useNavigate hook
import "../signup.css";  // Import the signup CSS file

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");  // State for managing error messages

  const navigate = useNavigate();  // Hook for navigation

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");  // Reset the error state before making the request

    // Simple validation
    if (!username || !email || !password || !password2) {
      setError("All fields are required.");
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/register/", {
        username,
        email,
        password,
        password2,
      });

      alert("Signup successful");
      navigate("/login");  // Redirect to login page after successful signup
    } catch (error) {
      setError("Signup failed. Please try again.");
      console.error("Signup failed", error);
    }
  };

  return (
    <>
      <div className="header">
        <h1>Sign Up Page</h1>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
      <div className="signup-container">
        <form onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          {error && <div className="error-message">{error}</div>}  {/* Display error message */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Again Password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
};

export default Signup;
