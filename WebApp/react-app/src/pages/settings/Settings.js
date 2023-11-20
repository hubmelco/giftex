import {Row, Card, Container, InputGroup, FormControl} from "react-bootstrap";
import React, {useState} from 'react'
import {InPlaceEditorComponent} from '@syncfusion/ej2-react-inplace-editor';
import '../../../node_modules/@syncfusion/ej2-react-inplace-editor/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-inputs/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-base/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-richtexteditor/styles/material.css';
import './Settings.css'
import {useUser} from "../../utils/UserContext";
import {usersService} from '../../utils/ServerConnection'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


/**
 * This makes up the settings page.
 * as of: 04/05/22
 */
function Settings() {

    const {user} = useUser();

    const [state, setState] = useState({
        name: user.name,
        private: user.private,
        password: "",
        confirmPassword: "",
        email: user.email,
        pic: user.pic
    });

    // hook for setting privacy
    const [checked, setCheck] = useState(state.priv !== 0);

    /**
     * Updates state associated with target
     * @param e target of action
     * @param compName field being edited
     */
    const handleChange = (e, compName) => {
        setState(prevState => ({
            ...prevState,
            [compName]: e.data.value
        }));
    }

    /**
     * Handles changing name. Updates database and sets the authenticated user
     * @returns {Promise<void>} If successful, will set the authenticated user and update database
     */
    const handleName = () => {
        usersService.patch(user.id, {name: state.name})
            .then(() => {
                toast("Name has been updated to " + state.name)
            }).catch((err) => {
            console.log("Error changing name", err);
            toast.error("Failed to update name!");
        });
    }

    /**
     * Handles changing email
     */
    const handleEmail = () => {
        usersService.patch(user.id, {email: state.email})
            .then(() => {
                toast("Email has been updated to " + state.email)
            }).catch((err) => {
            console.log("Error changing email", err);
            toast.error("Failed to update email!");
        });
    }

    /**
     * Handles changing passwords
     * only changes the password if the confirmed password is the same
     */
    const handlePassword = () => {
        if (state.password === state.confirmPassword) {
            usersService.patch(user.id, {password: state.password})
                .then(() => {
                    toast("Password has been updated!")
                }).catch((err) => {
                console.log("Error changing password", err)
                toast("Failed to update password");
            });
        } else {
            console.log("Passwords do not match");
            toast.error("Passwords do not match!");
        }
    }

    /**
     * Changes the private status of the account, if successful, will set authenticated user to private and update database
     */
    const handlePrivate = () => {
        usersService.patch(user.id, {private: state.priv})
            .then(() => {
                toast("Privacy has been set to: " + (state.priv === 1 ? "Private" : "Not Private"));
            }).catch((err) => {
            console.log("Error changing private", err)
        });
    }

    /**
     * Handles changing the profile picture
     */
    const onImageChange = (event) => {
        if (event.target.files.length === 1) {
            let reader = new FileReader();
            reader.onload = (e) => {
                setState(prevState => ({
                    ...prevState,
                    pic: e.target.result
                }));
                usersService.patch(user.id, {profile_pic: e.target.result})
                    .then(() => {
                        toast("Profile picture has been updated!");
                    }).catch((err) => {
                    console.log("Error changing pic", err);
                    toast.error("Error changing picture");
                });
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    return (
        <div className={'textFont'}>
            <Container className={'mt-3 w-75'}>
                <Card>
                    <Card.Header className={'text-center cardHeader'}>
                        <h3>Settings</h3>
                    </Card.Header>
                    <Card.Body>
                        <Row className={'p-4'}>
                            <InputGroup.Text>Full Name: </InputGroup.Text>
                            <td className="sample-td ml-2">
                                <InPlaceEditorComponent
                                    id='name'
                                    model={{placeholder: 'Enter full name'}}
                                    mode='Inline'
                                    type='Text'
                                    value={state.name}
                                    saveButton={{content: 'Save', cssClass: 'e-outline'}}
                                    cancelButton={{content: 'Cancel', cssClass: 'e-outline'}}
                                    actionBegin={(e) => handleChange(e, 'name')}
                                    submitClick={handleName}
                                />
                            </td>
                        </Row>
                        <Row className={'p-4'}>
                            <InputGroup.Text>Email Address: </InputGroup.Text>
                            <td className="sample-td ml-2">
                                <InPlaceEditorComponent
                                    id='email'
                                    model={{placeholder: 'Enter email address'}}
                                    mode='Inline'
                                    type='Text'
                                    value={state.email}
                                    saveButton={{content: 'Save', cssClass: 'e-outline'}}
                                    cancelButton={{content: 'Cancel', cssClass: 'e-outline'}}
                                    actionBegin={(e) => handleChange(e, 'email')}
                                    submitClick={handleEmail}
                                />
                            </td>
                        </Row>
                        <Row className={'p-4'}>
                            <div className="d-flex flex-row w-50">
                                <InputGroup.Text>Password: </InputGroup.Text>
                                <td className="sample-td ml-2">
                                    <InPlaceEditorComponent
                                        id='pass'
                                        model={{placeholder: 'Enter password'}}
                                        mode='Inline'
                                        type='Text'
                                        value={state.password}
                                        saveButton={{content: 'Save', cssClass: 'e-outline'}}
                                        cancelButton={{content: 'Cancel', cssClass: 'e-outline'}}
                                        actionBegin={(e) => handleChange(e, 'password')}
                                    />
                                </td>
                            </div>
                            <div className="d-flex flex-row w-50">
                                <InputGroup.Text>Confirm Password: </InputGroup.Text>
                                <td className="sample-td ml-2">
                                    <InPlaceEditorComponent
                                        id='pass'
                                        model={{placeholder: 'Enter password'}}
                                        mode='Inline'
                                        type='Text'
                                        value={state.confirmPassword}
                                        saveButton={{content: 'Save', cssClass: 'e-outline'}}
                                        cancelButton={{content: 'Cancel', cssClass: 'e-outline'}}
                                        actionBegin={(e) => handleChange(e, 'confirmPassword')}
                                        submitClick={handlePassword}
                                    />
                                </td>
                            </div>
                        </Row>
                        <Row className={"p-4"}>
                            <InputGroup.Text>Profile Picture: </InputGroup.Text>
                            <input type="file" onChange={onImageChange} className="filetype fileSelector ml-4"
                                   id="group_image" accept="image/png, image/jpeg"/>
                            <img src={state.pic} alt={"profile pic"}/>
                        </Row>
                        <Row className={'p-4'}>
                            <InputGroup className="d-flex flex-row w-50">
                                <InputGroup.Text>Private Account</InputGroup.Text>
                                <FormControl
                                    id='check' type={'checkbox'}
                                    placeholder={state.private}
                                    name={'private'}
                                    value={state.value} checked={checked}
                                    onChange={() => {
                                        if (checked) {
                                            setCheck(false);
                                            state.private = 0
                                            handlePrivate()
                                        } else {
                                            setCheck(true)
                                            state.private = 1
                                            handlePrivate()
                                        }
                                    }}/>
                            </InputGroup>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}

export default Settings