import { useContext } from "react";
import { Global } from "./Global";

function Nav() {
  const { route, setRoute, authName, logOut } = useContext(Global);

  return (
    <nav className="navbar">
      <div className="container-fluid">
        <div className="nav-top">
          <ul className="nav-left">
            <span
              onClick={() => setRoute("home")}
              className={"nav-link" + (route === "home" ? " active" : "")}
            >
              HOME
            </span>
            {/* <li className="nav-item">
              <span
                onClick={() => setRoute("accountlist")}
                className={"nav-link" + (route === "accountlist" ? " active" : "")}
              >
                Paskyros
              </span>
            </li> */}
          </ul>
          <ul className="nav-right">
            {authName ? (
              <>
                <span className="nav-link">
                  <b>{authName}</b>
                </span>

                <span className="nav-link" onClick={logOut}>
                  Logout
                </span>
              </>
            ) : (
              <span
                onClick={() => setRoute("login")}
                className={"nav-link" + (route === "login" ? " active" : "")}
              >
                Login
              </span>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
