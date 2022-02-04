
import React, { useState } from "react";
import firebase from "../utilities/firebase";
import { Container, Col, Row, Button, FormCheck } from 'react-bootstrap';
import { PlusCircleFill } from 'react-bootstrap-icons'
import chore from "../interfaces/chore";
import choreCard from "../interfaces/choreCard";
import Chore from "./Chore";
import { AddChoreModal } from "./AddChoreModal";

let taskRef = firebase.rtdb.ref(firebase.db, `/users/${firebase.userCreds}/uid/`);



function ChoreCard({choreList}:{choreList:choreCard}): JSX.Element {

    const [addChoreVisible,setAddChoreVisible] = useState<boolean>(false);

    function addTask() {
        firebase.rtdb.push(taskRef)
        addChoreVisible ? setAddChoreVisible(false) : setAddChoreVisible(true);
    }


    



    return (
        <Container>
            <Row>
                <Col className='center-block'>
                    <div className="text-center"> 
                        <Container className='cardGuts'>
                            <Row>
                                <h3>{choreList.author}'s Chore List</h3>
                            </Row>
                            <Row>
                                <Col>
                                    <h6>Completed</h6>
                                </Col>
                                <Col>
                                    <h6>Task</h6>
                                </Col>
                                <Col>
                                    <h6>Date Created</h6>
                                </Col>
                                <Col>
                                    <h6>Assigned To</h6>
                                </Col>
                                <hr></hr>
                            </Row>
                            {choreList.choresActive.map(c=>{
                                return (
                                    <Chore chore={c} />
                                )}
                            )} 
                            <PlusCircleFill width="24" height="24" role="button" onClick={addTask}/>
                            <AddChoreModal choreList={choreList} choreListTitle={choreList.title} visible={addChoreVisible} setVisible={setAddChoreVisible}></AddChoreModal>
                        </Container>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ChoreCard;