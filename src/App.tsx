import { Route, Routes } from "react-router-dom";
import './App.css';
import React, { useState,useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import ChoreBoard from './components/ChoreBoard';
import firebase from './utilities/firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import { inMemoryPersistence } from "firebase/auth";
import { getLocalStorageUID } from "./utilities/helper"
import { setuid } from "process";
import { Navbar } from "react-bootstrap";



function App() {

  const [login,setLogin] = useState<boolean>(false);
  const [uid,setUid] = useState<string>(getLocalStorageUID);

  useEffect(()=>{
    firebase.fbauth.onAuthStateChanged(firebase.auth,user=>{
      if (user === null) {
        setLogin(false);
      } else {
        setLogin(true);
      }
    })
  },[setUid]);

  
  if (login === true) {
    return (
      <div className="body">
        <Routes>
          <ChoreBoard uid={uid} setUid={setUid}/>
        </Routes>
      </div>
    )
  } else {
    return (
      <div className="body">

        <Navbar  bg="dark">
            <h1 className="header">ChoreBoard</h1>
        </Navbar> 
        <Routes>
          <Route path="/" element={<Login setUid={setUid}/>} />
          <Route path="/register" element={<Register setUid={setUid}/>} />
        </Routes>
      </div>
    )
  }

}

export default App;


