import {shallow} from "enzyme";
import React from "react";
import Loading from "../../../../src/reusable_components/loading/Loading";


describe('Test Loading', () => {
    it("renders without crashing", () => {
        shallow(<Loading/>);
    });
})