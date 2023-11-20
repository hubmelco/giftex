import React from 'react';
import { useUser } from "../../utils/UserContext";
import { Link } from 'react-router-dom';
import {Button} from "react-bootstrap";

/**
 * This is a functional component that allows the user to add a gift.
 * We use this in header and other pages.
 * @returns {JSX.Element}
 * @constructor
 */
function GiftButton(){
    const {user} = useUser();

    /**
     * This is part of the constructor of the gift button
     */
    if(user){
        //If the user is logged in have a button that allows you to add a button
        return(
            //Sends you to the /AddGift link of the web page
                <Link to={'/AddGift'}>
                  <Button id={'addAGiftId'}>Add a Gift</Button>
                </Link>
        )
    } else {
        //If the user is not logged in have a button that will send them to the
        // sign up page to allow them to get started.
        return (
            <Link to={'/signup'}>
                <Button id={'getStartedId'}>Get Started</Button>
            </Link>
        )
    }

}

export default GiftButton;
