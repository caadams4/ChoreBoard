import { Route, Routes } from "react-router-dom";
import './App.css';
import React, { useState,useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import ChoreBoard from './components/ChoreBoard';
import firebase from './utilities/firebase';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [login,setLogin] = useState(true);

  useEffect(()=>{
    firebase.fbauth.onAuthStateChanged(firebase.auth,user=>{
      if (user === null) {
        setLogin(false);
      } else {
        setLogin(true);
      }
    })
  });

  

    if (login === true) {

      return (
          <div className="body">
            <Routes>
              <Route path="/" element={<ChoreBoard/>}/>
            </Routes>
          </div>
      )
    } else {
      return (
        <div className="body">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      )
    }
}

export default App;


