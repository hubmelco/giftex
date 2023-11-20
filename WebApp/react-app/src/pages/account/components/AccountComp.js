import React, {useEffect, useState} from "react";
import "../AccountPage.css"
import {Card, Col, Container, Row} from 'react-bootstrap';
import {Typography} from 'antd';
import "../../../App.css";
import FriendSnippet from "./friend-snippet/FriendSnippet";
import GiftPro from "./gift-profile/GiftPro";
import {withRouter} from "react-router";
import {useUser} from "../../../utils/UserContext";
import {Link, useParams} from 'react-router-dom';
import {
    giftsService,
    usersService,
    userRelationshipsService,
    eventsService,
    activityService,
} from '../../../utils/ServerConnection'
import EventSM from "../../../reusable_components/event-related/EventSM";
import upload from '../../../assets/upload.png';
import FriendButton from "../../../reusable_components/buttons/FriendButton";
import CarouselComp from "../../../reusable_components/misc/CarouselComp";

/**
 * AccountComp is a React Component. It's main purpose is to render up a user's profile page when requested.
 * @returns {JSX.Element}
 */
function AccountComp() {

    //This is the logged in user
    const {user} = useUser();

    //This is the ID of the user account to be retrieved (can be the logged in user or another user depending on
    // what is requested)
    const userData = useParams();

    //All the states being used in this component
    const [state, setState] = useState({
        name: '',
        profile_pic: '',
        bio: '',
        friends: false,
        private: false
    });

    //Needs to be updated from server
    const [activityState, setActivityState] = useState([]);

    // Contains all gifts for a profile
    const [giftState, setGiftState] = useState([]);

    // Contains all events for a profile that have not expired
    const [eventState, setEventState] = useState([]);

    // Contains all friends for a profile
    const [friendState, setFriendState] = useState([]);

    // contains the state of the number of characters used in the bio
    const [characterCountState, setCharacterCountState] = useState();

    /**
     * this method renders an activity card in the Activity pane
     * @param props
     * @returns {JSX.Element}
     */
    function ActivityCard(props) {
        const [activityUserData, setActivityUserData] = useState({
            id: user.id
        });

        const [activityOtherUserData, setActivityOtherUserData] = useState({
            id: user.id,
            name: '',
            profile_pic: ''
        });

        const [activityGiftData, setActivityGiftData] = useState({
            id: 0,
            name: ''
        });

        //this use effect sets the states given the props to render the activity card on page load
        //TODO: write more descriptive errors
        useEffect(() => {
            usersService.get(props.activity.userId).then((data) => {
                setActivityUserData(data);
            }).catch((error) => {
                console.log(error)
            })
            usersService.get(props.activity.otherUserId).then((data) => {
                setActivityOtherUserData(data);
            }).catch((error) => {
                console.log(error)
            })
            giftsService.get(props.activity.giftId).then((data) => {
                setActivityGiftData(data);
            }).catch((error) => {
                console.log(error)
            })
        }, [props.activity])

        return (
            <div>
            <div className={'row'}>
            <div className={'col-3'}>
                <FriendSnippet data={activityUserData}/>
            </div>
            <div className={'col'}>
                <p>
                    contributed ${props.activity.contributionAmount} to {activityOtherUserData.name}'s <Link className={'friends-name-link'} to={'/gifts/' + activityGiftData.id}>{activityGiftData.name}!</Link>
                </p>
            </div>
        </div>
        <div className={'row'}>
            <div className={'col'}/>
            <div className={'col'}>
                <p className={'timestamp'}>{props.activity.createdAt.split("T")[0]}</p>
            </div>
        </div>
    </div>)
    }

    // When the component is rendered, this will grab the gift, friends and activity as long as it is not a private account
    useEffect(() => {
        /**
         * This method will grab the profile information of a requested account and set the state
         * @returns {Promise<void>} resolves with state being set or an error printed to console.
         */
        const grabProfileInfo = async () => {
            try {
                const userProfile = await usersService.get(userData.id);
                setState(userProfile)
            } catch (err) {
                //TODO: make error more descriptive
                console.error(err);
            }

        };

        // Grabs the activity of an account
        const grabActivity = () => {
            activityService.find({
                query: {
                    otherUserId: parseInt(userData.id)
                }
            }).then(({data}) => {
                setActivityState(data);
            }).catch((err) => {
                //TODO: make error more descriptive
                console.log(err);
            });
        };

        /**
         * Queries database for gifts and places them into the gift state
         */
        const grabGifts = () => {
            giftsService.find({
                query:
                    {userId: userData.id}
            })
                .then((gifts) => {
                    setGiftState(gifts.data);
                })
                .catch((error) => {
                    //TODO: make error more descriptive
                    console.log(error)
                });
        };

        /**
         * updates bio after getting profile information
         */
        const grabBio = () => {
            // set character count on page load
            if (state.bio) {
                setCharacterCount(state.bio);
            }
        };

        /**
         * grabs all unexpired events attributed to the given user
         */
        const grabEvents = () => {
            eventsService.find({
                query: {
                    userId: userData.id,
                    end_date: {$gt: new Date()},
                    $sort: {end_date: 1}
                }
            })
                .then((events) => {
                    setEventState(events.data);
                })
                .catch((err) => {
                    //TODO: make error more descriptive
                    console.log(err);
                });
        };

        /**
         * Searches database for all friends of the user who owns the profile and puts them into the friend state
         */
        const grabFriends = async () => {
            try {
                //TODO check to make sure the current user isn't blocked by the other user (blocking is not yet implemented future PBI)
                const friends = await userRelationshipsService.find({
                    query: {userId: userData.id, type: 'friends'},
                });
                let friendData = [];
                // This loop gets the other users id for all results
                for (let key in friends.data) {
                    const otherUserId = friends.data[key].otherUserId;
                    if (otherUserId === user.id) {
                        setState((prevState) => ({...prevState, friends: true}))
                    }
                    const friend = await usersService.get(otherUserId)
                    friendData.push(friend);
                }
                setFriendState(friendData);
            } catch (err) {
                //TODO: make error more descriptive
                console.error(err);
            }
        };

        //Grab profile info each time the use effect runs
        grabProfileInfo().then(function () {
                //TODO: check if user is friends with private person using map
                if (!state.private) {
                    grabGifts();
                    grabEvents();
                    grabFriends().catch(err => console.log(err));
                    grabActivity();
                    grabBio();
                }
            }
        );

    }, [state.private, userData.id, user, state.bio]);

    /**
    This method maps out the activity pane depending on what was returned from the server
    Simply, depending on if the activity was adding a friend, contributing etc. the text will differ
    */
    function activityRender() {
        // TODO this has not yet been implemented on new server database
        if (activityState.length === 0) {
            return (
                <Card.Body className={"cardBody"} style={{color: 'grey'}}>
                    There is no activity to show!
                </Card.Body>
            )
        } else {
            return (
                <Card.Body className={"cardBody"}>
                    {activityState.map(function (item) {
                        //functionality to write "user1 contributed x amount to event-large" on the frontend
                        return <ActivityCard activity={item} key={item.id}/>
                    })}
                </Card.Body>
            )
        }
    }


    /**
    * Rendering in event-related components
    */
    function eventRender() {
        if (eventState.length === 0) {
            return (<Card.Body className={"eventDiv cardBody"} style={{color: 'grey'}}>
                There are no events to show!
            </Card.Body>)
        } else {
            return (
                <Card.Body id={"eventDiv cardBody"}>
                    <CarouselComp map={eventState.map(function (event) {
                            return <Container className={'mb-4'} key={event.id}>
                                <EventSM event={event}/>
                            </Container>
                        })} id="event"/>
                </Card.Body>
            )
        }
    }

    /**
    Rendering in gifts
    */
    function giftRender() {
        if (giftState.length === 0) {
            return (<Card.Body className={"giftDiv cardBody"} style={{color: 'grey'}}>
                There are no gifts to show!
            </Card.Body>)
        } else {
            return (<Card.Body id={"giftDiv cardBody"}>
                    {giftState.map(function (gift) {
                        return (
                            <Container className={'mb-3 border'} key={gift.id}>
                                <GiftPro gift={gift} email={state.email}/>
                            </Container>
                        )
                    })}
                </Card.Body>
            )
        }
    }

    /**
    Rendering in friends list
    */
    function friendRender() {
        if (friendState.length === 0) {
            return (<Card.Body className={"cardBody"} style={{color: 'grey'}}>
                Be their first friend!! Press the Add Friend button above!
            </Card.Body>);
        } else {
            return (<Card.Body id="FriendDisDiv" className={"cardBody"}>
                <Container id={'friends'}>
                    {friendState.map(function (item, i) {
                        return <FriendSnippet class={'snippet'} data={item} key={i}/>
                    })
                    }
                </Container>
            </Card.Body>);
        }
    }

    console.log(friendState)

    /**
    Depending on if an account is private or not, we will render in different things.
    */
    function privRender() {
        //TODO create a private account and test if the old code here works / see how it looks
        if (!state.friends && user.id !== parseInt(userData.id) && state.private) {
            return (
                <Row>
                    <Col className={'d-flex justify-content-center'}>
                        <Card style={{width: '100%'}}>
                            <Card.Header className={'cardHeader d-flex justify-content-center'}>
                                This account is private!
                            </Card.Header>
                        </Card>
                    </Col>
                </Row>)
        } else {
            return (<Row className={"mt-3"}>
                    <Col md={4}>
                        <Card className={"card activityCard"}>
                            <Card.Header className={"cardHeader"}>
                                Activity
                            </Card.Header>
                            {activityRender()}
                        </Card>
                    </Col>
                    <Col md={8}>
                        <Card className={"card"}>
                            <Card.Header className={"cardHeader"}>Friends List</Card.Header>
                            {friendRender()}
                        </Card>
                        <Card className={"mt-3 card"}>
                            <Card.Header className={"cardHeader"}>
                                Upcoming Events
                            </Card.Header>
                            {eventRender()}
                            {parseInt(userData.id) === user.id &&
                            <Card.Footer className={"cardHeader"}>
                                <Link className={'black-link d-flex flex-grow-1 justify-content-center'}
                                      to={`/events`}>View All Events</Link>
                            </Card.Footer>
                            }
                        </Card>
                        <Card className={"mt-3 card"}>
                            <Card.Header className={"cardHeader"}>
                                Wish List
                            </Card.Header>
                            {giftRender()}
                        </Card>
                    </Col>
                </Row>
            )
        }
    }

    // changes user's profile picture
    let onImageChange = (event) => {
        if (event.target.files.length === 1) {
            let reader = new FileReader();
            reader.onload = async (e) => {
                setState(prevState => ({
                    ...prevState,
                    pic: e.target.result
                }));
                await usersService.patch(userData.id, {profile_pic: e.target.result})
                    .then(() => {
                        //TODO: Tell the user their picture was changed
                        setState(prevState => ({...prevState, pic: e.target.result}))
                    }).catch((e) => {
                        console.log(e);
                        console.log("Error changing pic")
                    });
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    /**
     * keeps track of the character counter and saves it to the database
     */
     function handleBio(e) {
        setCharacterCountState(e.length);
        setState(prevState => ({
            ...prevState,
            bio: e
        }));
        usersService.patch(userData.id, {bio: e})
            .then(() => {
                //TODO: put a toast here for bio change
            }).catch(()=>{
                console.log("Error changing bio")
            });
    }

    function setCharacterCount(e) {
        setCharacterCountState(e.length);
    }

    // function that opens up a file selector when profile picture is clicked
    const handleFile = () => {
        let input = document.createElement('input');
        input.type = 'file';
        input.className = "filetype fileSelector";
        input.accept = "image/png, image/jpeg"
        input.onchange = onImageChange;
        input.click();
    }

    // Return the entire account page
    return (
        <div id={'accountBody'}>
            <Container>
                <Row className={"pt-3 d-flex justify-content-center"}>
                    <Col md={4} className={'d-flex justify-content-end'}>
                        <div className='profileArea'>
                            <img
                                src={state.profile_pic}
                                id={'profilePicture'}
                                alt={"profile"}
                            />
                            {parseInt(userData.id) === user.id &&
                            <img
                                src={upload}
                                className="overlay overlayFade"
                                id={'profilePicture'}
                                onMouseOver={e => (e.currentTarget.src = upload)}
                                onClick={handleFile}
                                alt={""}
                            />
                            }
                        </div>
                    </Col>
                    <Col md={8} className={'pt-5'} id={"bio"}>

                        <h2>{state.name}</h2>
                        <Card className={"card"} >
                            <Card.Header className={"cardHeader"}>Bio</Card.Header>
                            <Card.Body>
                                {parseInt(userData.id) === user.id ?
                                    // using the Typography import to provide a button that makes the bio information editable
                                    <Typography.Text
                                        editable={{
                                            onChange: (e) => {
                                                handleBio(e);
                                            },
                                            maxLength: 200
                                        }}>
                                        {state.bio}
                                    </Typography.Text>
                                    :
                                    <Typography.Text>
                                        {state.bio}
                                    </Typography.Text>
                                }
                            </Card.Body>
                            {/*footer where the character count and character limit are shown*/}
                            <Card.Footer>
                                <p className={"d-flex justify-content-end m-0"}>{characterCountState} / 200</p>
                            </Card.Footer>
                        </Card>
                        <br/>
                        {parseInt(userData.id) !== user.id && <FriendButton otherUser={userData}/>}
                    </Col>
                </Row>
                {privRender()}
            </Container>
        </div>
    )
}


export default withRouter(AccountComp);