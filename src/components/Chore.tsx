
import React, { useState } from "react";
import { Container, Col, Row, Button, FormCheck } from 'react-bootstrap';
import { PlusCircleFill } from 'react-bootstrap-icons'
import chore from "../interfaces/chore";

function Chore({chore}:{chore:chore}): JSX.Element {

    const [taskCompleted,setTaskCompleted] = useState<boolean>(chore.taskCompleted);

    function handleCheckBox() {
        taskCompleted ? setTaskCompleted(false) : setTaskCompleted(true);
    }

    function addTask() {
        alert(chore.taskCompleted);
    }

        return (
            <Row>
                <Col>   
                    <FormCheck checked={taskCompleted} onChange={handleCheckBox}/>
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

export default Chore