import React, {useEffect} from "react";
import {notifyService, userRelationshipsService} from "../../../../utils/ServerConnection";
import {Button, Dropdown} from "react-bootstrap";
import {Link} from "react-router-dom";

/**
 * Notification subcomponent in the notification drop down subcomponent.
 *
 * @param props notification, index, notifications, setNotifications, removeNotificationsRef
 * @returns {JSX.Element} Notification Drop Down Subcomponent
 */
const Notification = (props) => {

    useEffect(() => {
        /*
         * Force rerender when any props change, i.e. remove notification if modified or update if a different
         * notification took its place
         */
    }, [props])

    /**
     * Method for handling accepting a friend request
     *
     * @param itemNum the index of the notification in the notification state
     * @param item the notification from the notification state in header
     */
    const handleAdd = async (itemNum, item) => {
        try {
            await userRelationshipsService.patch(null, {type: 'friends'}, {
                query: {
                    userId: item.senderData.id,
                    otherUserId: item.notificationData.receiver,
                    type: 'friend-request'
                }
            })
            await userRelationshipsService.create({
                userId: item.notificationData.receiver,
                otherUserId: item.senderData.id,
                type: 'friends'
            })
            await notifyService.create({
                sender: item.notificationData.receiver,
                receiver: item.senderData.id,
                type: 'accepted-friend-request'
            })
            // If all requests succeed remove notification
            removeNotification(item.notificationData.id, itemNum)
        } catch (err) {
            console.log('(Header Notification) Issue accepting friend request', err)
        }
    }

    /**
     * Method meant for handling declining a friend-request
     *
     * @param itemNum the item number from the notification state
     * @param item the item from the notification state
     */
    const handleDecline = (itemNum, item) => {
        userRelationshipsService.remove(null, {
            query: {
                userId: item.senderData.id,
                otherUserId: item.notificationData.receiver,
                type: 'friend-request'
            }
        }).then(() => {
            removeNotification(item.notificationData.id, itemNum)
        }).catch((err) => {
            console.log("Error occurred when removing relationship when declined", err);
        })
    }

    /**
     * Method for removing the notification from the state and front-end html
     *
     * @param notificationId ID of the notification ot remove
     * @param itemNum the index of the notification to be removed in the state
     */
    const removeNotification = (notificationId, itemNum) => {
        const leftHalf = props.notifications.slice(0, itemNum)
        const rightHalf = props.notifications.slice(itemNum + 1)
        props.removeNotificationsRef.current.push(notificationId);
        // TODO: Removing a notification closes the drop down. This is needed to update the drop down when there
        //  are no notifications, but we should find a way to keep it open for user experience purposes
        props.setNotifications(leftHalf.concat(rightHalf))
    }

    /**
     * Renders a notification message based on the type received from the server
     *
     * @param type 'friend-request' | 'accepted-friend-request'
     * @returns {string} Message to be shown to the user
     */
    const notifyMessage = (type) => {
        let message = 'default'
        switch (type) {
            case 'friend-request':
                message = ' sent a friend request!'
                break;
            case 'accepted-friend-request':
                message = ' accepted your friend request'
                break;
            default:
                message = 'default'
        }
        return message;
    }

    // Notification sub-subcomponent return
    return (<Dropdown.ItemText id={props.index}>
        <div className={'notification-box'}>
            <div className={'notification-box'} style={{gap: '0.75rem'}}>
                <img src={props.notification.senderData.profile_pic}
                     className={'mr-2'} style={{
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    flexGrow: '1',
                    objectFit: 'cover',
                }} alt={"profile pic"}/>
                <Link to={'/account/' + props.notification.notificationData.id}
                      style={{textDecoration: 'none', color: 'black'}}>
                    {props.notification.senderData.name}{notifyMessage(props.notification.notificationData.type)}
                </Link>
            </div>
            {
                props.notification.notificationData.type === 'friend-request'
                    ?
                    <div className={'notification-box'} style={{gap: '0.75rem'}}>
                        <Button className={'notification-button'}
                                onClick={() => handleAdd(props.index, props.notification).then()}
                                style={{
                                    backgroundColor: '#93e4f3',
                                }}>Add</Button>
                        <Button className={'notification-button'}
                                onClick={() => handleDecline(props.index, props.notification)}
                                style={{
                                    backgroundColor: 'red',
                                }}>Decline</Button>
                    </div>
                    :
                    <div className={'notification-box'} style={{gap: '0.75rem'}}>
                        <Button className={'notification-button'}
                                onClick={() => removeNotification(props.notification.notificationData.id, props.index)}
                                style={{
                                    backgroundColor: '#93e4f3',
                                }}>Close</Button>
                    </div>
            }
        </div>
    </Dropdown.ItemText>)
}

export default Notification