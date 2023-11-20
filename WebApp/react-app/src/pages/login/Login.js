import React, {useState} from 'react';
import {Button, Form, Container, Card} from 'react-bootstrap';
import {app} from '../../utils/ServerConnection'
import {Link} from "react-router-dom";

/**
 * Renders the login page
 */
function Login() {

    const [state, setState] = useState({
        email: "",
        password: "",
    });

    /**
     * handles every change to the state
     */
    const handleChange = (e) => {
        const {name, value} = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    /**
     * Logs in a user, after success it will direct to the home page again.
     */
    const handleSubmitClick = async (e) => {
        e.preventDefault();
        const payload = {
            strategy: 'local',
            email: state.email,
            password: state.password,
        };

        const error = document.getElementById('error');

        try {
            await app.authenticate(payload);
            error.innerHtml = '';
            window.location.href = '/';
        } catch (err) {
            console.log("Incorrect email or password", err);
            error.innerHTML = "<div role='alert' class='fade alert alert-danger show'> Incorrect email or password! </div>"
        }
    };

    return (
        <div className={'textFont'}>
            <Container className={'my-3 d-flex justify-content-center'}>
                <Card className={"w-50"}>
                    <Card.Header className={'text-center cardHeader'}><h3>Log in</h3></Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group controlId={"formBasicEmail"}>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type={'email'} placeholder={'Enter email'} name={'email'}
                                              value={state.value}
                                              onChange={handleChange} required/>
                            </Form.Group>
                            <Form.Group controlId={"formBasicPassword"}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type={'password'} placeholder={'Enter password'} name={'password'}
                                              value={state.value} onChange={handleChange}
                                              onKeyPress={event => {
                                                if (event.key === "Enter") {
                                                  handleSubmitClick(event)
                                                }
                                              }}
                                              required/>
                            </Form.Group>
                        </Form>
                        <div id='error'/>
                        <Button variant='primary' type={'submit'} onClick={handleSubmitClick}>Log in</Button>
                        <div style={{display:'flex', justifyContent:'left', alignItems:'center', gap:'1ch'}}>
                            <p className={'mt-3'}> Not a member? </p>
                            <Link to={"/signup"}>Sign up</Link>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>

    )
}

export default Login;
