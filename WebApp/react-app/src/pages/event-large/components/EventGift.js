import React from 'react';
import {Link} from 'react-router-dom';
import "../../gift/Gifts.css";
import "../../home/Home.css";
import {Card, Button, ProgressBar} from 'react-bootstrap';
import {giftsService} from "../../../utils/ServerConnection";
import {toast} from "react-toastify";
import ContributeButton from "../../../reusable_components/buttons/ContributeButton";


// TODO Remove this component, add functionality to giftsm through props

/**
 * This is the Gift component used to be displayed in all-events.
 *
 * @param props {Object} {id, deadline(needs to be implemented), funds (needs to be implemented), receiverId,
 * receiverName, name, thumbnail, price, description, progress, userId}
 */
function EventGift(props) {

    const removeGiftAlert = () => toast("This gift has been removed from event");

    /**
     * Adds gift stored in the props to an event in the database
     */
    const removeFromEvent = () => {
        giftsService.patch(props.gift.id, {eventId: 0}).catch((err) => {
            console.log("did not remove gift from event");
            console.log(err);
        }).then(removeGiftAlert());
    }


    return (
        <div className={'gift-container'}>
            <Card>
                <Link to={{
                    pathname: `/gifts/${props.gift.id}`
                }}>
                    <div className={'gift-thumbnail-container'}>
                        <Card.Img className={'gift-thumbnail'} variant={'top'} src={props.gift.thumbnail}/>
                    </div>
                </Link>
                <Card.Body className={'gift-card-body'}>
                    <Card.Title className={'giftSM-title'}><Link className={'black-link'} to={`/gifts/${props.gift.id}`}>{props.gift.name}</Link></Card.Title>
                    <div className={'giftSM-desc'}>
                        <span className={'gift-sm-funds'}>${props.gift.progress}</span><br/>
                        <span className={'gift-sm-price'}>of ${props.gift.price} funded</span>
                        <ProgressBar striped={'true'} animated={'true'} className={'gift-sm-progressbar'} now={(props.gift.progress / props.gift.price) * 100}/><br/>
                    </div>
                </Card.Body>
                <Card.Footer>
                    <ContributeButton gift={props.gift} />
                    <Button onClick={removeFromEvent} id={"CardFooterButton"} block>
                        Remove from Event
                    </Button>
                </Card.Footer>
            </Card>
        </div>
    )
}

export default EventGift;
