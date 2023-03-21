import React, { useState } from 'react';

export const AuthContext = React.createContext({
  isLogged: false,
  name: '',
  route: '',
  setLogged: () => {},
  setAuthName: () => {},
  setRoute: () => {},
});

export const AuthProvider = (props) => {
  const [isLogged, setLogged] = useState(false);
  const [name, setAuthName] = useState('');
  const [route, setRoute] = useState('');

  return (
    <AuthContext.Provider
      value={{ isLogged, name, route, setLogged, setAuthName, setRoute }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}; 