import React, {useState} from 'react';
import "./SignUpForm.css";
import GoogleButton from "./components/GoogleButton"

import {Button, Form, Container, Col, Card, ListGroup} from 'react-bootstrap';

import { usersService } from '../../utils/ServerConnection'
import {Link} from "react-router-dom";

/**
 * Renders the sign-up page
 * 
 */
function SignUpForm() {
    const [termsChecked, setTermCheck] = useState(false);
    const [privChecked, setPrivCheck] = useState(false);

    const handleTermCheck = () => {
        state.errors.terms = !termsChecked ? "" : "Please confirm terms and conditions have been read";
        setTermCheck(!termsChecked);
    };
    const handlePrivCheck = () => {
        setPrivCheck(!privChecked);
    };

    const [state, setState] = useState({
        name: "",
        email: "",
        guardianEmail: "",
        dob: "",
        password: "",
        confirmPassword: "",
        isGuardianDisabled: true,
        errors: []
    });

    /**
     * Handles when various parts of the signup form are modified and sets error states for alerts
     * @param e Source of change
     */
    const handleChange = (e) => {
        const {name, value} = e.target
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
        switch (e.target.name){
            case "confirmPassword":
                state.errors.confirmPassword = state.password === e.target.value ? "" : "Passwords do not match";
                break;
            case "password":
                state.errors.confirmPassword = state.confirmPassword === e.target.value ? "" : "Passwords do not match";
                break;
            case "dob":
                if(!e.target.value.match(/\d{4}-\d{1,2}-\d{1,2}/) && e.target.value.split("-")[0] < new Date().getFullYear()){
                    state.errors.dob = "Invalid date of birth";
                } else{
                    let today = new Date();
                    let birthDate = new Date(e.target.value);
                    let age = today.getFullYear() - birthDate.getFullYear();
                    let m = today.getMonth() - birthDate.getMonth();
                    if (m < 0 || (m === 0 && today.getDate() <= birthDate.getDate())) {
                        age--;
                    }
                    if( age < 13){
                        state.errors.dob = "Must be at least 13 years old to sign up";
                    }else if (age > 130){
                        state.errors.dob = "Must not be over 130 years old to sign up";
                    }else if (age < 18) {
                        state.isGuardianDisabled = false;
                        state.errors.dob = "";
                    }else{
                        state.isGuardianDisabled = true;
                        state.errors.dob = "";
                        state.errors.guardianEmail = "";
                        state.guardianEmail = "";

                    }
                }
                break;
            case "email":
                state.errors.email = e.target.value
                    .match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) ? "" : "Please enter valid email";
                break;
            case "guardianEmail":
                state.errors.guardianEmail = e.target.value
                    .match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) ? "" : "Please enter valid email";
                break;
            default:
                //terms validation is handled in separate function
        }
    }

    /**
     * Handles creating an account
     * Function will call the server extension /signup with user data kept in useState
     * @param e
     */
    const handleSubmitClick = async (e) => {
        e.preventDefault();
        if (validForm()) {
            let privateAccount = 0;
            if (privChecked) {
                privateAccount = 1;
            }
            const payload = {
                name: state.name,
                email: state.email,
                password: state.password,
                dob: state.dob,
                private: privateAccount
            }
            //THIS IS NEW SERVER CODE
            try {
                await usersService.create(payload);
                window.location.href = '/login';
            } catch (err) {
                console.log(payload);
                console.log(err);
            }
            console.log('Submitted!');

            //THIS IS OLD SERVER CODE (dont delete for the front end peeps using the old server)
            // axios.post(process.env.REACT_APP_HOSTNAME + '/signup', payload)
            //     .then(function (response) {
            //         console.log(response);
            //         window.location.href = 'http://localhost:3000/login'
            //
            //     }).catch(function (err) {
            //     console.log(err);
            // });
        }
    }

    const validForm = () => {

        return state.errors.confirmPassword === ""
            && state.errors.terms === ""
            && state.errors.dob === ""
            && state.errors.email === ""
            && state.errors.guardianEmail === ""
            && state.name !== ""
            && ((!state.isGuardianDisabled && state.guardianEmail !== "") || state.isGuardianDisabled)
    }

    return (
        <div className={'textFont'}>
            <Container className={"my-3 d-flex justify-content-center"} id={"signupContainer"}>
                <Card className={"w-50"}>
                    <Card.Header className={'text-center cardHeader'}><h3>Sign Up For Free</h3></Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group controlId={"formBasicName"} size={'sm'}>
                                <p>* indicates a required field</p>
                                <Form.Label>Name*</Form.Label>
                                <Form.Control type={'name'} placeholder={'First and Last name'} name={'name'}
                                              value={state.value}
                                              onChange={handleChange} required/>
                            </Form.Group>
                            <Form.Group controlId={"formBasicEmail"}>
                                <Form.Label>Email Address*</Form.Label>
                                <Form.Control type={'email'} placeholder={'Email address'} name={'email'}
                                              value={state.value}
                                              onChange={handleChange} required/>
                            </Form.Group>
                            <span className={"errors"}>{state.errors["email"]}</span>

                            <Form.Group controlId={"formBasicDOB"}>
                                <Form.Label>Date of Birth*</Form.Label>
                                <Form.Control type={'date'} placeholder={'yyyy-dd-mm'} name={'dob'}
                                              value={state.value}
                                              onChange={handleChange} required/>
                            </Form.Group>
                            <span className={"errors"}>{state.errors["dob"]}</span>
                            <Form.Group controlId={"formGuardianEmail"}>
                                <Form.Label>Guardian Email Address (if under 18 years old)</Form.Label>
                                <Form.Control type={'email'} placeholder={'Guardian email address'} name={'guardianEmail'}
                                              onChange={handleChange} required disabled={state.isGuardianDisabled}/>
                            </Form.Group>
                            <span className={"errors"}>{state.errors["guardianEmail"]}</span>
                            <Form.Row>
                                <Col>
                                    <Form.Group controlId={"formBasicPassword"}>
                                        <Form.Label>Password*</Form.Label>
                                        <Form.Control type={'password'} placeholder={'Password'} name={'password'}
                                                      value={state.value} onChange={handleChange} required/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId={"formBasicConfirmPassword"}>
                                        <Form.Label>Confirm Password*</Form.Label>
                                        <Form.Control type={'password'} placeholder={'Confirm Password'}
                                                      name={'confirmPassword'}
                                                      value={state.value} onChange={handleChange} required/>
                                    </Form.Group>
                                    <span className={"errors"}>{state.errors["confirmPassword"]}</span>
                                </Col>
                            </Form.Row>
                            <Form.Group controlId={"formBasicPrivCheck"}>
                                <span className={"formatLine"}>
                                <Form.Check type={'checkbox'} label={"Private Account"} onChange={handlePrivCheck}/>
                                <i id="privateinfo" title={"A private account ensures that only your friends are able to access your account and gift-related."} className="fas fa-info-circle"/>
                                    </span>
                            </Form.Group>
                            <span className={"errors"}>{state.errors["terms"]}</span>
                            <Form.Group controlId={"formBasicTermCheck"}>
                                <span className={"formatLine"}><Form.Check type={'checkbox'} onChange={handleTermCheck}/><a href={'/terms'}>Terms And Conditions*</a> </span>
                            </Form.Group>
                            <Button variant='primary' type={'submit'} disabled={!validForm()} onClick={handleSubmitClick}>Sign up</Button>
                            <p className={'mt-3'}> Already a member? <Link to={"/login"}>Log in</Link></p>
                        </Form>
                    </Card.Body>
                    <ListGroup variant="flush" className={'py-3'}>
                        <ListGroup.Item className={'d-flex justify-content-center'}>
                            <GoogleButton/>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Container>
        </div>
    )

}

export default SignUpForm;
