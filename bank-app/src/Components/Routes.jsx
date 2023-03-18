import { useContext } from "react";
import Auth from "./Auth";
import { Global } from "./Global";
import Home from "./Home";
import Login from "./Login";
import AccountList from "./AccountList";

function Routes() {

    const {route} = useContext(Global);


    switch(route) {
        case 'home': return <Auth roles={''}><Home /></Auth>
        case 'accountlist': return <Auth roles={''}><AccountList/></Auth> 

        case 'login': return <Login />
        default: return null
    }



}

export default Routes;