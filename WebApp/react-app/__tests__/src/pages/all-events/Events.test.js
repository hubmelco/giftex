import {useUser} from "../../../../src/utils/UserContext";
import {shallow} from "enzyme";
import React from "react";
import Events from "../../../../src/pages/all-events/Events";

jest.mock('../../../../src/utils/UserContext');

describe('Test All Events', () => {
    const useContext = {
        user:
            {name: 'Chloe', id: 10}
    };
    useUser.mockImplementation(()=> {
        return (useContext)
    });
    
    it("renders without crashing", () => {
        shallow(<Events/>);
    });
})