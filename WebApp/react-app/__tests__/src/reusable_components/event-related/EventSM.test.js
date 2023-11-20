import {useUser} from "../../../../src/utils/UserContext";
import {shallow} from "enzyme";
import React from "react";
import EventSM from "../../../../src/reusable_components/event-related/EventSM";

jest.mock('../../../../src/utils/UserContext');
const useContext = {
    user:
        {name: 'Chloe', id: 10}
};

useUser.mockImplementation(()=> {
    return (useContext)
});

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useParams: () => ({
        id: 123,
    }),
    useHistory: () => ({
        pathName: null
    })
}));

it("renders without crashing", () => {
    const props = {
        event: {
            createdAt: "2022-04-21T12:03:25.000Z",
            description: "I'm one year older!",
            end_date: "2030-01-05",
            id: 2,
            name: "Birthday Party",
            private: null,
            updatedAt: "2022-04-21T16:03:25.000Z",
            userId: 1
        },
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
    shallow(<EventSM event={props}/>);
});