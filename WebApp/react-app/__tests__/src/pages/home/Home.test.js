import {useUser} from "../../../../src/utils/UserContext";
import {shallow} from "enzyme";
import React from "react";
import Home from "../../../../src/pages/home/Home";

jest.mock('../../../../src/utils/UserContext');


describe('Test Home Page', () => {
    const useContext = {
        user:
            {name: 'Chloe', id: 10}
    };
    useUser.mockImplementation(()=> {
        return (useContext)
    });
    
    it("renders without crashing", () => {
        shallow(<Home/>);
    });

})