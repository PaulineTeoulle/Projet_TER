import React from 'react';
import DropMethodCard from '../components/quiz/DropMethodCard';

export class Summary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            historic: null,
            resume: null,
            amount: null
        };
    }

    pullResume = () => {
        console.log(this.state.historic)
        let historic = this.state.historic;
        let resume = [];
        historic.forEach(element => {
            if('method' in element){
                if(element.checked){
                    resume.push(element);
                }
            }
        });
        let amount = resume.length ? resume.length : 0
        this.setState({
            resume: resume,
            amount : amount
        });
    }

    goToHome = () => {
        this.props.history.push({
            pathname: '/home'
        })      
    }

    componentDidMount(){
        if(this.props.location.state){
            this.setState({historic: this.props.location.state.historic},() =>{this.pullResume()});
        }
    };

    render(){
        return (
            <div className="Summary">
                <div>
                    <h3>You have retained {this.state.amount} method{this.state.amount > 1 ? "s" : ""}</h3>
                {this.state.resume ? 
                    <ul>
                        {this.state.resume.map((element, i) => {   
                                return (
                                    <li key={i}>
                                        <DropMethodCard method={element.method}
                                        id={i + 1}
                                        />
                                    </li>
                                ) 
                            })}
                    </ul>
                    :
                    <p>aucune data</p>
                }
                </div>
                <div>
                    <div className="messageCard">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    </div>
                    <button onClick={this.goToHome} className="button filled">Finish</button>    
                </div>
            </div>
        );
    }
}


export default Summary;
