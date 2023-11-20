import React from "react";
import Card from "react-bootstrap/Card";
import "./FriendsSnippet.css"
import {Link} from "react-router-dom";

/**
 * This is the profile picture and name displayed for each friend on the
 * account page
 * 
 */
function FriendSnippet(props) {
    return (
        <Link to={'/account/' + props.data.id}>
            <Card style={{alignItems: 'center', margin: 0, height: '100px', marginRight: '10px'}}
                  className={'border-0'}>
                <Card.Title className={'friends-name-link'}>{props.data.name}</Card.Title>
                <Card.Img style={{
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    border: '1px solid lightgray',
                    // background: 'rgba(143, 186, 243, .2)',
                    flexGrow: '1'
                }} className='friendPic' src={props.data.profile_pic}/>
            </Card>
        </Link>
    )
}

export default FriendSnippet;
