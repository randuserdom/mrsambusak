import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { useCallback } from "react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { message, login } = useLogin();
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      await login();
    },
    [login]
  );

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
              <button type="submit" className="btn btn-warning btn-block">
                Login
              </button>
            </form>
            <br />
            <div>
              <b>Don't have an account?</b>{" "}
              <Link to={"/register"}>Register</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
