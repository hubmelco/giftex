import {useUser} from "../../../../../src/utils/UserContext";
import {shallow} from "enzyme";
import React from "react";
import Comment from "../../../../../src/pages/gift/components/Comment";

jest.mock('../../../../../src/utils/UserContext');

describe('Test Comments', () => {

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
    }));
    
    const props = {
        data: {
            date: 123,
            comment: true,
            email: "Chloe's email",
            pic: "Chloe's pic",
            name: "Chloe's name"
        }
    }
    
    it("renders without crashing", () => {
        shallow(<Comment data={props}/>);
    });

})