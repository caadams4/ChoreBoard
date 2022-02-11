
import React, { useEffect, useState } from "react";
import ChoreCard from "./ChoreCard";
import firebase from "../utilities/firebase";
import { Button, Container, Col, Row, Navbar, Offcanvas } from 'react-bootstrap';
import { PersonBadge } from 'react-bootstrap-icons'
import '../App.css'
import chore from "../interfaces/chore";
import choreCard from "../interfaces/choreCard";


const choresSample: chore[] = [
    {
        taskName : "Make more tasks!",
        taskCreated : "1/28/2022",
        taskAssigned : "Me",
        taskCompleted : true,
    },
    {
        taskName : "burp",
        taskCreated : "burp",
        taskAssigned : "burp",
        taskCompleted : false,
    }
]

const choreListSample: choreCard[] = [
    {
        title: "General Chores",
        author: "Charles",
        editors: "Charles",
        viewers: "Charles",
        choresActive: choresSample,
        choresCompleted: [],
    }
]

function ChoreBoard({uid,setUid}:{uid:string,setUid: (uid:string)=>void  }): JSX.Element {
    const [taskList,setTaskList] = useState<string[]>(['']);
    const [optionsVisible,setOptionsVisible] = useState<boolean>(false);
    const [myChores,setMyChores] = useState<chore[]>([])
    const [choreLists,setChoreLists] = useState<choreCard[]>([]);
    const [choreListTitle,setChoreListTitle] = useState<string>("GeneralChores")

    const getChoreLists = async () => {
        let listRef = firebase.rtdb.ref(firebase.db, `/users/${uid}/choreLists/`);
        await firebase.rtdb.onValue(listRef,ss=>{
            let choreListDB: choreCard[]= [ss.val()["GeneralChores"]];
            console.log("Chore list should be: ")
            console.log(choreListDB)
            setChoreLists(choreListDB);
        })
    }

    useEffect(() => {
        getChoreLists();
      },[uid]);

    function handleSignout() {
        
        firebase.fbauth.signOut(firebase.auth).then(()=>setUid(""));
    }

    const handleClose = () => setOptionsVisible(false);
    const handleShow = () => setOptionsVisible(true);

    return (
        <div>

            <Navbar  bg="dark">
                <div className="btnLeft"><Button variant="outline-info" onClick={handleSignout}>Sign Out</Button></div>
                <h1 className="header">ChoreBoard</h1>
                <div className="btnRight"><Button variant="outline-info"  onClick={handleShow}><PersonBadge width="32" height="32"/></Button></div>
            </Navbar> 

            {choreLists.map(c=>{
                return(
                    <ChoreCard key={choreListTitle} choreListTitle={choreListTitle} choreList={c} uid={uid}/>
                )}
            )}

            <Offcanvas placement='end' show={optionsVisible} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>myProfile</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Button onClick={()=>{console.log(uid)}}>click me</Button>
                </Offcanvas.Body>
            </Offcanvas>

        </div>
    )
}

export default ChoreBoard;