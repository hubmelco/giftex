import React, {useEffect, useState} from 'react';
import './Home.css';
import {useUser} from "../../utils/UserContext";
import GiftSM from "../../reusable_components/gift-related/GiftSM";
import 'react-multi-carousel/lib/styles.css';
import GiftHome from "../../assets/well.png";
import GiftButton from "../../reusable_components/gift-related/GiftButton";
import {giftsService} from "../../utils/ServerConnection";
import CarouselComp from '../../reusable_components/misc/CarouselComp';

/**
 * this is the html of the Home page which includes rendering the home page
 * for both logged out and logged in users.
 * 
 * As of 04/05/22
 */
function Home() {
    // this is an object of the logged in user which holds all
    // the data about the current logged in user
    const {user} = useUser();

    // holds the current state of gift-related as it pertains to the Home page
    const [state, setState] = useState({
        giftData: []
    });

    /**
     * On page load
     */
    useEffect(() => {
        if (user) {
            //TODO: do we want to change this to be friend's gift-related? If so what are the criteria?
            giftsService.find({
                query:
                    {userId: user.id}
            }).then(({data}) => {
                setState({giftData: data})
            }).catch((err) => {
                console.log("Issue loading gift-related on Homepage", err);
            })
        }
    }, [user]);


    /**
     * used in the return statement at the bottom, returns a different footer based on whether or not
     * the user is logged in
     * as of: 04/05/22
     */
    function FooterContent() {
        if (user) {
            return (
                <div className={'content-container'}>
                    <p className={'section-title'}>My Gifts</p>
                    <div className={'pop-gift-container'}>
                        <CarouselComp map={
                            state.giftData.map(function (gift) {
                                return <GiftSM gift={gift} key={gift.id}/>
                            })
                        } id="gift"/>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={'content-container'}>
                    <p className={'section-title'}>About Us</p>
                    <p className={'about-us-text'}>Wishwell is a gift giving platform that combines the elements of a gift
                        registry and a social media sharing platform. Use Wishwell to see and keep track of what gifts
                        you and your friends want, see what upcoming events your friends are planning and create your
                        own events, and donate to the gifts of your choosing!</p>
                </div>
            )
        }
    }

    return (
        <div>
            <div className={'content-container'}>
                <div className={'home-about-container'}>
                    <div className={'giftly-info-container'}>
                        <div>
                            <p className={'section-title'}>Give Them the Right Gift.</p>
                            <p className={'section-description'}>Easily create a gift for you or a loved one</p>
                            {/*TODO I don't like that our gift button is also the get started button. They should be separate IMO - jon*/}
                            <GiftButton/>
                        </div>
                    </div>
                    <div className={'home-image'}>
                        <img className={'home-image'} src={GiftHome} alt={"WishWell"}/>
                    </div>
                </div>
            </div>
            <div className={'grey-background'}>
                <FooterContent/>
            </div>
        </div>
    )
}

export default Home;
