import React, { useContext, useState } from "react";
import axios from 'axios';
import { AppContext } from "./AppContext";

function Nav() {
  const { route, setRoute } = useContext(AppContext);
  const [authName, setAuthName] = useState("");
  const [authRole, setAuthRole] = useState("");
  const [logged, setLogged] = useState(null);

  function logOut() {
    axios.post('http://localhost:3003/logout', {}, { withCredentials: true })
    .then(res => {
        setLogged(false);
        setAuthName(false);
        setRoute('home');
    });
  }

  return (
    <nav className="navbar">
      <div className="container-fluid">
        <div className="nav-top">
          <ul className="nav-left">
            <li className="nav-item">
              <span
                onClick={() => setRoute("home")}
                className={"nav-link" + (route === "home" ? " active" : "")}
              >
                HOME
              </span>
            </li>
            {[""].includes(authRole) ? (
              <li className="nav-item">
                <span
                  onClick={() => setRoute("accountlist")}
                  className={"nav-link" + (route === "accountlist" ? " active" : "")}
                >
                  Paskyros
                </span>
              </li>
            ) : null}
          </ul>
          <ul className="nav-right">
            {authName ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">
                    <b>{authName}</b>
                  </span>
                </li>
                <li className="nav-item">
                  <span className="nav-link" onClick={logOut}>
                    Logout
                  </span>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <span
                  onClick={() => setRoute("login")}
                  className={"nav-link" + (route === "login" ? " active" : "")}
                >
                  Login
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;