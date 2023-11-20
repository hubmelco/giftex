import React, {useEffect, useRef, useState} from 'react';
import {Link, useParams, useHistory} from 'react-router-dom';
import "../../pages/gift/Gifts.css";
import "../../pages/home/Home.css";
import "../../pages/account/components/AccountComp.js";
import {Card, Modal, Button, Container, Popover, Overlay} from 'react-bootstrap';
import {useUser} from "../../utils/UserContext";
import {eventsService, giftsService} from "../../utils/ServerConnection";
import {usersService} from "../../utils/ServerConnection";
import GiftSM from "../gift-related/GiftSM";
import {toast} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import EditEvent from "./EditEvent";

/**
 * @param props {Object} {id, deadline(needs to be implemented), funds (needs to be implemented), receiverId,
 * receiverName, name, thumbnail, price, description, progress, userId}
 * @returns {*}
 * @constructor
 */
function EventSM(props) {
    const {user} = useUser();
    const overlayTarget = useRef(null);
    const history = useHistory();

    // Used to show 'View Gifts' modal
    const [showViewGifts, setShowViewGifts] = useState(false);


    const [showOverlay, setShowOverlay] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [eventInfo, setEventInfo] = useState(props.event);

    const userData = useParams();

    //All the states being used in this component
    const [state, setState] = useState({
        name: '',
        dob: '',
        pic: '',
        bio: '',
        friend: false,
        requested: false,
        priv: false
    });
    const [giftState, setGiftState] = useState([]);

    const handleClose = () => {
        setShowViewGifts(false);
    }

    const handleShow = () => {
        setShowViewGifts(true);
    }

    const toggleOverlay = () => {
        setShowOverlay(!showOverlay);
    }

    /*
    Rendering in gifts
     */
    function giftRender() {
        if (giftState.length === 0) {
            return (<Card.Body className={"giftDiv cardBody"} style={{color: 'grey'}}>
                There are no gifts to show!
            </Card.Body>)
        } else {
            return (<Card.Body id={"giftDiv cardBody d-flex flex-column w-100 align-items-center"}>
                    {giftState.map(function (gift) {
                        return <Container className={'d-flex flex-row mb-3 border'} key={gift.id}>
                            <GiftSM gift={gift} key={gift.id} email={state.email}/>
                        </Container>
                    })}
                </Card.Body>
            )
        }
    }

    const removeEventAlert = () => toast("This event-large has been removed from your event-related.");

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    /**
     * Method removes the event from the database
     */
    const handleEventDelete = () => {
        eventsService.remove(props.event.id);
        removeEventAlert();
        console.log("event has been removed");
        sleep(1000).then(() => {
            history.push(`/account/${user.id}`);
        })
        toggleOverlay();
    }

    /**
     * Re-renders eventSM whenever props.event.id, state.priv, or userData.id is updated
     */
    useEffect(() => {
        const grabGifts = async () => {
            try {
                const gifts = await giftsService.find({query: {eventId: {$eq: props.event.id}}});
                setGiftState(gifts.data);
            } catch (err) {
                console.error(err);
            }
        };

        const grabProfileInfo = async () => {
            try {

                await usersService.get(userData.id).then((resp) => {
                    setState(prevState => (
                        {
                            ...prevState,
                            name: resp.name,
                            bio: resp.bio,
                            dob: resp.bio,
                            pic: resp.pic
                        }))
                })
            } catch (err) {
                console.error(err);
            }
        };
        //Grab profile info
        grabProfileInfo().then(function () {
                if (!state.priv) {
                    grabGifts().catch(err => console.log(err));
                }
            }
        );
    }, [props.event.id, state.priv, userData.id]);

    
    return (
        <div className={'event-large-container'}>
            <Card>
                <Card.Header className={'cardHeader'}>
                    <div className='d-flex flex-row justify-content-center w-100'>
                        <Link className={'black-link d-flex flex-grow-1 justify-content-center'}
                              to={`/event/${props.event.id}`} data-testid='eventSM-Header'>{props.event.name}</Link>
                        {
                            parseInt(userData.id) === user.id &&
                            <div ref={overlayTarget}>
                                <FontAwesomeIcon className={'delete-gift'} icon={faTrash} onClick={toggleOverlay}/>
                            </div>
                        }
                        <Overlay target={overlayTarget} show={showOverlay} placement={'left'} rootClose={true}
                                 onHide={toggleOverlay} transition={false}>
                            {({show: _show, ...props}) => (
                                <Popover {...props} id={`popover-positioned-left`}>
                                    <Popover.Title as="h3">Delete Event?</Popover.Title>
                                    <Popover.Content>
                                        <Button className="mr-3 btn btn-danger" onClick={toggleOverlay}>No</Button>
                                        <Button className="btn btn-secondary" onClick={handleEventDelete}>
                                            <Link style={{color: 'inherit', textDecoration: 'none'}}
                                                  to={'/account/'.concat(user.id)}>Yes</Link>
                                        </Button>
                                    </Popover.Content>
                                </Popover>)}
                        </Overlay>
                    </div>
                </Card.Header>
                <Card.Body className={'event-large-card-body'}>
                    <Card.Text className={'eventSM-privacy'}>
                        <span> {props.event.privacy ? "Private" : "Not Private"}</span>
                    </Card.Text>
                    <Card.Text className={'eventSM-date'}>
                        <span>Date: {props.event.end_date}</span>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Button onClick={handleShow} id={"CardFooterButton"} block>
                        View Gifts
                    </Button>
                </Card.Footer>
            </Card>
            <Modal show={showViewGifts} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><Link className={'black-link'}
                                       to={`/event/${props.event.id}`}>{props.event.name}</Link></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={'modal-body'}>
                        <div className='w-100'>
                            {giftRender()}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <EditEvent event={eventInfo} open={showEditModal} setOpen={setShowEditModal} setEvent={setEventInfo}/>
        </div>
    )
}

export default EventSM;