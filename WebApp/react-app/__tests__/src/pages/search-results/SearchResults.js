import {useUser} from "../../../../src/utils/UserContext";
import {shallow} from "enzyme";
import React from "react";
import SearchResults from "../../../../src/pages/search-results/SearchResults";

jest.mock('../../../../src/utils/UserContext');

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useParams: () => ({
        id: 123,
    }),
}));

describe('Test Search Results Page', () => {
    const useContext = {
        user:
            {name: 'Chloe', id: 10}
    };
    useUser.mockImplementation(()=> {
        return (useContext)
    });
    
    it("renders without crashing", () => {
        shallow(<SearchResults/>);
    });

})