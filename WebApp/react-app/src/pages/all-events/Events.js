import React, {useEffect, useState} from 'react'
import EventSM from "../../reusable_components/event-related/EventSM";
import {Card, Container} from "react-bootstrap";
import {eventsService, usersService} from "../../utils/ServerConnection";
import {useUser} from "../../utils/UserContext";
import "../event-large/Events.css";


/**
This page renders ALL events for the signed in user, regardless of expiry date
*/
function Events() {
    //logged in user
    const {user} = useUser();

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

    // Contains all event-related for a profile
    const [eventState, setEventState] = useState([]);

    /**
     * On page load
     */
    useEffect(() => {
        //grabbing all events
        const grabEvents = async () => {
            try {
                const events = await eventsService.find({query: {userId: {$eq: user.id}}});
                setEventState(events.data);
            } catch (err) {
                console.error(err);
            }
        };

        const grabProfileInfo = async () => {
            try {
                await usersService.get(user.id).then((resp) => {
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
                    grabEvents();
                }
            }
        );
    }, [state.priv, user.id]);

    /**
     * Rendering in events
    */
    function eventRender() {
        if (eventState.length === 0) {
            return (<Card.Body className={"eventDiv cardBody"} style={{color: 'grey'}}>
                There are no events to show!
            </Card.Body>)
        } else {
            return eventState.map(function (event, i) {
                return <Container className={'mb-4'}>
                    <EventSM event={event} key={i}/>
                </Container>
            })
        }
    }

    return (
        <div>
            <div className={"content-container"}>
                <h2 className={"event-large-title"}>All Events</h2>
                <div className={"event-large-grid-container"}>
                    {eventRender()}
                </div>
            </div>
        </div>
    )

}

export default Events;