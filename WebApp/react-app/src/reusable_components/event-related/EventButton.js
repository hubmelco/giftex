import React from 'react';
import './EventButton.css'
import { useUser } from "../../utils/UserContext";
import { Link } from 'react-router-dom';
import {Button} from "react-bootstrap";

/**
 * This is a functional component that allows the user to add an event-large.
 * We use this in header and other pages.
 * @returns {JSX.Element}
 * @constructor
 */
function EventButton(){
    const {user} = useUser();


    /**
     * This is part of the constructor of the event-large button
     */
    if(user){
        //If the user is logged in have a button that allows you to add a button
        return(
            //Sends you to the /AddEvent link of the web page
            <Link to={'/AddEvent'}>
                <Button id={'addAnEventId'}>Add an Event</Button>
            </Link>
        )
    } else {
        return (
            <></>
        )
    }
}

export default EventButton;
