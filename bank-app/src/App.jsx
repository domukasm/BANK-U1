import GlobalProvider from './Components/Global';
import Nav from './Components/Nav';
import Routes from './Components/Routes';
import "./App.css";



function App() {
  return (
    <GlobalProvider>
      <Nav />
      <Routes />
    </GlobalProvider>
  );
}

export default App;