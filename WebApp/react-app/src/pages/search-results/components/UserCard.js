import React, {useState, useEffect} from 'react';
import "../../../App.css";
import {Col, Container, Row} from 'react-bootstrap';
import {usersService} from '../../../utils/ServerConnection';
import "../SearchResults.css"
import {Link} from 'react-router-dom';
import FriendButton from "../../../reusable_components/buttons/FriendButton";

/**
 * Component that is used for the search results page and returns a card of the users in the results
 */
function UserCard(props) {
    const userId = props.userID;
    const {outgoing, incoming} = props.userRelations;
    const [otherUser, setOtherUser] = useState({});
    const [state, setState] = useState({
        name: '',
        pic: '',
        friend: false,
        requested: false
    });

    // get info for the state
    useEffect(() => {
        usersService.get(userId).then((resp) => {
            setState(prevState => (
                {
                    ...prevState,
                    name: resp.name,
                    pic: resp.profile_pic
                }))
            setOtherUser(resp);
        }).catch((err)=>{console.log("Issue getting user info!", err)});

    }, [userId, state.friend, state.requested])

    // useEffect(() => {
    //     console.log("otherUser Updated")
    // },[otherUser]);

    return (
        <div className={'d-flex justify-content-center m-2 p-2 align-items-center'} id="userCard">
            <Container className={'d-flex justify-content-center align-items-center h-100 w-100'}>
                <Row className={"d-flex justify-content-center align-items-center w-100 h-100"}>
                    <Col className={'d-flex'}>
                        <img src={state.pic} alt="Profile Pic" id={'profilePicture'}/>
                    </Col>
                    <Col className={'d-flex flex-column align-items-center'} xs={5} id={"bio"}>
                        <h3><Link className={'black-link'} to={`/account/${userId}`}>{state.name}</Link></h3>
                        <p>{state.bio}</p>
                    </Col>
                    <Col className={'d-flex justify-content-end'}>
                        <FriendButton otherUser={otherUser} outgoing={outgoing} incoming={incoming}/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default UserCard;