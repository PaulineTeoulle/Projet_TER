import React, {useContext, useState} from 'react';
import 'regenerator-runtime/runtime';
import {render, screen, cleanup} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Login from "../src/views/Login";


// test("demo", function(){
//     const a = 1 + 1;
//     expect(a).toBe(2);
// })

configure({ adapter: new Adapter() });

describe("- Login render Page -", () => {
    it('renders the Login page', () => {
        const {container} = render(<Login/>);
        expect(container.firstChild.classList.contains('LoginRegister')).toBe(true);
    });

    it('render 2 input components', () => {
        const wrapper = shallow(<Login />)
        expect( wrapper.find({id:"username"}).exists()).toBeTruthy();
        expect( wrapper.find({id:"password"}).exists()).toBeTruthy();
    });

    it('renders a submit button', () => {
        const wrapper = shallow(<Login />)
        expect(wrapper.find(".action>button").exists()).toBeTruthy();
    });
});

// configure({ adapter: new Adapter() });
// describe(" - login logic - ", () => {

//     it("calls onLogin when button clicked", () => {
//         const wrapper = shallow(<Login />)
        // wrapper.find({id:"username"}).simulate("change", { currentTarget: { value: "supercoco" }})
        // wrapper.find({id:"password"}).simulate("change", { currentTarget: { value: "test" }})
//         // expect(wrapper.find({id:"username"}).text()).toBe('supercoco');
//         // expect(wrapper.find({id:"username"}).get(0).value).toBe('supercoco');
        
//         const handleSubmit = jest.spyOn(wrapper.instance(),'handleSubmit');
//         wrapper.find(".action>button").simulate("click");
//         expect(handleSubmit).toBeCalled();


//         // wrapper.find('button').simulate('click');
//         // console.log(wrapper.state().debug())
//         // expect(wrapper.state().num).toEqual(2)
//         // const onSubmitMock = jest.fn();
//         // const component = shallow(<Login name={"test"}/>);
//         // console.log(component.find({ id: "username" }).simulate('change', {target: {value: 'abcdefghijk'}}).debug());
//         // console.log(input);
//     //   const onSubmitMock = jest.fn();
  
//     //   const component = Enzyme.mount(
//     //     <ThemeProvider theme={themes.default}><Login onSubmit={onSubmitMock} /></ThemeProvider>
//     //   );
  
//     //   component.find("input.username").simulate('change', { target: { value: 'myUser' } })
//     //   component.find("input.password").simulate('change', { target: { value: 'myPassword' } })
//     //   component.find("form").simulate("submit");
  
//     //   console.log("onClickMock.mock", onSubmitMock.mock)
//     //   expect(onSubmitMock).toBeCalled()
//     });
//   });