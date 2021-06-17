import * as React from 'react'
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom/extend-expect';
import { shallow, configure } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Summary from "../src/views/Summary";
import Home from "../src/views/Home";
import Login from "../src/views/Login";
import Register from "../src/views/Register";
import Issues from "../src/components/quiz/issues";



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

const issue = {
    id: 1,
    Libelle: "Activable component ?",
    Informations : "more informations"
}

const decisions = [
    {
        ID_Decision: "1",
        ID_Critere_sortant: "1",
        ID_Critere_sortant: "2",
        Libelle: "yes"
    },
    {
        ID_Decision: "1",
        ID_Critere_sortant: "1",
        ID_Critere_sortant: "4",
        Libelle: "no"
    }
]


describe('view renderer', () => {
    it('should render correctly Summary', () => {
        const output = shallow(<Summary retainedMethods={retainedMethods}/>);
        expect(shallowToJson(output)).toMatchSnapshot();
    });

    it('should render correctly Home', () => {
        const output = shallow(<Home/>);
        expect(shallowToJson(output)).toMatchSnapshot();
    });

    it('should render correctly Login', () => {
        const output = shallow(<Login/>);
        expect(shallowToJson(output)).toMatchSnapshot();
    });

    it('should render correctly Register', () => {
        const output = shallow(<Register/>);
        expect(shallowToJson(output)).toMatchSnapshot();
    });

    it('should render correctly Issues', () => {
        const output = shallow(<Issues decisions={decisions} issue={issue} step={1}/>);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});