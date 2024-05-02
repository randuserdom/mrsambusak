import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
      const response = await axios.post('http://localhost:8000/login', {
        email: email,
        password: password
      });
      setMessage(response.data.message);

      if(response.status == 200){
        localStorage.setItem('user',response.data.user)
        window.location = "/chat"
      }
  } catch (error) {
    
      setMessage(error.response.data.detail);
  }
  
  };

  return (
    <div className="container mt-5">
  <div className="row justify-content-center">
    <div className="col-sm-8 col-md-6 col-lg-5">
      <div className="border p-3" style={{ borderRadius: 4 }}>
        <h2>Login</h2>
        {message && (
          <div className="alert alert-warning mt-3" role="alert">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
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
          <br />
          <button type="submit" className="btn btn-warning btn-block">Login</button>
        </form>
        <br />
        <div>
          <b>Don't have an account?</b> <Link to={'/register'}>Register</Link>
        </div>
      </div>
    </div>
  </div>
</div>

  
  

  );
};

export default Login;
