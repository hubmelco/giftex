import React from 'react';
import {shallow} from "enzyme";
import {useUser} from "../../../../../src/utils/UserContext";
import AccountComp from "../../../../../src/pages/account/components/AccountComp";
import {Typography} from "antd";

jest.mock('../../../../../src/utils/UserContext');

describe('Test Account Component', () => {
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
    
    it("renders without crashing", () => {
        shallow(<AccountComp/>);
    });

    // TODO: fix test
    // it("typography component exists", () => {
    //     function handleBio(e) {
    //         setCharacterCountState(e.length);
    //         setState(prevState => ({
    //             ...prevState,
    //             bio: e
    //         }));
    //     const wrapper = shallow(<AccountComp/>);
    //     const state = {
    //         bio: "sample bio text"
    //     }
    //     const typography = <Typography.Text
    //         editable={{
    //             onChange: (e) => {
    //                 handleBio(e);
    //             },
    //             maxLength: 200
    //         }}>
    //         {state.bio}
    //     </Typography.Text>;
    //     expect(wrapper.contains(typography)).toEqual(true);
    // });

})
