import React, {useContext, useState} from 'react';
import 'regenerator-runtime/runtime';
import {render, screen, cleanup} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { shallow, configure, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Summary from "../src/views/Summary";
import DropMethodCard from "../src/components/quiz/DropMethodCard";

configure({ adapter: new Adapter() });

const retainedMethods = [
    {
        id: 1,
        Libelle: "M1: Social Probes, technical probes",
        Description: "desc",
        Effectif_preconise: "10",
        Donnees_produites: "Audio, video",
        Type_methode: "Annotations",
        Type_analyse: "quantitative",
        Exemple: "M1 Exemple"
    },
    {
        id: 2,
        Libelle: "M2: Observations in situ",
        Description: "desc",
        Effectif_preconise: "6",
        Donnees_produites: "Audio, video",
        Type_methode: "Annotations",
        Type_analyse: "qualitative",
        Exemple: "M2 Exemple"
    }
]


describe("- Summary render Page -", () => {
    const summary = shallow(<Summary retainedMethods={retainedMethods}/>);

    it('renders the summary page', () => {
        summary.setState({
            retainedMethods: retainedMethods,
        });
        expect(summary.find("ul").children()).toHaveLength(retainedMethods.length);
    });

    it('methods number', () => {
        const title = summary.find("h3");
        const number = parseInt(title.text().charAt(18));
        expect(number).toBe(retainedMethods.length);
    });

    const firstItem = summary.find("ul").children().first().children();
    const itemId = firstItem.prop('id');
    const method = retainedMethods.find(item => item.id === itemId);
    

    it('drop card correct value', () => {
        const dropMethodCard = shallow(<DropMethodCard method={method}/>);
        expect(dropMethodCard.find("h3").text()).toBe(method.Libelle);
    });

    it('drop card is correctly stylled ', () => {        
        // render(
        //     <DropMethodCard method={method}/>
        // )
        // const dropMethodCardElement = document.getElementsByClassName("methodCard")
        // const style = window.getComputedStyle(dropMethodCardElement[0]);
        // console.log(style.height)
    });


    it('redirect to home', () => {
        // const goToHome = jest.spyOn(summary.instance(),'goToHome');
        // const button = summary.find("button");
        // expect(button).toHaveLength(1);

        // button.simulate('click');
        // button.props().onClick();
        // button.prop('onClick')();
        // button.at(0).simulate("click");
        // expect(goToHome).toHaveBeenCalled();
    });
});

