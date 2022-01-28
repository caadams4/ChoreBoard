
import React from "react";
import firebase from "../utilities/firebase";
import { Button } from 'react-bootstrap';

function ChoreBoard(): JSX.Element {

    function handleSignout() {
        firebase.fbauth.signOut(firebase.auth);
    }


    return (
        <div>
            <h1>Hi, there!</h1>
            <Button onClick={handleSignout}>Sign Out</Button>
        </div>
    )
}

export default ChoreBoard;