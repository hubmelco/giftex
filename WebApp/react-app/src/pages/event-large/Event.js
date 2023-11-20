import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useUser} from "../../utils/UserContext";
import {eventsService, giftsService, usersService} from "../../utils/ServerConnection";
import {Button, Card, Image} from "react-bootstrap";
import EventGift from "./components/EventGift";
import EditEvent from "../../reusable_components/event-related/EditEvent";
import {faClockRotateLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CarouselComp from '../../reusable_components/misc/CarouselComp';


/**
 * Page for rendering the large event-large page
 * 
 * Comment functionality has been commented out but not removed in hopes that it is revisited and implemented
 * in the future.
 */
function Event() {
    //the event-large ID that is passed in to the URL (props)
    let {id} = useParams();

    const {user} = useUser();

    const [otherUser, setOtherUser] = useState({
        name: '',
        pic: ''
    });

    const [eventState, setEventState] = useState({
        description: '',
        end_date: 0,
        id: 0,
        name: '',
        userId: user.id
    });

    const [giftState, setGiftState] = useState([]);

    const [show, setShow] = useState(false);

    const responsive = {
            largeDesktop: {
                breakpoint: {max: 5000, min: 3000},
                items: 4,
                slidesToSlide: 4 // optional, default to 1.
            },
            desktop: {
                breakpoint: {max: 3000, min: 1200},
                items: 3,
                slidesToSlide: 3 // optional, default to 1.
            },
            tablet: {
                breakpoint: {max: 1200, min: 475},
                items: 1,
                slidesToSlide: 2 // optional, default to 1.
            },
            mobile: {
                breakpoint: {max: 475, min: 0},
                items: 1,
                slidesToSlide: 1 // optional, default to 1.
            }
        };


    /**
     * Renders gift-related attributed to the eventID
     */
    function GiftRender() {
        if (giftState.length === 0) {
            return (<Card.Body className={"giftDiv cardBody"} style={{color: 'grey'}}>
                There are no gifts to show!
            </Card.Body>)
        } else {
            return (
                <Card.Body id={"giftDiv cardBody"}>
                    <CarouselComp map={
                            giftState.map(function (gift) {
                                return (
                                    <EventGift gift={gift} key={gift.id} email={user.email}/>
                                )
                            })
                        } id="gift"/>
                </Card.Body>
            )
        }
    }

    /**
     * Function determines if the user is the owner of the event or not
     * Editing capabilities will be rendered upon ownership
     * 
     */
    const renderEdit = () => {
        if (user.id === otherUser.id){
            return (
                <div>
                    <Button onClick={handleShow} size="lg" block>
                        Update Event
                    </Button>
                    <EditEvent event={eventState} open={show} setOpen={setShow} setEvent={setEventState}> </EditEvent>
                </div>
            )
        }
    }


    /**
     * show the modal for the 'Update Event' modal
     */
    const handleShow = () => setShow(true);

    /**
     * On page load
     */
    useEffect(() => {
        /**
         * Grabs the event-large attributed to the ID of the event-large from the appropriate user
         */
        const grabEvent = () => {
            eventsService.get(id).then((event) => {
                setEventState(event);
            }).catch((err) => {
                console.error("Error grabbing event-large", err);
            })
        };

        /**
         * Grabs the gift-related of an account attributed to this event-large
         */
        const grabGifts = () => {
            giftsService.find({
                query: {
                    eventId: id,
                    userId: eventState.userId
                }
            }).then((gifts) => {
                setGiftState(gifts.data);
            }).catch((err) => {
                console.error("Error grabbing gift-related", err);
            })
        };
        grabEvent();
        grabGifts();
    }, [eventState.userId, id]);

    /**
     * getting the creator info attributed to the event-large
     */
    useEffect(() => {
        usersService.get(eventState.userId)
            .then(otherUser => {
                setOtherUser(otherUser);
            })
    }, [eventState.userId])


    return (
        <div>
            <div className={'content-container'}>
                <div className={'grid-container'}>
                    <h2 className={'gift-title'}>{eventState.name}</h2>
                    <div>
                        <div>
                            <Image src={otherUser.profile_pic} rounded id={'profilePicture'}/>
                        </div>
                        <Link className={'no-dec-link'} to={`/account/${otherUser.id}`}>
                            <div className={'card-email-container'}>
                                {otherUser.name}
                            </div>
                        </Link>
                    </div>
                    <Card className={'desc-card'}>
                        <Card.Header>
                            Description
                        </Card.Header>
                        <Card.Body>
                            <div>
                                {eventState.description}
                            </div>
                        </Card.Body>
                        <Card.Footer>
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <FontAwesomeIcon icon={faClockRotateLeft} className={'pr-1'} title={"Last Updated"}/>
                                    {new Date(eventState.updatedAt).toLocaleDateString()}
                                </div>
                                <div>
                                    Held on: {new Date(eventState.end_date).toLocaleDateString('en-US', {timeZone: 'UTC'})}
                                </div>
                            </div>
                        </Card.Footer>
                    </Card>
                    {renderEdit()}
                </div>
                <Card className={"mt-3 card"}>
                    <Card.Header className={"cardHeader"}>
                        Gifts
                    </Card.Header>
                    <GiftRender/>
                </Card>
            </div>
        </div>
    )

}

export default Event;
