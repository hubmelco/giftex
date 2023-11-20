import React, {useEffect, useState} from 'react';
import "../../pages/gift/Gifts.css";
import {Button,Form, FormControl, InputGroup, Modal, Col} from 'react-bootstrap';
import {giftsService} from '../../utils/ServerConnection'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


/**
 * Modal that is displayed whenever a gift is selected to be edited.
 *
 * @param {*} props Gift Information
 * 
 */
function EditGift(props) {

    //info of given gift
    const giftInfo = props.gift;

    // used for editing modal
    const handleClose = () => props.setOpen(false);

    const [giftUpdate, setUpdate] = useState({});


    // Will be changed to a string if there is an error
    const [errors, setErrors] = useState({
        nameError: null,
        descriptionError: null,
        priceError: null,
        linkError: null,
        thumbnailError: null,
    });

    /**
     * Handles any new information filled in the modal
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
     * Handles changing the price of a gift
     * 
     */
    const handlePriceChange = (e) => {
        setUpdate(prevState => ({...prevState, price: Math.round(e.target.value)}));
        setErrors(prevState => ({...prevState, priceError: ''}));
    };


    /**
     * Method sends a patch request to update any values entered by user
     * 
     */
    const updateGift = (e) => {
        e.preventDefault();
        giftsService.patch(giftInfo.id,
            {
                name: giftUpdate.name,
                description: giftUpdate.description,
                price: giftUpdate.price,
                deadline: giftUpdate.deadline
            })
        .then(() => {
            console.log("Gift updated successfully");
            toast("Gift updated!");
        }).catch(()=>{
            console.log("Error updating gift")
            toast.error("Failed to update gift!");
        });

        // Update the parent gift component
        props.setGift(giftUpdate);

        // Set modal visibility
        props.setOpen(false);

    }

    // Make sure the most recent gift info is pulled in when the modal is opened
    useEffect(() => {
        setUpdate(props.gift);
    }, [props.open, props.gift])



    return (
        <div>
        <Modal className='modal fade bd-example-modal-lg' size='lg' show={props.open} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Update Gift
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={'modal-body'}>
                        <Form className={'gift-form'}>
                            <Form.Group className={'form-group'}>
                                <Form.Label>Name</Form.Label>
                                <Form.Control className={errors.nameError ? 'is-invalid' : ''}
                                                  as="textarea" rows={1}
                                                  placeholder={giftInfo.name}
                                                  value={giftUpdate.name}
                                                  onChange={handleChange}
                                                  name={'name'}/>
                                <div className={errors.nameError ? 'form-error-message' : 'hidden'}>{errors.nameError}</div>
                            </Form.Group>

                            <Form.Group className={'form-group'}>
                                <Form.Label>Description</Form.Label>
                                <Form.Control className={errors.descriptionError ? 'is-invalid' : ''}
                                                  as="textarea" rows={3}
                                                  placeholder={giftInfo.description}
                                                  value={giftUpdate.description}
                                                  name={'description'}
                                                  onChange={handleChange}/>
                                <div className={errors.descriptionError ? 'form-error-message' : 'hidden'}>{errors.descriptionError}</div>
                            </Form.Group>

                            <Form.Row>
                                <Form.Group as={Col} className={'form-group'}>
                                    <Form.Label>Price</Form.Label>
                                        <InputGroup className={'price-input'}>
                                            <InputGroup.Text>$</InputGroup.Text>
                                            <FormControl className={errors.priceError ? 'is-invalid' : ''}
                                                         placeholder={giftInfo.price}
                                                         type='number'
                                                         onChange={handlePriceChange}
                                                         name={'price'}/>
                                        </InputGroup>
                                        <div
                                            className={errors.priceError ? 'form-error-message' : 'hidden'}>{errors.priceError}</div>
                                </Form.Group>

                                <Form.Group as={Col} className={'form-group'}>
                                        <Form.Label>Deadline</Form.Label>
                                        <Form.Control placeholder={giftInfo.deadline}
                                                      value={giftUpdate.deadline}
                                                      name={'deadline'}
                                                      type={'date'}
                                                      onChange={handleChange}/>
                                </Form.Group>
                            </Form.Row>

                            <Form.Group className={'form-group'}>
                                    <Form.Label>Url</Form.Label>
                                    <Form.Control className={errors.linkError ? 'is-invalid' : ''}
                                                  placeholder="Enter the Url for your gift"
                                                  name={'link'}
                                                  onChange={handleChange}/>
                                    <div
                                        className={errors.linkError ? 'form-error-message' : 'hidden'}>{errors.linkError}</div>
                            </Form.Group>

                            <Form.Group className={'form-group'}>
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control className={errors.thumbnailError ? 'is-invalid' : ''}
                                                  placeholder="Enter the Url to an image of your gift"
                                                  name={'thumbnail'}
                                                  onChange={handleChange}/>
                                    <div
                                        className={errors.thumbnailError ? 'form-error-message' : 'hidden'}>{errors.thumbnailError}</div>
                            </Form.Group>
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button id={"closeButton"} className='btn-danger' onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button id={"submitButton"} onClick={updateGift}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
            </div>

    )

}

export default EditGift;