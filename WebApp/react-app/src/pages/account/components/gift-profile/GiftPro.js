import { Popover, Image, Button, Modal, Overlay } from "react-bootstrap";
import React, {useState, useEffect, useRef} from "react";
import {Link} from 'react-router-dom';
import "./gift-pro.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {useUser} from "../../../../utils/UserContext";
import {giftsService, eventsService} from "../../../../utils/ServerConnection";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select'
import {useParams} from 'react-router-dom';
import ContributeButton from "../../../../reusable_components/buttons/ContributeButton";


/**
 * This is the Gift Profile component. It is used to display a gift on a user's profile
 * page
 *
 * @param {*} props
 */
function GiftPro(props) {
    // User data
    const {user} = useUser();
    const userData = useParams();
    const overlayTarget = useRef(null);

    const [showOverlay, setShowOverlay] = useState(false);

    const [show, setShow] = useState(false);

    // Open and close states for modals
    const handleShow = () => setShow(true);

    const giftInfo = props.gift;

    const [eventState, setEventState] = useState([]);

    /**
     * UseEffect ran to retrieve the event's in a user's profile. This is used to populate the "add to event" dropdown
     */
    useEffect(() => {
        eventsService.find({
            query: {
                userId: userData.id
            }
        }).then((events) => {
            setEventState(events.data);
        }).catch((err) => {
            console.log(err);
        });
    }, [userData.id]);

    const removeGiftAlert = () => toast("This gift has been removed from your Wish List.");

    const toggleOverlay = () => {
        setShowOverlay(!showOverlay)
    }

    /**
     * Removes gift from database and front end
     */
    const handleGiftDelete = () => {
        giftsService.remove(props.gift.id);
        removeGiftAlert();
        console.log("gift has been removed");
        toggleOverlay();
    }

    /**
     * Modal for adding gifts to an event
     *
     * @returns {JSX.Element}
     * @constructor
     */
    function AddGiftToEventModal(props) {
        // functions to handle opening and closing of modals
        const handleClose = () => props.setShow(false);

        const [selectedEvent, setEvent] = useState([]);


        /**
         * Adds gift stored in the props to an event in the database
         */
        const addToEvent = () => {
            giftsService.patch(props.gift.id, {eventId: selectedEvent.value})
                .then(() => {
                    handleClose()
                    toast("Gift added to event: " + selectedEvent.label);
                })
                .catch((err) => {
                    toast.error("Failed to add gift to event");
                    console.log("did not add gift to event", err);
                });
        }

        /**
         * Method maps the all-events made by the user into a dropdown friendly format
         *
         * @returns Events made by the user
         */
        const mapEvents = () => {
            return eventState.map((event) => {
                return {value: event.id, label: event.name}
            });
        }

        return (
            <Modal show={show} onHide={handleClose} className='h-100'>
                <Modal.Header closeButton>
                    <Modal.Title>Event Selector</Modal.Title>
                </Modal.Header>
                <Modal.Body className="">
                    <div className='d-flex flex-column w-100'>
                        <Select
                            options={mapEvents()}
                            className='w-100'
                            onChange={(e) => {setEvent(e)}}
                            value={selectedEvent.Label}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button id={"submitButton"} onClick={addToEvent}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }


    return (
        <>
            <div className={'gift-pro-container'}>
                <div className={'gift-pro-thumbnail-container'}>
                    <Link to={`/gifts/${props.gift.id}`}>
                        <Image className={'gift-image'} src={props.gift.thumbnail} alt={''}/>
                    </Link>
                </div>
                <div className={"gift-pro-information-container"}>
                    <div className={'gift-pro-header'}>
                        <h3>
                            <Link className={'black-link'} to={`/gifts/${props.gift.id}`}>{giftInfo.name}</Link>
                        </h3>
                        {props.gift.userId === user.id &&
                            <div ref={overlayTarget}>
                                <FontAwesomeIcon className={'delete-gift'} icon={faTrash} onClick={toggleOverlay}/>
                            </div>
                        }
                        <Overlay target={overlayTarget.current} show={showOverlay} placement={'left'} rootClose={true}
                                 onHide={toggleOverlay} transition={false}>
                            {({show: _show, ...props}) => (
                                <Popover {...props} id={`popover-positioned-left`}>
                                    <Popover.Title as="h3">Delete Gift?</Popover.Title>
                                    <Popover.Content>
                                        <Button className="mr-3 btn btn-danger" onClick={toggleOverlay}>No</Button>
                                        <Button className="btn btn-secondary" onClick={handleGiftDelete}>
                                            <Link style={{color: 'inherit', textDecoration: 'none'}}
                                                  to={'/account/'.concat(user.id)}>Yes</Link>
                                        </Button>
                                    </Popover.Content>
                                </Popover>)}
                        </Overlay>
                    </div>
                    <p> Description: {giftInfo.description}</p>
                    <p>Price: ${giftInfo.price}</p>
                    <p>Progress: ${giftInfo.progress} / ${giftInfo.price}</p>
                    <div className={'gift-pro-buttons'}>
                        <ContributeButton gift={props.gift}/>
                        {parseInt(userData.id) === user.id &&
                        <Button name="addGiftToEventButton" value={props.gift.id} onClick={handleShow}>Add To Event</Button>}
                    </div>
                </div>
            </div>
            <AddGiftToEventModal setShow={setShow} gift={giftInfo}/>
        </>
    )
}


export default GiftPro;