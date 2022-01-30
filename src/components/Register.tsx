import React, { useState } from "react";
import '../App.css';
import {Form,Button, Container, Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import firebase from "../utilities/firebase";
import chore from '../interfaces/chore';
import choreList from "../interfaces/choreList";


function Register(): JSX.Element {
    
    let navigate = useNavigate();
    
    const [username,setUsername] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [email,setEmail] = useState<string>('');
    const [rePassword,setRePassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [usernameError, setUsernameError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [rePasswordError,setRePasswordError] = useState<string>('');
    const [registerError,setRegisterError] = useState<string>('');

    function resetErrors() {
        setEmailError("");
        setPasswordError("");
        setUsernameError("");
        setRePasswordError("");
    }

    function passwordCheck(): boolean {

        if (password !== rePassword && password.length > 5) {
            setRePasswordError("Passwords do not match!");
            setPasswordError("Passwords do not match!");
            return true;
        }

        if (password.length < 6) {
            setPasswordError('Password must contain 6 characters');
            return true;
        }
        return false;
    }

    function emailCheck(): boolean {
        const containsAt = email.includes("@");

        if (!containsAt) {
            setEmailError("Not a valid email");
            return true;
        }
        return false;
    }

    function usernameCheck(): boolean {
        if (username.length === 0) {
            // TODO add username checking. requires db
            setUsernameError("Enter a username");
            return true;
        }
        return false;
    }

    function errorCheck(): boolean {

        const pass = passwordCheck();
        const eml = emailCheck();
        const usrn = usernameCheck();

        if (pass === true || eml === true || usrn === true) {
            return true;
        } else {
            return false;
        }

    }

    function handleRegisterUser() {

        const inputError = errorCheck();

        if (inputError === true) {
            return;
        }

        console.log("creating " + username + "'s account!")

        firebase.fbauth.createUserWithEmailAndPassword(firebase.auth,email, password).then(data => {

            let uid = data.user.uid;

            firebase.userCreds = uid;

            let userRef = firebase.rtdb.ref(firebase.db, `/users/${uid}/`);

            const initialChore: chore = {
                    taskName : "Make more tasks!",
                    taskCreated : new Date().getTime().toString(),
                    taskAssigned : username,
                    taskCompleted : false,
                }
            
            const userTemplate = { 
                uid : {
                    username: username,
                    email: email,
                    choreList: [initialChore],
                    friendList: [],
                } 
            }

            firebase.rtdb.set(userRef, userTemplate).then(data=>{console.log(data)}).catch(function(error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });

            navigate('/');
        }).catch(function(error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === "auth/email-already-in-use") {
                setRegisterError("Email already in use");
            }
            console.log(errorCode);
            console.log(errorMessage);
        });

        /* --> ** Can be used to push user data to rtdb with above function **

        .then(data=>{

            

            const initailTask = {
                taskName: "My first task!",
                taskDescription: "Make some more tasks",
                taskCreated: new Date().getTime(),
                taskCompleted: "No",
            }


    

            */

            //navigate('/');            
        }
        
    
    return(
        <Container>
            <Row>
                <Col className='center-block'>
                    <div className='cards'>
                        <Container className='cardGuts'>
                        <Form>
                            <h2 className="text-center">Create Account</h2>
                                {<div className="text-danger">{registerError}</div>}
                            <Form.Group>
                                <label className="mb-1">Email</label>
                                <Form.Control onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>) => {
                                    setEmail(ev.target.value)
                                    resetErrors();
                                }
                                    } placeholder='Email'></Form.Control>
                                {<div className="text-danger">{emailError}</div>}
                            </Form.Group>

                            <Form.Group>
                                <label className="mb-1">Username</label>
                                <Form.Control onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>) => {
                                    setUsername(ev.target.value)
                                    resetErrors();
                                }
                                    } placeholder='Username'></Form.Control>
                                {<div className="text-danger">{usernameError}</div>}
                            </Form.Group>

                            <Form.Group>
                                <label className="mb-1">Password</label>
                                <Form.Control type="password" onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>) => {
                                    setPassword(ev.target.value)
                                    resetErrors();
                                }
                                    } placeholder='Password'></Form.Control>
                                    {<div className="text-danger">{passwordError}</div>}

                            </Form.Group>

                            <Form.Group className="mb-3">
                                <label className="mb-1">Verify Password</label>
                                <Form.Control type="password" onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>) => {
                                    setRePassword(ev.target.value)
                                    resetErrors();
                                }
                                    } placeholder='Retype-Password'></Form.Control>
                                {<div className="text-danger">{rePasswordError}</div>}
                            </Form.Group>
                            
                            <Form.Group>
                                <div  className='col text-center'>
                                    <Button className="mb-2" variant='primary' onClick={handleRegisterUser}>Create Account</Button>
                                    <br></br>
                                    Already have an account? Click <Link to="/">HERE</Link> to login!
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


export default Register;

