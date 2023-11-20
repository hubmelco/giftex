import {useUser} from "../../../../src/utils/UserContext";
import {shallow} from "enzyme";
import React from "react";
import Settings from "../../../../src/pages/settings/Settings";

jest.mock('../../../../src/utils/UserContext');

describe('Test Settings Page', () => {

    const useContext = {
        user: {
            name: "Chloe",
            id: 10,
            email: "Chloe's email",
            pic: "Chloe's pic",
            private: true
        }
    };
    useUser.mockImplementation(()=> {
        return (useContext)
    });
    
    it("renders without crashing", () => {
        shallow(<Settings/>);
    });

})