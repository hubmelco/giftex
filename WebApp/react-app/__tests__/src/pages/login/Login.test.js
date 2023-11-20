import {shallow} from "enzyme";
import React from "react";
import Login from "../../../../src/pages/login/Login";

describe('Test Login Page', () => {

    it("renders without crashing", () => {
        shallow(<Login/>);
    });

})