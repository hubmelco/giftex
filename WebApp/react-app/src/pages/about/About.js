import React from 'react';
import './About.css';

/**
 * Returns the about us page
 */
function About() {
    /**
     * page content
     */
    return (
        <div>
            <div className={'content-container'}>
                <div className={'about-page-container'}>
                    <div className={'about-info-container'}>
                        <div>
                            <p className={'about-section-title'}>About Wishwell</p>
                            <div className={'about-grey-background'}>
                                <p className={'section-description'}>Wishwell is gift giving platform that combines the elements of a gift registry and a social media sharing platform. Use Wishwell to see and keep track of what gifts you and your friends want, see what upcoming events your friends are planning and create your own events, and donate to the gifts of your choosing!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default About;