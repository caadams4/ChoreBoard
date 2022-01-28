
import React, { useState } from "react";
import { Container, Col, Row, Button, FormCheck } from 'react-bootstrap';
import { PlusCircleFill } from 'react-bootstrap-icons'
import chore from "../interfaces/chore";
import choreList from "../interfaces/choreList";
import Chore from "./Chore";

function ChoreCard({choreList}:{choreList:choreList}): JSX.Element {

    function addTask() {
        alert("add task");
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
                            {choreList.chores.map(c=>{
                                return (
                                    <Chore chore={c}/>
                                )}
                            )} 
                            <PlusCircleFill width="24" height="24" role="button" onClick={addTask}/>
                            
                        </Container>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ChoreCard;