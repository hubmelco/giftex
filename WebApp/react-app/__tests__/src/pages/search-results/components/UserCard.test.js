import {useUser} from "../../../../../src/utils/UserContext";
import {shallow} from "enzyme";
import React from "react";
import UserCard from "../../../../../src/pages/search-results/components/UserCard";

jest.mock('../../../../../src/utils/UserContext');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useParams: () => ({
        id: 123,
    }),
}));

describe('Test UserCard', () => {

    const useContext = {
        user:
            {name: 'Chloe', id: 10}
    };
    
    useUser.mockImplementation(()=> {
        return (useContext)
    });
    
    
    const props = {
        userRelations: {
            outgoing: {
    
            },
            incoming: {
                2: "friend-request"
            }
        }
    }
    
    it("renders without crashing", () => {
        shallow(<UserCard userID={1} userRelations={props}/>);
    });

})