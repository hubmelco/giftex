import React, {useState, useEffect} from 'react';
import "../../pages/gift/Gifts.css";
import {Button,Form, Modal, Col} from 'react-bootstrap';
import {eventsService} from '../../utils/ServerConnection'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * The form component that pops up when you click "Update Event" where you can update
 * any aspect of the given event if you are the creator.
 * @param props
 */
function EditEvent(props) {

    //info of the given event
    const eventInfo = props.event;

    // used for editing modal
    const handleClose = () => props.setOpen(false);

    const [eventUpdate, setUpdate] = useState({});

    // Will be changed to a string if there is an error
    //TODO: edit errors because they are not needed in this current state
    // except for name character limit, description character limit and unfinished date
    const [errors, setErrors] = useState({
        nameError: null,
        descriptionError: null,
        privateCheckedError: null
    });

    /**
     * Method will store and update values entered by user
     * 
     */
    const handleChange = (e) => {
        const {name, value} = e.target;
        setUpdate(prevState => ({
            ...prevState,
            [name]: value,
            updatedAt: new Date().toISOString()
        }));
        setErrors(prevState => ({
            ...prevState,
            [name + 'Error']: ''
        }));
    };


    /**
     * Method to send a patch request updating the event
     * 
     */
    const updateEvent = (e) => {
        e.preventDefault();
        // update event-large info
        eventsService.patch(eventInfo.id,
            {
                name: eventUpdate.name,
                description: eventUpdate.description,
                end_date: eventUpdate.end_date,
            })
            .then(() => {
                console.log("Event updated successfully");
                toast("Event updated!");

            }).catch(()=>{
                console.log("Error updating event")
                toast.error("Failed to update event!");
            });


        // Update the parent event-large component
        props.setEvent(eventUpdate);

        // Set modal visibility
        props.setOpen(false);

    }

    useEffect(() => {
        setUpdate(props.event);
    }, [props.event, props.open])


    return (
        <div>
        <Modal className='modal fade bd-example-modal-lg' size='lg' show={props.open} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Update Event
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={'modal-body'}>
                    <Form className={'gift-form'}>
                        <Form.Group className={'form-group'}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control className={errors.nameError ? 'is-invalid' : ''}
                                          as="textarea" rows={1}
                                          placeholder={eventInfo.name}
                                          value={eventUpdate.name}
                                          onChange={handleChange}
                                          name={'name'}/>
                            <div className={errors.nameError ? 'form-error-message' : 'hidden'}>{errors.nameError}</div>
                        </Form.Group>

                        <Form.Group className={'form-group'}>
                            <Form.Label>Description</Form.Label>
                            <Form.Control className={errors.descriptionError ? 'is-invalid' : ''}
                                          as="textarea" rows={3}
                                          placeholder={eventInfo.description}
                                          value={eventUpdate.description}
                                          name={'description'}
                                          onChange={handleChange}>
                            </Form.Control>
                            <div className={errors.descriptionError ? 'form-error-message' : 'hidden'}>{errors.descriptionError}</div>

                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col} className={'form-group'}>
                                <Form.Label>Date</Form.Label>
                                <Form.Control 
                                              placeholder={eventInfo.end_date}
                                              value={eventUpdate.end_date}
                                              name={'end_date'}
                                              type={'date'}
                                              onChange={handleChange}>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button id={"closeButton"} className='btn-danger' onClick={handleClose}>
                    Cancel
                </Button>
                <Button id={"submitButton"} onClick={updateEvent}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
        </div>
    )

}

export default EditEvent;