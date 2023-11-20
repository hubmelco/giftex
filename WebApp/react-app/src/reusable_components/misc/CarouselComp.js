import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../../pages/home/Home.css'

/**
 * This component renders a carousel
 * It is used on the home page for gifts and on the account page for all-events
 *
 * As of 4/20/22
 *
 * @param {*} props a map of the gift or event components to be rendered in the carousel
 */
function CarouselComp(props){

    // TODO : find a happy ground for breakpoints so we dont have two different ones

    // Breakpoints for gifts
    const responsiveGift = {
        largeDesktop: {
            breakpoint: {max: 5000, min: 3000},
            items: 4,
            slidesToSlide: 4 // optional, default to 1.
        },
        desktop: {
            breakpoint: {max: 3000, min: 1200},
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: {max: 1200, min: 525},
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: {max: 525, min: 0},
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    // Breakpoints for all-events
    const responsiveEvent = {
        largeDesktop: {
            breakpoint: {max: 5000, min: 2400},
            items: 4,
            slidesToSlide: 4
        },
        desktop: {
            breakpoint: {max: 2400, min: 1024},
            items: 3,
            slidesToSlide: 3
        },
        tablet: {
            breakpoint: {max: 1024, min: 464},
            items: 2,
            slidesToSlide: 2
        },
        mobile: {
            breakpoint: {max: 464, min: 0},
            items: 1,
            slidesToSlide: 1
        }
    };

    return (
        <Carousel
            responsive={props.id === 'gift' ? responsiveGift : responsiveEvent}
            renderButtonGroupOutside={true}
            swipeable={false}
            draggable={false}
            showDots={true}
            ssr={true} // means to render carousel on server-side.
            infinite={false}
            containerClass="pop-gift-container"
        >
            {props.map}
        </Carousel>
    )
}

export default CarouselComp;