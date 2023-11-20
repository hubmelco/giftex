import {useUser} from "../../../../src/utils/UserContext";
import {shallow} from "enzyme";
import React from "react";
import EventButton from "../../../../src/reusable_components/event-related/EventButton";
jest.mock('../../../../src/utils/UserContext');


describe('Test EventButton', () =>{
    const useContext = {
        user:
            {
                bio: "bio",
                createdAt: "2022-04-21T10:03:25.000Z",
                dob: "2000-12-15",
                email: "Email1@email.com",
                googleId: null,
                id: 1,
                name: "chloe1",
                private: 0,
                profile_pic: null,
                updatedAt: "2022-05-16T20:58:28.000Z"
            }
    };

    useUser.mockImplementation(()=> {
        return (useContext)
    });

    it("renders without crashing", () => {
        shallow(<EventButton/>);
    });
})