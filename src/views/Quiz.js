import React from 'react';
import axios from 'axios';

import Issues from '../components/quiz/issues';
import Historic from '../components/quiz/historic';
import Method from '../components/quiz/method';


export class Quiz extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tree: null,
            checkedDecision: null,
            currentMethod: null,
            currentIssue: null,
            retainedMethods: [],
            currentDecisions: [],
            historic: [],
            step: 0        
        };
        // this.componentDidMount = this.componentDidMount.bind(this);
    }

    // met a jour le questionnaire
    // historic : met a jour l'historique normalement
    // editHistoric : met a jour artificiellement quand on est sur une méthode (arret du flux)
    changeData = async (nextIssueId, decision = null, allChoices = null, historic = true, editHistoric = false) => {
        // ID de la prochaine question
        this.setState({checkedDecision: decision});

        //  Vérifie si la décision renvoie une méthode
        let method = this.checkMethod(decision);

        if(method){
            this.manageMethod(decision, method);
        } else {
            // si ID prochaine question pas égal a 0 on récupère info
            if(nextIssueId !== 0){
                if(allChoices){
                    // si on est sur le critère de fin et qu'on continue, on reinitialise l'historique
                    let restart;
                    allChoices.forEach(element => {
                        let decision = this.state.tree.decisions.find(el => el.ID_Decision === element);
                        if(decision.ID_Critere_sortant === 0){
                            // on détecte le critère de fin quand une des décision a un critère sortant null
                            restart = true;
                        }
                    });
                    if(restart){
                        this.addRetainedMethods();
                        this.setState({
                            historic: [],
                            step: 0,
                        }, () => {
                            // quand on conitnu a la fin du questionnaire
                            this.manageStoreData(nextIssueId, decision, historic, editHistoric);
                        });
                    } else {
                        // quand on répond au critère (comportement de base)
                        this.manageStoreData(nextIssueId, decision, historic, editHistoric);
                    }
                } else {
                    // quand on sort d'une méthode (pas de choix fait)
                    this.manageStoreData(nextIssueId, decision, historic, editHistoric);
                }
            }else {
                // quand on sort du questionnaire
                await this.addRetainedMethods();         
                this.props.history.push({
                    pathname: '/summary',
                    state: { retainedMethods: this.state.retainedMethods }
                })            
            }
        }
    }

    manageStoreData = (nextIssueId, decision, historic, editHistoric) => {
        // on va chercher la prochaine question et réponses
        let issue = this.state.tree.criteres.find(critere => critere.ID_Critere === nextIssueId);
        let decisions =  this.state.tree.decisions.filter(decision => decision.ID_Critere_entrant === issue.ID_Critere);
        let oldIssue = this.state.currentIssue;
        this.setState({
            currentIssue: issue,
            currentDecisions: decisions,
            step: this.state.step + 1
        }, () => {
            // on met a jour l'historique
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

    // on ajoute la méthode dans l'historique
    manageMethod = (decision, method) => {
        let newHistoric = this.state.historic.slice();
        newHistoric[newHistoric.length - 1].decision = decision;
        this.setState({historic: newHistoric}); 

        let historicElement = {
            method: method,
            checked: false
        }
        this.setState({historic: this.state.historic.concat(historicElement)}); 
    }

    checkedMethod = (method, checked) => {
        let index;
        this.state.historic.forEach(element => {
            if('method' in element){
                if(element.method.ID_Methode === method.ID_Methode){
                    index = this.state.historic.indexOf(element);
                }
            }
        });
        let historicElement = {
            method: method,
            checked: checked
        }
        let newHistoric = this.state.historic.slice();
        newHistoric[index] = historicElement;
        this.setState({historic: newHistoric}); 
    }

    // on regarde si une méthode est associé a la décision prise
    checkMethod = (decision) => {
        if(decision){
            let method = this.state.tree.methodes.find(methode => methode.ID_Decision === decision.ID_Decision);
            if(method){
                this.setState({currentMethod: method});
                return method;
            }
        }
    }

    // ajoute les méthodes retenu lors du précédent passage
    // se produit lorsque on restart le questionnaire
    addRetainedMethods = () => {
        return new Promise((resolve,reject)=>{
            let methods = [];
            this.state.historic.forEach(element => {
                if('method' in element){
                    if(element.checked){
                        if(this.state.retainedMethods.length){
                            let exist =  this.state.retainedMethods.filter(retainedMethod => retainedMethod.method.ID_Methode === element.method.ID_Methode);
                            if(!exist.length){
                                methods.push(element);
                            }
                        } else {
                            console.log("PAR LA")
                            methods.push(element);
                        }
                    }
                }
            });
            console.log(methods)
        this.setState({retainedMethods: this.state.retainedMethods.concat(methods)}, () => resolve()); 
        });
    }

    // on retourne dans l'historique 
    backOut = (ID, type) => {
        // si on retroune a une question
        if(type === 'issue'){
            // si au moment ou on retourne on est sur une méthode
            if(this.state.currentMethod){
                this.setState({currentMethod: null}, () => {
                    this.backIssue(ID);
                })
            } else {
                this.backIssue(ID);
            }
        } else {
            // si on retourne a une méthode
            // let index =  this.state.historic.indexOf(this.state.historic.find(el => el.method));
            let index;
            this.state.historic.forEach(element => {
                if('method' in element){
                    if(element.method.ID_Methode === ID){
                        index = this.state.historic.indexOf(element);
                    }
                }
            });
            let decisionBeforeMethod = this.state.historic[index - 1].decision;   
            this.state.historic.length = index;
            this.setState({step: index});
            this.changeData(decisionBeforeMethod.ID_Critere_sortant, decisionBeforeMethod, null, false);
        }
    }

    // on rebind les bonne data en fonction de l'ID du critère sélectionné dans l'historique
    backIssue = (ID) => {
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

    // on gère l'historique
    manageHistoric = (decision = null, oldIssue) => {
        // si nous ne somme aps sur une méthode
        this.state.historic.forEach(element => {
            if('issue' in element){
                if(element.issue.ID_Critere === oldIssue.ID_Critere){
                    element.decision = decision;
                }
            }
        });

        // on ajoute le nouveau critère sans décision dans l'historique
        let historicElement = {
            issue: this.state.currentIssue,
            decision: null
        }
        this.setState({historic: this.state.historic.concat(historicElement)}); 
    }

    // on reprend le questionnaire la ou on en était depuis une méthode
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
            //axios.get(url + '/reactTest/MATUI/API/Controllers/lireArbre.php')
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
                        checkedMethod={this.checkedMethod}
                        historic={this.state}
                    />
                    :<Issues issue={this.state.currentIssue} 
                        decisions={this.state.currentDecisions} 
                        changeData={this.changeData}
                        step={this.state.step}
                    />
                }
                
                <div className="aside">
                    <Historic historic={this.state.historic} 
                        backOut={this.backOut}
                    />

                    {this.state.retainedMethods.length ?
                        <div className="retainedMethods">  
                         <div className="retainedMethods-header">
                            <h3>Retained methods</h3>
                        </div>              
                            {this.state.retainedMethods.map((element, i) => {   
                                return(<div key={i}>
                                    <p>{element.method.Libelle}</p>
                                </div>)
                            })}
                        </div>
                        : <div></div>
                    }
                </div>
            </div>
        );
    }
}


export default Quiz;
