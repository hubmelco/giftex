import React, {useEffect} from "react";
import {Dropdown} from "react-bootstrap";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell, faCircle} from "@fortawesome/free-solid-svg-icons";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import Notification from "./components/Notification";

/**
 * This is the Notification Drop Down Component of the header. Handles rendering notifications.
 * Very, Very, Very big subcomponent. Dont get lost :)
 *
 * @param props notifications | setNotifications | removeNotificationsRef
 * @returns {JSX.Element} Header notification drop down subcomponent
 * @constructor
 */
const NotificationDropDown = (props) => {

    useEffect(() => {
        /*
         * Force rerender when notification state updates on main component. updates display when
         * notifications are acted upon
         */
    }, [props.notifications]);

    // Notification Drop Down subcomponent return
    return (<>
        {props.notifications.length !== 0 ?
            <Dropdown className={''} id='hasNotification'>
                <DropdownToggle variant={'warning'} id={'bell-icon'}>
                                <span>
                                    <FontAwesomeIcon icon={faCircle} color={'red'}
                                                     transform={'shrink-6 up-6 left-5'}/>
                                    <FontAwesomeIcon icon={faBell} transform={'left-25'}/>
                                </span>
                </DropdownToggle>
                <DropdownMenu id='dropdown'>
                    {
                        props.notifications.map((item, i) => {
                            return <Notification
                                key={item.notificationData.id}
                                notification={item}
                                index={i}
                                notifications={props.notifications}
                                setNotifications={props.setNotifications}
                                removeNotificationsRef={props.removeNotificationsRef}
                            />
                        })
                    }
                </DropdownMenu>
            </Dropdown>
            :
            <div>
                <i id="privateinfo"
                   title={"Notifications"}
                   className="fas fa-bell"/>
            </div>
        }
    </>)
}

export default NotificationDropDown