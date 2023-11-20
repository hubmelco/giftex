import React from 'react';
import {shallow} from "enzyme";
import About from "../../../src/pages/about/About";


describe('Test About Us Page', () => {

    it("renders without crashing", () => {
        shallow(<About/>);
    });

})
