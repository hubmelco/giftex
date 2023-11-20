import {shallow} from "enzyme";
import React from "react";
import Event from "../../../../src/pages/event-large/Event";
import {useUser} from "../../../../src/utils/UserContext";

jest.mock('../../../../src/utils/UserContext');

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useParams: () => ({
       id: 123,
    }),
}));

describe('Test Event Page', () => {
    const useContext = {
        user:
            {name: 'Chloe', id: 10}
    };

    useUser.mockImplementation(()=> {
        return (useContext)
    });
    
    it("renders without crashing", () => {
        shallow(<Event/>);
    });

})