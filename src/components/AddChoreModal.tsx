
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import choreList from "../interfaces/choreList";
import chore from "../interfaces/chore";

export function AddChoreModal({choreList, visible, setVisible}: {choreList: choreList, visible: boolean, setVisible: (b: boolean) => void}): JSX.Element {

    const [choreName, setChoreName] = useState<string>('');
    const [choreDate, setChoreDate]  = useState<string>('');
    const [choreAssigned, setChoreAssigned] = useState<string>('');
    const [choreCompleted, setChoreCompleted] = useState<boolean>(false);




    /*
export interface chore {
        taskName: string,
        taskCreated: string,
        taskAssigned: string,
        taskCompleted: boolean,
}
    */

    const save = () => {
        //send to DB

    }

    const hide = () => {   
        setVisible(false);
    };
    
    return (
        <Modal show={visible} onHide={hide}>
            <Modal.Header>
                <Modal.Title>Add Chore</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label data-testid = "ClassYear">Class Year</Form.Label>
                        <Form.Control as="textarea" rows={1} aria-label="sem-class-year"
                            value={choreName} onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>) => setChoreName(ev.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label data-testid = "Season">Season Semester</Form.Label>
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
