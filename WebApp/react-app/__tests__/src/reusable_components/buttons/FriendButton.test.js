import {useUser} from "../../../../src/utils/UserContext";
import {shallow} from "enzyme";
import React from "react";
import FriendButton from "../../../../src/reusable_components/buttons/FriendButton";
import 'regenerator-runtime/runtime';

jest.mock('../../../../src/utils/UserContext');


describe('Test Friend Button', ()=> {
    const useContext = {
        user:
            {name: 'Chloe', id: 10}
    };
    
    useUser.mockImplementation(()=> {
        return (useContext)
    });
    
    const props = {
        otherUser: {
            bio: null,
            createdAt: "2022-04-21T10:03:25.000Z",
            dob: "2000-12-15",
            email: "Email5@email.com",
            googleId: null,
            id: 5,
            name: "chloe5",
            private: 1,
            profile_pic: null,
            updatedAt: "2022-04-21T10:03:25.000Z"
        },
        outgoing: {
            2: "friend-request"
        },
        incoming: {
    
        }
    }
    
    it("renders without crashing", () => {
        shallow(<FriendButton otherUser={props.otherUser} outgoing={props.outgoing} incoming={props.incoming}/>);
    });

})