import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";

const Auth = ({ setUser }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || (isSignUp && !formData.name)) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const endpoint = isSignUp ? "/signup" : "/signin";
      const { data } = await axios.post(`http://localhost:5000${endpoint}`, formData);

      localStorage.setItem("token", data.token);
      setUser(data.user);
    } catch (error) {
      alert(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        {isSignUp && (
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        )}
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
      </form>
      <p onClick={() => setIsSignUp(!isSignUp)} className="toggle-text">
        {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
      </p>
    </div>
  );
};

export default Auth;
