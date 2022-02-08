
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import choreCard from "../interfaces/choreCard";
import chore from "../interfaces/chore";
import firebase from "../utilities/firebase";
import { hrtime } from "process";

export function AddChoreModal({uid, choreList, choreListTitle, visible, setVisible}: {uid: string,choreList: choreCard, choreListTitle: string, visible: boolean, setVisible: (b: boolean) => void}): JSX.Element {

    const [choreName, setChoreName] = useState<string>('');
    const [choreAssigned, setChoreAssigned] = useState<string>('');
    const [errorChore, setErrorChore] = useState<string>('');
    const [errorAssigned, setErrorAssigned]  = useState<string>('');

    const buildJSON = (key:string,value:string): JSON => {
        const toString = `{"`+key+`":`+ value+`}`;
        const userChoreData = (JSON.parse(toString));
        return userChoreData;
    }

    const errorCheck = () =>{
        let error = false;
        if (choreName === "") {
            setErrorChore("Enter a chore to add to your list!")
            error = true;
        } if (choreAssigned === "") {
            setErrorAssigned("Assign your chore to someone!");
            error = true;
        }
        return error;
    }

    const save = () => {
        const err = errorCheck();
        if (err === true) {
            return;
        }

        const timeStr = Date().valueOf().slice(0,15);
        const newChore = {
            taskName: choreName,
            taskCreated: timeStr,
            taskAssigned: choreAssigned,
            taskCompleted: false,
        }

        let newList: chore[] = choreList.choresActive.map((c: any)=>c);
        newList = [...newList, newChore];
    

        
        console.log(uid)
        let choreRef = firebase.rtdb.ref(firebase.db, `/users/${uid}/choreLists/${choreList.title}/choresActive/`);

        firebase.rtdb.set(choreRef, newList).then(data=>{console.log(data)}).catch(function(error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        });
        
        hide();
    }

    /*
    function push2DB(newList: chore[]) {

        let newNewList: JSON[] = [];
        let cookingStart = `{"choreListTitle":`;
        newList.forEach(chore=>{
            let newJSON = buildJSON(chore.taskName,JSON.stringify(chore));
            cookingStart = cookingStart + JSON.stringify(newJSON) + `,`;
            //newNewList = [...newNewList,newJSON];
        })
        cookingStart = cookingStart + `}`;
        console.log(cookingStart);

        //const userData = buildJSON(choreListTitle,JSON.stringify(newNewList));
        let cookedJSON = JSON.parse(cookingStart);

        console.log(choreListTitle)
        console.log(cookedJSON);        

        // 1.  build a json of each list item new-JSON-List
        // 2.  update .../choresActive : { new-JSON-List }

        //const toJSON = `{"`+choreList.title+`":`+ JSON.stringify(initialChoreCard)+`}`;
        //const choreData = (JSON.parse(toJSON));
        

    }
    
    */


    const hide = () => {   
        setVisible(false);
        setErrorAssigned("");
        setErrorChore("");
    };
    
    return (
        <Modal show={visible} onHide={hide}>
            <Modal.Header>
                <Modal.Title>Add Chore</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label data-testid = "ClassYear">Chore</Form.Label>
                                {<div className="text-danger">{errorChore}</div>}
                        <Form.Control as="textarea" rows={1} aria-label="sem-class-year"
                            value={choreName} onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>) => setChoreName(ev.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label data-testid = "Season">Assigned To</Form.Label>
                                {<div className="text-danger">{errorAssigned}</div>}
                        <Form.Control as="textarea" rows={1} aria-label="sem-season"
                            value={choreAssigned} onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>) => setChoreAssigned(ev.target.value)}> </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={save}>Add Chore</Button>
                <Button variant="secondary" onClick={hide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
