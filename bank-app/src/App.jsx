import React, { useState } from "react";
import { AppContext } from "./Components/AppContext";
import "./App.css";
import Home from "./Components/Home";


function App() {
  const [authName, setAuthName] = useState("");
  const [authRole, setAuthRole] = useState("");
  const [logged, setLogged] = useState(null);
  const [route, setRoute] = useState("home");

  const appContextValues = {
    authName,
    setAuthName,
    authRole,
    setAuthRole,
    logged,
    setLogged,
    route,
    setRoute,
  };

  return (
    <div className="App">
      <AppContext.Provider value={appContextValues}>
        <Home />
      </AppContext.Provider>
    </div>
  );
}

export default App;