
import React, { useEffect, useState } from "react";
import firebase from "../utilities/firebase";
import { Container, Col, Row, Button, FormCheck } from 'react-bootstrap';
import { PlusCircleFill, X } from 'react-bootstrap-icons'
import chore from "../interfaces/chore";
import choreCard from "../interfaces/choreCard";
import Chore from "./Chore";
import { AddChoreModal } from "./AddChoreModal";

let taskRef = firebase.rtdb.ref(firebase.db, `/users/${firebase.userCreds}/uid/`);



function ChoreCard({choreList,uid}:{choreList:choreCard,uid:string}): JSX.Element {

    const [addChoreVisible,setAddChoreVisible] = useState<boolean>(false);
    const [deleteMode, setDeleteMode] = useState<boolean>(false);

    function addTask() {
        firebase.rtdb.push(taskRef)
        addChoreVisible ? setAddChoreVisible(false) : setAddChoreVisible(true);
    }

    useEffect(()=>{
        console.log(choreList)
    });

    function changeDeleteMode() {
        deleteMode ? setDeleteMode(false) : setDeleteMode(true);
        console.log(deleteMode)
    }
    
    // Clear Tasks, reset. 

    const clearCompleted= () => {
        console.log(uid);
        let choreRef = firebase.rtdb.ref(firebase.db, `/users/${uid}/choreLists/${choreList.title}/choresActive/`);

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

        firebase.rtdb.set(choreRef,newChoreList).then(data=>{console.log(data)}).catch(function(error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
    }


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
                                            <Button className="controlBtns" onClick={clearCompleted}>Clear Completed</Button>
                                            <Button onClick={()=>{console.log("Yee")}}>Clear All</Button>
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
                            {choreList.choresActive.map(c=>{
                                if (deleteMode === true) {
                                    return ( 
                                        <div><X/><Chore uid={uid} chore={c} choreList={choreList} deleteMode={deleteMode} setDeleteMode={setDeleteMode}/></div>
                                    )
                                } else {
                                return (
                                        <Chore uid={uid} chore={c} choreList={choreList} deleteMode={deleteMode} setDeleteMode={setDeleteMode}/>
                                )}
                            })} 
                            
                            <PlusCircleFill width="24" height="24" role="button" onClick={addTask}/>
                            <AddChoreModal choreList={choreList} choreListTitle={choreList.title} visible={addChoreVisible} setVisible={setAddChoreVisible} uid={uid}></AddChoreModal>
                        </Container>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ChoreCard;