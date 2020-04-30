import React, {useContext} from 'react';
import './App.sass';
import Admin from './Components/admin'
import { LoginContext } from './Components/login/LoginProvider'
import Login from './Components/login'
function App() {
  return (
    <LoginContext.Consumer>
      { ({authenticated}) => {
        if(authenticated) return (
          <Admin/>
        ) 
        else return (
          <Login/>
        )
      } }
    </LoginContext.Consumer>
  );
}

export default App;
