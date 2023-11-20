import React, {useEffect, useState} from 'react';
import {useUser} from "../../utils/UserContext";
import {Button} from "react-bootstrap";
import {notifyService, userRelationshipsService} from "../../utils/ServerConnection";

/**
 * Component for displaying a friends button that updates according to user status with assigned user.
 * Takes: otherUser, status
 * @returns {JSX.Element}
 * @constructor
 */
function FriendButton(props) {
    let {otherUser} = props

    const {user} = useUser();

    const [statusState, setStatusState] = useState({
        friend: false,
        outgoing_requested: false,
        incoming_requested: false
    });

    useEffect(() => {
        if (props.outgoing && props.incoming) {
            // for the search page
            if (props.incoming[otherUser.id]) {
                let friendType = props.incoming[otherUser.id]
                setStatusState({
                    'incoming_requested': friendType === 'friend-request',
                    'friend': friendType === 'friends'
                });
            } else if (props.outgoing[otherUser.id]) {
                let friendType = props.outgoing[otherUser.id]
                setStatusState({
                    'outgoing_requested': friendType === 'friend-request',
                    'friend': friendType === 'friends'
                });
            }
        } else if(window.location.href.includes("account")) {
            // for profile page
            userRelationshipsService.find({
                query: {
                    //sender ID
                    $or: [
                        {userId: user.id, otherUserId: parseInt(otherUser.id)},
                        {userId: parseInt(otherUser.id), otherUserId: user.id}
                    ]
                }
            }).then((relationship) => {
                //checks if there is no relationship, one way relationship (1 friend request sent)
                // or two way relationship (friends)
                console.log(relationship)
                if (relationship.data.length >= 0 && relationship.data.length <= 2) {
                    if (relationship.data[0].otherUserId === user.id) {
                        setStatusState({
                            'incoming_requested': relationship.data[0].type === 'friend-request',
                            'friend': relationship.data[0].type === 'friends'
                        });
                    } else if (relationship.data[0].userId === user.id) {
                        setStatusState({
                            'outgoing_requested': relationship.data[0].type === 'friend-request',
                            'friend': relationship.data[0].type === 'friends'
                        });
                    }
                }
                console.log("FriendButton UseEffect ran")
            }).catch((e) => {
                console.log("error finding relationship", e)
            })
        }
    }, [otherUser, props, user.id])

    /**
     * For rendering friends button depending on if they're your friend or not
     * @returns {JSX.Element}
     */
    function friendsButton() {
        if (statusState.outgoing_requested) {
            return <Button style={{background: 'grey', border: 'grey'}} disabled={true}>Friend Request Sent</Button>
        } else if (statusState.incoming_requested) {
            //TODO: add a deny button?
            return <Button onClick={addFriend}>Add Back</Button>
        } else if (!statusState.friend && otherUser.id !== user.id) {
            return <Button onClick={handleFriendRequest}>Add Friend</Button>
        } else {
            return <Button onClick={removeFriend}>Friends :D</Button>
        }
    }

    /**
     * Method for sending a friend request when button is pressed
     * @returns {Promise<void>}
     */
    const handleFriendRequest = () => {
        let payload = {
            relationship: {
                userId: user.id,
                otherUserId: otherUser.id,
                type: 'friend-request'
            },
            notification: {
                sender: user.id,
                receiver: otherUser.id,
                type: 'friend-request'
            }
        };
        userRelationshipsService.create(payload.relationship)
            .then(() => {
                setStatusState(prevState => ({...prevState, 'outgoing_requested': true}))
                notifyService.create(payload.notification)
                    .then(() => {
                        console.log("Friend-request processed in FriendButton component")
                    })
                    .catch((err) => {
                        console.log("Issue sending notification", err);
                    });
            }).catch((err) => {
            console.log("Issue creating friend-request", err)
        });
    };

    /**
     * Method for handling accepting a friend request
     *
     * @param itemNum the index of the notification in the notification state
     * @param item the notification from the notification state in header
     */
    const addFriend = async () => {
        try {
            await userRelationshipsService.patch(null, {type: 'friends'}, {
                query: {
                    userId: otherUser.id,
                    //receiver Id
                    otherUserId: user.id,
                    type: 'friend-request'
                }
            })
            await userRelationshipsService.create({
                userId: user.id,
                otherUserId: otherUser.id,
                type: 'friends'
            })
            await notifyService.create({
                sender: user.id,
                receiver: otherUser.id,
                type: 'accepted-friend-request'
            }).then(() => {
                console.log("successfully created MEEEEEEEEEEEE");
                setStatusState({'outgoing_requested': false, 'incoming_requested': false, 'friend': true})
            })
            await notifyService.remove(null, {
                query: {
                    sender: otherUser.id,
                    receiver: user.id,
                    type: 'friend-request'
                }
            })

            window.location.reload(false)
        } catch (err) {
            console.log('Issue accepting friend request (profile)', err)
        }
    }

    /**
     * Handles removing friend when pressing the friend request button again (might change to look better)
     */
    function removeFriend() {
        userRelationshipsService.remove(null, {
            query: {
                $or: [
                    {userId: user.id, otherUserId: otherUser.id},
                    {userId: otherUser.id, otherUserId: user.id},
                ]
            }
        }).then(() => {
            //TODO: Might need to get rid of notification as well
            setStatusState(prevState => ({...prevState, 'requested': false, friend: false}))
        }).catch((e) => {
            console.log(e)
        })
    }


    return (friendsButton())
}

export default FriendButton;
