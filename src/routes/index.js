import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import Register from "../pages/auth/register";
import Require from "../middlewares/require";
import Login from "../pages/auth/login";
import Chat from "../pages/main/chat";
import { useWebSocket } from "../hooks/useWebSocket";

export default function Routes() {
  const ws = useWebSocket();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      ws.onopen = (event) => {
        ws.send("");
      };
    }
  }, [ws]);

  return (
    <Router>
      <Switch>
        <Route
          path="/register"
          element={
            <Require destination={"chat"}>
              <Register />
            </Require>
          }
        />

        <Route
          path="/login"
          element={
            <Require destination={"chat"}>
              <Login />
            </Require>
          }
        />

        <Route
          path="/chat"
          element={
            <Require destination={"login"}>
              <Chat ws={ws} />
            </Require>
          }
        />
      </Switch>
    </Router>
  );
}
