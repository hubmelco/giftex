import {shallow} from "enzyme";
import React from "react";
import TermsAndConditions from "../../../../src/pages/signup/TermsAndConditions";

describe('Test Terms and Conditions Page', () => {

    it("renders without crashing", () => {
        shallow(<TermsAndConditions/>);
    });

})