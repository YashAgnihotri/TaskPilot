import React, { useState } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";

const Auth = ({ setUser, setShowAuth }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = "https://taskpilot-backend-yash.onrender.com/api/auth";

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = isSignUp ? "/signup" : "/signin";
      const { data } = await axios.post(`${API_URL}${endpoint}`, formData);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);
      setShowAuth(false);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-container">
        <button className="close-button" onClick={() => setShowAuth(false)}>
          <FaTimes />
        </button>
        <h2 className="auth-title">{isSignUp ? "Create an Account" : "Welcome Back"}</h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          {isSignUp && (
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
          )}
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <p className="toggle-text" onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
        </p>
      </div>
    </div>
  );
};

export default Auth;
