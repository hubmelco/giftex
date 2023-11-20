import React from 'react';
import {shallow} from "enzyme";
import {useUser} from "../../../../../src/utils/UserContext";
import GiftPro from "../../../../../src/pages/account/components/gift-profile/GiftPro";

jest.mock('../../../../../src/utils/UserContext');

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useParams: () => ({
        id: 123,
    }),
}));


describe('Test GiftPro', () => {
    const useContext = {
        user:
            {name: 'Chloe', id: 10}
    };
    
    useUser.mockImplementation(()=> {
        return (useContext)
    });
    
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
        shallow(<GiftPro gift={props} email={"notImplemented@hotmail.com"}/>);
    });

})