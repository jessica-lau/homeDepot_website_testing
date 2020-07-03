import React from 'react';
import { render } from '@testing-library/react';
import { shallow, mount } from 'enzyme';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/react/i);
  expect(linkElement).toBeInTheDocument();
});

test('1 plus 1 is 2', () => {
  expect (1 + 1).toEqual(2)
 
});

it('renders welcome message', () => {
  const wrapper = shallow(<App />);
  const welcome = <div id="test">Hi, there.</div>;
  expect(wrapper.contains(welcome)).toBe(true);
  
});


it('renders without crashing', () => {
  shallow(<App />);
});

it('renders welcome message', () => {
  const wrapper = shallow(<App />);
  const welcome = <div>Hi, there.</div>;
  expect(wrapper.hasClass("App")).toBe(true);
});

it('message', () => {
  const wrapper = mount(<App />);
  expect(wrapper.find('img')).toBe(true);
});