
import React, { useState } from "react";
import { Container, Col, Row, Button, FormCheck } from 'react-bootstrap';
import { PlusCircleFill } from 'react-bootstrap-icons'
import chore from "../interfaces/chore";
import choreList from "../interfaces/choreList";

function Chore({chore}:{chore:chore}): JSX.Element {

    function addTask() {
        alert(chore.taskCompleted);
    }
    if (chore.taskCompleted === true) {
        return (
            <Row>
                <Col>   
                    <FormCheck checked={true}/>
                </Col>
                <Col>
                    <div>{chore.taskName}</div>
                </Col>
                <Col>
                    <div>{chore.taskCreated}</div>
                </Col>
                <Col>
                    <div>{chore.taskAssigned}</div>
                </Col>
            </Row>
        )
    } else {
        return (
            <Row>
                <Col>   
                    <FormCheck/>
                </Col>
                <Col>
                    <div>{chore.taskName}</div>
                </Col>
                <Col>
                    <div>{chore.taskCreated}</div>
                </Col>
                <Col>
                    <div>{chore.taskAssigned}</div>
                </Col>
            </Row>
        )
    }
}

export default Chore