import React from 'react';
import axios from 'axios';

import Issues from '../components/quiz/issues';
import Historic from '../components/quiz/historic';
import Method from '../components/quiz/method';


export class Quiz extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tree : null,
            checkedDecision: null,
            currentMethod: null,
            currentIssue: null,
            currentDecisions: [],
            historic: [],
            step: 0,
        };
        // this.componentDidMount = this.componentDidMount.bind(this);
    }

    // met a jour le questionnaire
    changeData = (nextIssueId, decision = null, allChoices = null, historic = true, editHistoric = false) => {
        // ID de la prochaine question
        this.setState({checkedDecision: decision});

        //  Vérifie si la décision renvoie une méthode
        let method = this.checkMethod(decision);
        if(method){
            this.manageMethod(decision, method);
        } else {
            // si ID prochaine question pas égal a 0 on récupère info
            if(nextIssueId != 0){
                // this.checkChoices(allChoices);
                if(allChoices){
                    let retry = allChoices.find(element => element == 0);
                    if(retry){
                        this.setState({
                            historic: [],
                            step: 0,
                        }, () => {
                            console.log("choix et 0")
                            this.manageStoreData(nextIssueId, decision, historic, editHistoric);
                        });
                    } else {
                        console.log("choix")
                        this.manageStoreData(nextIssueId, decision, historic, editHistoric);
                    }
                } else {
                    console.log("pas de choix")
                    this.manageStoreData(nextIssueId, decision, historic, editHistoric);
                }
                // setTimeout( () => {                 
                    // let issue = this.state.tree.criteres.find(critere => critere.ID_Critere === nextIssueId);
                    // let decisions =  this.state.tree.decisions.filter(decision => decision.ID_Critere_entrant === issue.ID_Critere);
                    // let oldIssue = this.state.currentIssue;
                    // this.setState({
                    //     currentIssue: issue,
                    //     currentDecisions: decisions,
                    //     step: this.state.step + 1
                    // }, () => {
                    //     if(historic){
                    //         this.manageHistoric(decision, oldIssue)
                    //     }
                    //     if(editHistoric){
                    //         let historicElement = {
                    //             issue: this.state.currentIssue,
                    //             decision: null
                    //         }
                    //         this.setState({historic: this.state.historic.concat(historicElement)});  
                    //     }
                    // });    
                // }, 1);      
            }else {
                alert("fini");
            }
        }
    }

    manageStoreData = (nextIssueId, decision, historic, editHistoric) => {
        let issue = this.state.tree.criteres.find(critere => critere.ID_Critere === nextIssueId);
        let decisions =  this.state.tree.decisions.filter(decision => decision.ID_Critere_entrant === issue.ID_Critere);
        let oldIssue = this.state.currentIssue;
        this.setState({
            currentIssue: issue,
            currentDecisions: decisions,
            step: this.state.step + 1
        }, () => {
            if(historic){
                this.manageHistoric(decision, oldIssue)
            }
            if(editHistoric){
                let historicElement = {
                    issue: this.state.currentIssue,
                    decision: null
                }
                this.setState({historic: this.state.historic.concat(historicElement)});  
            }
        });    
    }

    manageMethod = (decision, method) => {
        this.state.historic[this.state.historic.length - 1].decision = decision;
        let historicElement = {
            method: method,
        }
        this.setState({historic: this.state.historic.concat(historicElement)}); 
    }

    checkMethod = (decision) => {
        if(decision){
            let method = this.state.tree.methodes.find(methode => methode.ID_Decision === decision.ID_Decision);
            if(method){
                this.setState({currentMethod: method});
                return method;
            }
        }
    }

    checkChoices = (choices) => {
        if(choices){
            choices.forEach(element => {
                if(element == 0){
                    this.setState({
                        historic: [],
                        checkedDecision: "blabla",
                        step: 0,
                    }, () => {
                        console.log(this.state);
                        return true;
                    });
                }
            })
        }
    }

    backOut = (ID, type) => {
        if(type == 'issue'){
            if(this.state.currentMethod){
                this.setState({currentMethod: null}, () => {
                    this.test(ID);
                })
            } else {
                this.test(ID);
            }
        } else {
            // let index =  this.state.historic.indexOf(this.state.historic.find(el => el.method.ID_Methode === ID));
            console.log(this.state.historic);
            alert("methode")
        }
    }

    test = (ID) => {
        let index;
        this.changeData(ID, null, null, false);
        this.state.historic.forEach(element => {
            if('issue' in element){
                if(element.issue.ID_Critere === ID){
                    index = this.state.historic.indexOf(element);
                }
            }
        });
        // let index =  this.state.historic.indexOf(this.state.historic.find(el => el.issue.ID_Critere === ID));
        this.state.historic.length = index + 1;
        this.state.historic[index].decision = null;
        this.setState({step: index + 1});
    }

    manageHistoric = (decision = null, oldIssue) => {
        if(!this.state.currentMethod && this.state.historic){
            let condition = this.state.historic.find(el => el.issue.ID_Critere === oldIssue.ID_Critere);
            if(condition){condition.decision = decision;}
            console.log(this.state)
            let historicElement = {
                issue: this.state.currentIssue,
                decision: null
            }
            this.setState({historic: this.state.historic.concat(historicElement)}, () => console.log(this.state));  
        }  
    }

    resumeQuiz = () => {
        this.setState({currentMethod: null}, () => {
            this.changeData(this.state.checkedDecision.ID_Critere_sortant, null, null, false, true);
        });
    }

    componentDidMount(){
        let protocol = window.location.protocol;
        let host = window.location.hostname;
        let url = protocol + '//' + host;

        if(!this.state.tree){
            axios.get(url + '/reactTest/MATUI/API/Controllers/lireArbre.php')
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
                {this.state.currentMethod
                    ? <Method method={this.state.currentMethod}
                        checkedDecision={this.state.checkedDecision}
                        changeData={this.changeData}  
                        resumeQuiz={this.resumeQuiz} 
                        historic={this.state}
                    />
                    :<Issues issue={this.state.currentIssue} 
                        decisions={this.state.currentDecisions} 
                        changeData={this.changeData}
                        step={this.state.step}
                    />
                }
                <Historic historic={this.state.historic} 
                    backOut={this.backOut}
                />
            </div>
        );
    }
}


export default Quiz;
