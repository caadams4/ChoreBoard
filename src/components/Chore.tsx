
import React, { useState, useEffect } from "react";
import { Container, Col, Row, Button, FormCheck } from 'react-bootstrap';
import chore from "../interfaces/chore";
import choreCard from "../interfaces/choreCard";
import firebase from "../utilities/firebase";
import ChoreCard from "./ChoreCard";

function Chore({choreListTitle,chore, choreList, uid, deleteMode, setDeleteMode}:{choreListTitle:string,chore:chore, choreList: choreCard, uid: string, deleteMode: boolean, setDeleteMode:(d:boolean)=>void}): JSX.Element {

    const [taskCompleted,setTaskCompleted] = useState<boolean>(chore.taskCompleted);


    function handleCheckBox() {
        taskCompleted ? setTaskCompleted(false) : setTaskCompleted(true);
    }

    const save = () => {
        console.log(uid);
        let choreRef = firebase.rtdb.ref(firebase.db, `/users/${uid}/choreLists/${choreListTitle}/`);

        console.log(choreListTitle)

        const newChoreList = choreList.choresActive.map(c=>{
            if (c.taskName === chore.taskName) {
                taskCompleted ? c.taskCompleted = true : c.taskCompleted = false;
            }
            return c;
        })

        firebase.rtdb.update(choreRef,{choresActive : newChoreList}).then(data=>{console.log(data)}).catch(function(error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
    }
    
    useEffect(() => {
        save();
    }, [taskCompleted,setTaskCompleted] );

    useEffect(()=>{
        console.log(deleteMode);
    },[deleteMode])



        return (
                
            <Row>
                <Col xs={2}>  
                    <FormCheck  className="checkbox" checked={taskCompleted} onChange={handleCheckBox}/>
                </Col>
                <Col>
                    <div>{chore.taskName}</div>
                </Col>
                <Col xs={2}>
                    <div>{chore.taskCreated}</div>
                </Col>
                <Col xs={2}>
                    <div>{chore.taskAssigned}</div>
                </Col>
            </Row>
        )
}

export default Chore