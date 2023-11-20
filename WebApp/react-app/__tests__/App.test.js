import React from 'react';
import App from '../src/App';
import { shallow } from 'enzyme';


describe('Test App', () => {
  it("renders without crashing", () => {
    shallow(<App/>);
  });
})
