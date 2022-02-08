import { browserLocalPersistence } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Button, Form, Col, Container, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import firebase from "../utilities/firebase";
import { getLocalStorageUID, LOCAL_STORAGE_UID } from '../utilities/helper'


function Login({setUid}:{setUid: (uid:string)=>void  }): JSX.Element {

    let navigate = useNavigate();

    const [password,setPassword] = useState<string>('');
    const [email,setEmail] = useState<string>('');
    const [messageEmail,setMessageEmail] = useState<string>('');
    const [loginError, setLoginError] = useState<string>('');

    function emailCheck(): boolean {
        const containsAt = email.includes("@");

        if (!containsAt) {
            setMessageEmail("Not a valid email");
            return true;
        }
        return false;
    }


    function handleLoginUser() {

        const inputError = emailCheck();

        if (inputError === true) {
            return;
        }

        firebase.fbauth.signInWithEmailAndPassword(firebase.auth, email, password).then(async data => {

            let uid1 = data.user.uid;
            await setUid(uid1);
            localStorage.setItem(LOCAL_STORAGE_UID, uid1);

        }).catch(function(error) {
            setLoginError("Email and password do not match")
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === "auth/wrong-password") {
                setLoginError("Username/password do not match");
            }
            console.log(errorCode);
            console.log(errorMessage);
        });
        navigate('/');
    }


    return(
        <Container>
            <Row>
                <Col className='center-block'>
                    <div className='cards'> 
                        <Container className='cardGuts'>
                            <Form>
                                <h2 className="text-center">Login</h2>
                                    {<div className="text-danger">{loginError}</div>}
                                <Form.Group>
                                    <label className="mb-1">Email</label>
                                    <Form.Control onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>) => {
                                            setMessageEmail("");
                                            setLoginError("");
                                            setEmail(ev.target.value);
                                        }
                                    } placeholder='Email'></Form.Control>
                                    {<div className="text-danger">{messageEmail}</div>}
                                </Form.Group>

                                <Form.Group  className="mb-3">
                                    <label className="mb-1">Password</label>
                                    <Form.Control type="password" onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>) => {
                                            setMessageEmail("");
                                            setLoginError("");
                                            setPassword(ev.target.value)
                                        }
                                    } placeholder='Password'></Form.Control>
                                </Form.Group>

                                <Form.Group>
                                    <div  className='col text-center'>
                                        <Button className="mb-2" variant='primary' onClick={handleLoginUser}>Sign In</Button>
                                        <br></br>
                                        Don't have an account? Click <Link to="/register">HERE</Link> to sign up!
                                    </div>
                                </Form.Group>

                                </Form>
                            </Container>
                        </div>
                    </Col>
                </Row>
            </Container>
    )
}

export default Login;
