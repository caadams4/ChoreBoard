
import React, { useState } from "react";
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
        title: "yee",
        author: "Charles",
        editors: "Charles",
        viewers: "Charles",
        choresActive: choresSample,
        choresCompleted: [],
    }
]

function ChoreBoard(): JSX.Element {

    const [taskList,setTaskList] = useState<string[]>(['']);
    const [optionsVisible,setOptionsVisible] = useState<boolean>(false);
    const [myChores,setMyChores] = useState<chore[]>([])
    const [choreLists,setChoreLists] = useState<choreCard[]>(choreListSample);

    function handleSignout() {
        firebase.fbauth.signOut(firebase.auth);
    }

    const handleClose = () => setOptionsVisible(false);
    const handleShow = () => setOptionsVisible(true);

    return (
        <div>

            <Navbar bg="dark" variant="dark">
                <div className="btnLeft"><Button onClick={handleSignout}>Sign Out</Button></div>
                <h1 className="header">ChoreBoard</h1>
                <div className="btnRight"><Button onClick={handleShow}><PersonBadge width="32" height="32"/></Button></div>
            </Navbar>

            {choreLists.map(c=>{
                return(
                    <ChoreCard choreList={c} />
                )}
            )}

            <Offcanvas placement='end' show={optionsVisible} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>myProfile</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    Change profile options here!
                </Offcanvas.Body>
            </Offcanvas>

        </div>
    )
}

export default ChoreBoard;