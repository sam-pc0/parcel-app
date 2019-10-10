import * as React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from './App';
import { debug } from 'console';
describe('App', () => {
  it('renders the title', () => {
  	const app = shallow(<App/>);
    expect(toJson(app)).toMatchSnapshot();
  });
});