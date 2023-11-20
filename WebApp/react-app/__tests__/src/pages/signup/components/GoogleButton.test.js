import {shallow} from "enzyme";
import React from "react";
import GoogleButton from "../../../../../src/pages/signup/components/GoogleButton";

describe('Test Google Button', () => {
    
    it("renders without crashing", () => {
        shallow(<GoogleButton/>);
    });
    
})