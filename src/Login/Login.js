import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Define the API URL
    const apiUrl = 'http://localhost:8000/login'; // Replace with the correct API URL if needed

    try {
      // Send a POST request to the login endpoint
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Login failed. Invalid credentials.');
      }

      // Parse the response JSON data
      const data = await response.json();

      // Store the JWT token in localStorage or sessionStorage for further authenticated requests
      localStorage.setItem('accessToken', data.access_token);
      window.location = "/customers/" 
      
      // Redirect or perform any other logic after successful login
      // For example, you can redirect to a protected page:
      // history.push('/protected');

    } catch (error) {
      alert ('Login Error:'+ error.message);
      // Handle login error, e.g., show error message to the user
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;