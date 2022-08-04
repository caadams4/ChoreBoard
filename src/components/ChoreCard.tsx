
import React, { useEffect, useState } from "react";
import firebase from "../utilities/firebase";
import { Container, Col, Row, Button, FormCheck } from 'react-bootstrap';
import chore from "../interfaces/chore";
import choreCard from "../interfaces/choreCard";
import Chore from "./Chore";
import { AddChoreModal } from "./AddChoreModal";
import { isEmpty } from "@firebase/util";

let taskRef = firebase.rtdb.ref(firebase.db, `/users/${firebase.userCreds}/uid/`);



function ChoreCard({choreListTitle,choreList,uid}:{choreListTitle:string,choreList:choreCard,uid:string}): JSX.Element {

    const [addChoreVisible,setAddChoreVisible] = useState<boolean>(false);
    const [deleteMode, setDeleteMode] = useState<boolean>(false);

    function addTask() {
        firebase.rtdb.push(taskRef)
        addChoreVisible ? setAddChoreVisible(false) : setAddChoreVisible(true);
    }

    useEffect(()=>{
        console.log(choreList.author)
    });

    function changeDeleteMode() {
        deleteMode ? setDeleteMode(false) : setDeleteMode(true);
        console.log(deleteMode)
    }
    
    // Clear Tasks, reset. 

    const clearCompleted = () => {
        console.log(choreListTitle);
        let choreRef = firebase.rtdb.ref(firebase.db, `/users/${uid}/choreLists/${choreListTitle}/choresActive/`);

        let newChoreList: chore[] = []; 
        choreList.choresActive.forEach(c=>{
            if (c.taskCompleted === false) {
                const copyChore: chore = {
                    taskName : c.taskName,
                    taskCreated :  c.taskCreated,
                    taskAssigned : c.taskAssigned,
                    taskCompleted : false,
                }
                newChoreList = [...newChoreList,copyChore];
            }
        });

        console.log(newChoreList)
        if (newChoreList.length === 0) {
            const copyChore: chore = {
                taskName : "List some more chores!",
                taskCreated :  Date().valueOf().slice(0,15),
                taskAssigned : "me",
                taskCompleted : false,
            }
            newChoreList = [...newChoreList,copyChore];
        }

        firebase.rtdb.set(choreRef,newChoreList).then(data=>{console.log(data)}).catch(function(error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
    }

    const clearAll = () => {
        let choreRef = firebase.rtdb.ref(firebase.db, `/users/${uid}/choreLists/${choreListTitle}/choresActive/`);

        let newChoreList: chore[] = []; 
        if (newChoreList.length === 0) {
            const copyChore: chore = {
                taskName : "List some more chores!",
                taskCreated :  Date().valueOf().slice(0,15),
                taskAssigned : "me",
                taskCompleted : false,
            }
            newChoreList = [...newChoreList,copyChore];
        }

        firebase.rtdb.set(choreRef,newChoreList).then(data=>{console.log(data)}).catch(function(error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
    }



    if (choreList.choresActive !== undefined) {
        return (
<Container>
            <Row>
                <Col className='center-block'>
                    <div className="text-center"> 
                        <Container className='cardGuts'>
                            <Row>
                                <div>
                                    <Row>
                                        <Col xs={3}>
                                            <Button variant="info" className="controlBtns" onClick={clearCompleted}>Clear Completed</Button>
                                            <Button variant="info" onClick={clearAll}>Clear All</Button>
                                        </Col>
                                        <Col>
                                            <h3>My Chore List</h3>
                                        </Col>
                                        <Col xs={3}>
                                        </Col>
                                    </Row>
                                <hr></hr>
                                </div>
                            </Row>
                            <Row>
                                <Col xs={2}>
                                    <h6>Completed</h6>
                                </Col>
                                <Col>
                                    <h6>Task</h6>
                                </Col>
                                <Col xs={2}>
                                    <h6>Date Created</h6>
                                </Col>
                                <Col xs={2}>
                                    <h6>Assigned To</h6>
                                </Col>
                                <hr></hr>
                            </Row>
                            {choreList.choresActive.map((c)=>{return <Chore choreListTitle={choreListTitle}  uid={uid} chore={c} choreList={choreList} deleteMode={deleteMode} setDeleteMode={setDeleteMode}/>})}
                            <Button onClick={addTask}>ICON</Button>
                            <AddChoreModal choreList={choreList} choreListTitle={choreListTitle} visible={addChoreVisible} setVisible={setAddChoreVisible} uid={uid}></AddChoreModal>
                        </Container>
                    </div>
                </Col>
            </Row>
        </Container>

        )
    } else {
    
    
    
    return (
        <Container>
            <Row>
                <Col className='center-block'>
                    <div className="text-center"> 
                        <Container className='cardGuts'>
                            <Row>
                                <div>
                                    <Row>
                                        <Col xs={3}>
                                            <Button variant="info" className="controlBtns" onClick={clearCompleted}>Clear Completed</Button>
                                            <Button variant="info" onClick={()=>{console.log("Yee")}}>Clear All</Button>
                                        </Col>
                                        <Col>
                                            <h3>{choreList.author}'s Chore List</h3>
                                        </Col>
                                        <Col xs={3}>
                                        </Col>
                                    </Row>
                                <hr></hr>
                                </div>
                            </Row>
                            <Row>
                                <Col xs={2}>
                                    <h6>Completed</h6>
                                </Col>
                                <Col>
                                    <h6>Task</h6>
                                </Col>
                                <Col xs={2}>
                                    <h6>Date Created</h6>
                                </Col>
                                <Col xs={2}>
                                    <h6>Assigned To</h6>
                                </Col>
                                <hr></hr>
                            </Row>

                            <Button onClick={addTask}>ICON</Button>
                            <AddChoreModal choreList={choreList} choreListTitle={choreListTitle} visible={addChoreVisible} setVisible={setAddChoreVisible} uid={uid}></AddChoreModal>
                        </Container>
                    </div>
                </Col>
            </Row>
        </Container>
    )
    }
}

export default ChoreCard;