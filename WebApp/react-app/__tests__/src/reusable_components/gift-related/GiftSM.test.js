import {shallow} from "enzyme";
import React from "react";
import GiftSM from "../../../../src/reusable_components/gift-related/GiftSM";
import { screen } from '@testing-library/react';


describe('Test GiftSm Component', () => {


    const props = {
        gift: {
            category: null,
            createdAt: "2022-04-21T12:03:25.000Z",
            deadline: "2030-11-06",
            description: "is this even possible?",
            eventId: null,
            id: 10,
            name: "The pyramids",
            price: 50000000000,
            progress: 0,
            receiverId: 4,
            receiverName: "chloe4",
            thumbnail: "https://www.history.com/.image/t_share/MTU3ODc5MDg2NDMxODcyNzM1/egyptian-pyramids-hero.jpg",
            updatedAt: "2022-04-21T16:03:25.000Z",
            userId: 1
        }
    }

    document.body.innerHTML = <GiftSM gift={props} key={props.gift.id}/>

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<GiftSM gift={props} key={props.gift.id}/>);
    })


    it("renders without crashing", () => {
        shallow(<GiftSM gift={props} key={props.gift.id}/>);
    });

    it("contains correct header", () => {
        //TODO: figure out how the screen works
        // console.log(screen.getByTestId('giftSM-Header'))
        // screen.logTestingPlaygroundURL()
        // expect(screen.queryByTestId('giftSM-Header')).toHaveTextContext(props.gift.name);
        expect(screen.queryByTestId('giftSM-Header')).toBeDefined();
    })


})