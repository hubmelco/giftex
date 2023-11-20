import {shallow} from "enzyme";
import React from "react";
import SignUpForm from "../../../../src/pages/signup/SignUpForm";


describe('Test SignUp Page', () => {

    it("renders without crashing", () => {
        shallow(<SignUpForm/>);
    });

})