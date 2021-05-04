import React from 'react';
import axios from 'axios';

import Issues from '../components/quiz/issues';
import Historic from '../components/quiz/historic';

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

    changeData = (nextIssueId, decision = null) => {
        // next issue ID in element
        if(nextIssueId != 0){
            let issue = this.state.tree.criteres.find(critere => critere.ID_Critere === nextIssueId);
            let decisions =  this.state.tree.decisions.filter(decision => decision.ID_Critere_entrant === issue.ID_Critere);
            this.setState({currentIssue: issue});
            this.setState({currentDecisions: decisions});
            this.setState({step: this.state.step + 1});

            if(decision){
                let historicElement = {
                    issue: this.state.currentIssue,
                    decision: decision
                }
                this.setState({historic: this.state.historic.concat(historicElement)});
            }
        }else {
            alert("fini");
        }
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
    };

    render(){
        return (
            <div className="Quiz">
                <Issues issue={this.state.currentIssue} 
                    decisions={this.state.currentDecisions} 
                    changeData={this.changeData}
                    step={this.state.step}
                />
                <Historic historic={this.state.historic}/>
            </div>
        );
    }
}


export default Quiz;
