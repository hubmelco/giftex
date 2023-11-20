import React, {useEffect, useState, useRef} from 'react'
import './Header.css'
import './components/search-bar/search.css'
import {useUser} from "../utils/UserContext";
import {Dropdown} from "react-bootstrap";
import GiftButton from "../reusable_components/gift-related/GiftButton";
import logo from '../assets/wish.png';
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import EventButton from "../reusable_components/event-related/EventButton";
import {app, usersService, notifyService} from '../utils/ServerConnection'
import {Link, useHistory} from "react-router-dom";
import NotificationDropDown from "./components/notification-dropdown/NotificationDropDown";

/**
 * This is the header that should be on top of the page on every page
 */
function Header() {

    const {user} = useUser();
    //This acts as window.href.location, doesn't cause a full reload which makes things easier to work with
    const history = useHistory();

    const [searchInput, setSearchInput] = useState({
        name: '',
        dataList: null,
    });

    const [notification, setNotification] = useState([]);
    //This contains a list of notification ids to remove
    const removeNotificationsRef = useRef([]);

    /**
     * This runs whenever the user is changed and on mount
     */
    useEffect(() => {
        // Verify the user is logged in
        if (user) {
            // Search for all friend requests the user has incoming
            notifyService.find({
                query: {
                    receiver: user.id,
                }
            }).then(({data}) => {
                //Reset the notifications to empty before grabbing them all again
                setNotification([]);
                // Gets actual users from the user id's queried earlier, then places them into the notification state
                data.forEach((notification) => {
                    usersService.get(notification.sender)
                        .then((userData) => {
                            setNotification(prevNotification => [...prevNotification, {
                                //TODO: Make this have a read field and delete it on the backend
                                notificationData: notification,
                                senderData: userData
                            }]);
                        })
                        .catch((err) => {
                            console.log('Issue with getting notifications (uh oh spegetio)', err);
                        });
                })
            }).catch((err) => {
                console.log(err);
            });
        }
    }, [user]);

    /**
     * When the notification state changes, remove any read notifications
     */
    useEffect(() => {
        return () => {
            if (removeNotificationsRef.current.length !== 0) {
                notifyService.remove(null, {
                    query: {
                        // Does not reference a DOM element, so does not matter
                        // eslint-disable-next-line react-hooks/exhaustive-deps
                        id: {$in: removeNotificationsRef.current}
                    }
                }).catch((err) => {
                    console.log("Issue removing read notifications", err)
                })
            }
        };
    }, [notification]);

    /**
     * Signs out the user when the sign out button is pressed
     */
    const handleSignOut = (e) => {
        e.preventDefault();
        app.logout(); // Calls feathers log out function
        localStorage.clear(); // Clears access token from local
        //TODO this causes a bug with removing notification (doesn't run demount code)
        window.location.href = '/'; // Redirects to homepage
    };

    /**
     * This function updates the SearchInput state value
     *
     * @param e Event that triggers a change in text has occurred
     */
    const handleSearch = (e) => {
        let value = e.target.value;
        setSearchInput(prevState => ({...prevState, name: {value}}));
    };

    /**
     * Handles navigating to the search page when a user presses enter on the search bar
     * @param e Event (pressing enter) that triggers the search
     */
    const searchSubmit = (e) => {
        e.preventDefault();
        history.push('/search=' + searchInput.name.value);
    }

    const handleClickRedirect = (path) => {
        history.push(path);
    }


    //Header return
    if (user) {
        //Returns the header with all the account's information like funds, notification, and allow them to navigate the site.
        return (
            <div className={'header flex flex-space-between'}>
                <div className={'logo-column'}>
                    <Link to={"/"}>
                        <img className={'logo'} src={logo} alt="logo"/>
                    </Link>
                </div>

                <div className={'flex flex-center flex-gap'}>
                    <GiftButton/>
                    <EventButton/>
                    <span className={"formatLine"}>
                                <Link className='test' to={'/about'}>
                                <i id="privateinfo"
                                   title={"About Us"}
                                   className="fas fa-book-open" style={{color: 'black'}}/>
                                </Link>
                        </span>
                    <NotificationDropDown
                        notifications={notification}
                        setNotifications={setNotification}
                        removeNotificationsRef={removeNotificationsRef}
                    />
                    <Dropdown id="dropdown" className={'mr-1'}>
                        <Dropdown.Toggle variant={'warning'} id={'info-icon'}>
                            <FontAwesomeIcon icon={faUser}/>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className={'textFont'}>
                            <Dropdown.Item onClick={() => handleClickRedirect('/account/' + user.id)}>View Profile</Dropdown.Item>
                            {/*TODO: REMOVE/UPDATE ADD FUNDS BUTTON. This is causing an error everytime the dropdown is
                                opened. Left it uncommented out to remind us to delete/update. jon 4/8/2022*/}
                            {/*<Dropdown.Item><AddFundsButton/></Dropdown.Item>*/}
                            {/*<Dropdown.Item href={'/settings'}>Settings</Dropdown.Item>*/}
                            <Dropdown.Item onClick={() => handleClickRedirect('/settings')}>Settings</Dropdown.Item>
                            <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <form className="search-box" onSubmit={searchSubmit}>
                        <input type="text" placeholder="Search for People on Wishwell" onChange={handleSearch}/>
                        <button type='reset'/>
                    </form>
                </div>
            </div>
        )
    } else {
        //If the user is not logged in then show a header that makes it easy for them to sign up and doesn't allow them to navigate the site.
        return (
            <div className={'header flex flex-space-between'}>
                <div className={'logo-column'}>
                    <Link to={"/"}>
                        <img className={'logo'} src={logo} alt="logo"/>
                    </Link>
                </div>
                <div className={'flex flex-center flex-gap'}>
                    <Link to={'/about'} id={'aboutRef'} className={'mr-3'}>About Us</Link>
                    <Link to={'/login'} id={'logInRef'} className={'mr-3'}>Sign in</Link>
                    <Link to={'/signup'} className={"shadow-sm btn"} id={'signup-button'}>Sign Up</Link>
                </div>
            </div>
        )
    }
}

export default Header;
