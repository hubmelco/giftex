import React, {useState} from 'react';
import {Button, Col, Form, Tab, Tabs} from "react-bootstrap";
import {useUser} from "../../utils/UserContext";
import "../create-gift/AddGift.css";
import "../gift/Gifts.css";
import {eventsService} from '../../utils/ServerConnection'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useHistory} from "react-router-dom";

/**
 * Page that allows the user to add an event to their account
 * 
 */
function AddEvent() {
    const {user} = useUser();
    const history = useHistory();

    const [addEvent, setAddEvent] = useState({
        name: '',
        description: '',
        privacy: 0,
        end_date: '',
        userId: user.id
    });

    //TODO: edit errors because they are not needed in this current state
    // except for name character limit, description character limit and unfinished date
    const [errors, setErrors] = useState({
        nameError: '',
        descriptionError: '',
        priceError: '',
        linkError: '',
        thumbnailError: '',
        emailError: ''
    });

    // Error handlers for form
    const hasNameError = () => {
        return errors.nameError !== '';
    };

    const hasDescriptionError = () => {
        return errors.descriptionError !== '';
    };

    const handlePrivateChecked = () => {
        setAddEvent(prevState => ({...prevState, privacy: addEvent.privacy ? 0 : 1}));
    };

    const addEventAlert = () => toast("Your event has been added!");

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }


    /**
     * Handles addEvent button being pressed. Checks for empty entries and adds the event-large to the database
     * @param e source of button press
     * @returns {Promise<void>} If successful, prints to console, adds to database, and creates toastify alert
     */
    const handleAddEvent = async (e) => {
        e.preventDefault();

        //The following check if the user left an input box empty
        if (addEvent.name === ''){
            setErrors(prevState => ({...prevState, nameError: 'Value cannot be empty'}))
        } else if (addEvent.description === ''){
            setErrors(prevState => ({...prevState, descriptionError: 'Value cannot be empty'}))
        // } else if (addEvent.end_date === 'mm/dd/yy'){
        //     setErrors(prevState => ({...prevState, nameError: 'Value cannot be empty'}))
        } else {
            try {
                const createdEvent = await eventsService.create(addEvent);
                addEventAlert();
                console.log("Your event has been created!")
                sleep(1000).then(() => {
                    history.push(`/event/${createdEvent.id}`);
                })
                // const createdEvent = await eventsService.create({
                //     ...addEvent, name: });
                //TODO: Gotta add an event-large page and the gift-related listed with calls to server
                // const giftData = await giftsService.create({
                //     ...addGift, receiverId: receiverData.data[0].id,
                //     receiverName: receiverData.data[0].name
                // });
            } catch (err) {
                console.log(err);
            }
        }
    };

    // Form handler
    const handleChange = (e) => {
        const {name, value} = e.target;
        setAddEvent(prevState => ({
            ...prevState,
            [name]: value
        }));
        setErrors(prevState => ({
            ...prevState,
            [name + 'Error']: ''
        }));
    };

    return(
        <div>
            <div className={'content-container padding-container'}>
                <h1>Add an Event</h1>
                <Tabs fill className={'tabs'} defaultActiveKey="manual">
                    <Tab eventKey="manual" title="Manual">
                        <div className={'add-gift-form-container grey-background'}>
                            <Form className={'gift-form'}>
                                <Form.Group className={'form-group'}>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control className={hasNameError() ? 'is-invalid' : ''}
                                                  placeholder="Enter a name for your event"
                                                  onChange={handleChange}
                                                  name={'name'}/>
                                    <div className={hasNameError() ? 'form-error-message' : 'hidden'}>{errors.nameError}</div>
                                </Form.Group>

                                <Form.Group className={'form-group'}>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control className={hasDescriptionError() ? 'is-invalid' : ''}
                                                  placeholder={'Enter a description for your event-large'}
                                                  as="textarea" rows={3}
                                                  name={'description'}
                                                  onChange={handleChange}/>
                                    <div className={hasDescriptionError() ? 'form-error-message' : 'hidden'}>{errors.descriptionError}</div>

                                </Form.Group>

                                <Form.Row>
                                    <Form.Group as={Col} className={'form-group'}>
                                        <Form.Label>Date</Form.Label>
                                        <Form.Control placeholder="Enter the date of your event"
                                                      name={'end_date'}
                                                      type={'date'}
                                                      onChange={handleChange}/>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Check onClick={handlePrivateChecked}
                                                type={'checkbox'}
                                                label={'Private'} />
                                </Form.Group>

                                <Button id={"addEventSubmission"} onClick={handleAddEvent}>Add Event</Button>
                            </Form>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </div>
    )

}

export default AddEvent;
