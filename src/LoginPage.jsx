// src/LoginPage.jsx
import React, { useState } from 'react';
import './LoginPage.css'; // Create a CSS file for custom styles

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Password is the first 3 letters of the email
    const expectedPassword = email.slice(0, 3);

    if (password === expectedPassword) {
      // Redirect to main page or perform login logic
      window.location.href = '/'; // Redirect to home page (adjust this according to your routing logic)
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>StreamStorm</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
