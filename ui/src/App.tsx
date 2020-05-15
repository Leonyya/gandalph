import React, {useContext} from 'react';
import './App.sass';
import Admin from './Components/admin'
import Login from './Components/login'
import iconlib from './vendor/iconlib'

iconlib.init()
function App() {
  return (
      <Admin/>
  );
}

export default App;
