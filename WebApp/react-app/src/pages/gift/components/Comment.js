import React, { useEffect, useState } from 'react';
import '../Gifts.css';
import {Image} from "react-bootstrap";


/**
 * This was done by 2020 group GOOD LUCK!
 */
function Comment(props){

    // Used to show how long ago a comment was posted
    const[timeAgo, setTimeAgo] = useState('');

    // On component mount or whenever props.data.date updates
    useEffect(() => {
        setTimeAgo(convertToTimeSince(new Date(props.data.date)));
    }, [props.data.date]);

    /**
     * Converts date in YYYY-MM-DD:hh:mm:ss format to <time units> ago
     * @param date
     * @returns {string}
     */
    const convertToTimeSince = (date) => {
        const seconds = Math.floor((new Date() - date) / 1000);

        let interval = seconds / 31536000;

        if (interval > 1) {
            let years = Math.floor(interval);
            if(years === 1) return years + ' year ago';
            return years + ' years ago';
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            let months = Math.floor(interval);
            if(months === 1) return months + ' month ago';
            return months + ' months ago';
        }
        interval = seconds / 86400;
        if (interval > 1) {
            let days = Math.floor(interval);
            if(days === 1) return days + ' day ago';
            return days + ' days ago';
        }
        interval = seconds / 3600;
        if (interval > 1) {
            let hours = Math.floor(interval);
            if(hours === 1) return hours + ' hour ago';
            return hours + ' hours ago';
        }
        interval = seconds / 60;
        if (interval > 1) {
            let minutes = Math.floor(interval);
            if(minutes === 1) return minutes + ' minute ago';
            return minutes + ' minutes ago';
        }
        if (seconds === 1) return Math.floor(seconds) + ' second ago';
        return Math.floor(seconds) + " seconds ago";
    };


    return (
        <div className={'comment-container'}>
            <div className={'comment-icon-container'}>
                <Image className={'comment-icon'} src={props.data.pic} rounded/>
            </div>
            <div style={{width: '100%'}}>
                <div className={'comment-header'}>
                    <div>
                        <span><a  href={'/account/' + props.data.email} className={'comment-user black-link'}>{props.data.name}</a></span>
                    </div>
                    <div className={'comment-date'}>
                        <span>{timeAgo}</span>
                    </div>
                </div>
                <p className={'comment'}>{props.data.comment}</p>
            </div>
        </div>
    )
}

export default Comment;