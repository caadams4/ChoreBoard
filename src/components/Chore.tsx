
import React, { useState, useEffect } from "react";
import { Container, Col, Row, Button, FormCheck } from 'react-bootstrap';
import { PlusCircleFill } from 'react-bootstrap-icons'
import chore from "../interfaces/chore";
import choreCard from "../interfaces/choreCard";
import firebase from "../utilities/firebase";
import ChoreCard from "./ChoreCard";

function Chore({chore, choreList, uid}:{chore:chore, choreList: choreCard, uid: string}): JSX.Element {

    const [taskCompleted,setTaskCompleted] = useState<boolean>(chore.taskCompleted);

    function handleCheckBox() {
        taskCompleted ? setTaskCompleted(false) : setTaskCompleted(true);
    }

    const save = () => {
        console.log(uid);
        let choreRef = firebase.rtdb.ref(firebase.db, `/users/${uid}/choreLists/${choreList.title}/choresActive/`);

        const newChoreList = choreList.choresActive.map(c=>{
            if (c.taskName === chore.taskName) {
                taskCompleted ? c.taskCompleted = true : c.taskCompleted = false;
            }
            return c;
        })

        //firebase.rtdb.update(choreRef,{choresActive : newChoreList}).then(data=>{console.log(data)}).catch(function(error) {
        //    const errorCode = error.code;
        //    const errorMessage = error.message;
        //    console.log(errorCode);
        //    console.log(errorMessage);
        //});
        

    }
    
    useEffect(() => {
        save();
      }, [taskCompleted,setTaskCompleted] );



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