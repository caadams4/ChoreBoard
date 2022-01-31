
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import choreList from "../interfaces/choreList";
import chore from "../interfaces/chore";

export function AddChoreModal({choreList, visible, setVisible}: {choreList: choreList, visible: boolean, setVisible: (b: boolean) => void}): JSX.Element {

    const [choreName, setChoreName] = useState<string>('');
    const [choreAssigned, setChoreAssigned] = useState<string>('');
    const [errorChore, setErrorChore] = useState<string>('');
    const [errorAssigned, setErrorAssigned]  = useState<string>('');

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

        const time = new Date().getTime();
        const timeStr = time.toString();
        const newChore: chore = {
            taskName: choreName,
            taskCreated: timeStr,
            taskAssigned: choreAssigned,
            taskCompleted: false,
        }

        let newList: chore[] = choreList.chores.map(c=>c);
        newList = [...newList, newChore]
        console.log(newList);
        //send to DB
    }

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
                <Button variant="primary" onClick={save}>Edit</Button>
                <Button variant="secondary" onClick={hide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
