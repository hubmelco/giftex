import {shallow} from "enzyme";
import React from "react";
import AddGift from "../../../../src/pages/create-gift/AddGift";
import {useUser} from "../../../../src/utils/UserContext";
import {Button} from "react-bootstrap";

jest.mock('../../../../src/utils/UserContext');


describe('Test AddGift', () => {

    const useContext = {
        user:
            {name: 'Chloe', id: 10}
    };
    useUser.mockImplementation(()=> {
        return (useContext)
    });
    

    // TODO: this is not a real test for this component
    it("handleAddGift is called", () => {
        const handleAddGift = jest.fn();
    
        const button = shallow(( <Button onClick={handleAddGift}>Add Gift</Button>));
        button.find('button').simulate('click');
        expect(handleAddGift.mock.calls.length).toEqual(1);
    
    });
    
    it("renders without crashing", () => {
        shallow(<AddGift/>);
    });

})