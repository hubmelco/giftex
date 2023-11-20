import {shallow} from "enzyme";
import React from "react";
import ContributeButton from "../../../../src/reusable_components/buttons/ContributeButton";
import {Modal} from "react-bootstrap";


describe('Test Contribute Button', () =>{
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
    
    it("renders without crashing", () => {
        shallow(<ContributeButton gift={props}/>);
    });
    
    it("modal opens upon click", () =>{
        const wrapper = shallow(<ContributeButton gift={props}/>);
        wrapper.find('#CardFooterButton').simulate('click');
        expect(wrapper.find(Modal).prop('show')).toBe(true)
    
    })
})