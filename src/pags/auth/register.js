import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [email,setEmail] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(confirmPassword != password){
      return false
    }
    try {
      const response = await axios.post('http://localhost:8000/register', {
        username: username,
        password: password,
        email:email
      });
     
      setMessage(response.data.message);
    } catch (error) {
    
      setMessage(error.response.data.detail);
    }
  };

  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-sm-8 col-md-6 col-lg-5 border" style={{borderRadius:3}}>
        <h2 className="mb-4">User Registration</h2>
  
        {message && (
          <div className="alert alert-warning mt-4" role="alert">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {password !== confirmPassword && confirmPassword.length > 0 && (
          <div className="text-danger">Passwords do not match</div>
        )}

          <br />
          <button type="submit" className="btn btn-warning btn-block">Register</button>
        </form>
        <br />
        <Link to={'/login'}>Already have an account? Login</Link>
        <br />
        <br />

      </div>
    </div>
  </div>
  
  
  );
};

export default Register;
