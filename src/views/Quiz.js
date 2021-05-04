import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Issues from '../components/quiz/issues';
import Historic from '../components/quiz/historic';
import { createPortal } from 'react-dom';

export class Quiz extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tree : null,
            currentIssue: null,
            currentDecisions: [],
            historic: [],
            step: 0,
        };
        // this.componentDidMount = this.componentDidMount.bind(this);
    }

    changeData = (nextIssueId) => {
        // next issue ID in element
        console.log(this.state)
        let issue = this.state.tree.criteres.find(critere => critere.ID_Critere == nextIssueId);
        let decisions =  this.state.tree.decisions.filter(decision => decision.ID_Critere_entrant == issue.ID_Critere);
        this.setState({currentIssue: issue});
        this.setState({currentDecisions: decisions});
        this.setState({step: this.state.step + 1});
    }

    componentDidMount(){
        if(!this.state.tree){
            axios.get('http://localhost/reactTest/MATUI/API/Controllers/lireArbre.php')
            .then(response => {
                this.setState({tree: response.data});
                this.changeData(response.data.entree[0].ID_Critere);
            })
            .catch(error => console.log(error))
        }
        // console.log( this.state.tree)
    };
    // const [tree, setTree] = useState();
    // const [currentIssue, setCurrentIssue] = useState();
    // const [currentDecisions, setCurrentDecisions] = useState()
    // const [historic, setHistoric] = useState();

    // function changeData(nextIssueId){
    //     // next issue ID in element
    //     console.log("tree " + tree)
    //     let issue = tree.criteres.find(critere => critere.ID_Critere == nextIssueId);
    //     let decisions = tree.decisions.filter(decision => decision.ID_Critere_entrant == issue.ID_Critere);
    //     setCurrentIssue(issue);
    //     setCurrentDecisions(decisions);
    // }

    // useEffect(() => {
    //     if(!tree){
    //         axios.get('http://localhost/reactTest/MATUI/API/Controllers/lireArbre.php')
    //         .then(response => {
    //             setTree(response.data);
    //             changeData(response.data.entree[0].ID_Critere);
                // const firstNode = response.data.criteres.find(element => element.ID_Critere == response.data.entree[0].ID_Critere);
                // setCurrentIssue(firstNode);

                // const decisions = response.data.decisions.filter(element => element.ID_Critere_entrant == firstNode.ID_Critere);
                // setCurrentDecisions(decisions);
                // console.log(decisions)
    //         })
    //         .catch(error => console.log(error))
    //     }
    //     console.log(tree)
    // });

    render(){
        return (
            <div className="Quiz">
                <Issues issue={this.state.currentIssue} 
                    decisions={this.state.currentDecisions} 
                    changeData={this.changeData}
                    step={this.state.step}
                />
                <Historic/>
            </div>
        );
    }
}


export default Quiz;
