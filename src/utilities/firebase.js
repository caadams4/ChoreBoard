import { initializeApp } from "firebase/app";
import * as rtdb from"firebase/database";
import * as fbauth from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyARuhvpm_f9fq-Us3c9zjg8rrJ5agQtask",
  authDomain: "react-todo-92ccb.firebaseapp.com",
  databaseURL: "https://react-todo-92ccb-default-rtdb.firebaseio.com",
  projectId: "react-todo-92ccb",
  storageBucket: "react-todo-92ccb.appspot.com",
  messagingSenderId: "534581566918",
  appId: "1:534581566918:web:6b33eddf037334f32a66c7",
  measurementId: "G-JQ6JG7R7FQ"
};
  
// Initiaalize Firebase
const fbApp = initializeApp(firebaseConfig);
let auth = fbauth.getAuth(fbApp);
let db = rtdb.getDatabase(fbApp);
let userCreds = auth.currentUser?.uid;


const firebase = { rtdb , fbauth , auth , db , userCreds };
export default firebase;

