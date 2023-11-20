import {shallow} from "enzyme";
import React from "react";
import Account from "../../../../src/pages/account/Account";


describe('Test Account', () => {
    it("renders without crashing", () => {
        shallow(<Account/>);
    });
})