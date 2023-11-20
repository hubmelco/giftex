import React from 'react';
import {Link} from 'react-router-dom';
import "../../pages/gift/Gifts.css";
import "../../pages/home/Home.css";
import {Card, ProgressBar} from 'react-bootstrap';
import ContributeButton from '../buttons/ContributeButton';


/**
 * This is the gift small component. It is rendered on the homepage to display the user's
 * gifts in a carousel
 *
 * @param props {Object} {id, deadline(needs to be implemented), funds (needs to be implemented), receiverId,
 * receiverName, name, thumbnail, price, description, progress, userId}
 * 
 */
function GiftSM(props) {

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
                    <Card.Title className={'giftSM-title'} data-testid='giftSM-Header' id='giftSM-Header'><Link className={'black-link'} to={`/gifts/${props.gift.id}`}>{props.gift.name}</Link></Card.Title>
                    <div className={'giftSM-desc'}>
                        <span className={'gift-sm-funds'}>${props.gift.progress}</span><br/>
                        <span className={'gift-sm-price'}>of ${props.gift.price} funded</span>
                        <ProgressBar striped={'true'} animated={'true'} className={'gift-sm-progressbar'} now={(props.gift.progress / props.gift.price) * 100}/>
                        <br/>
                    </div>
                </Card.Body>
                <Card.Footer>
                    <ContributeButton gift={props.gift} />
                </Card.Footer>
            </Card>
        </div>
    )
}

export default GiftSM
