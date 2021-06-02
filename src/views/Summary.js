import React from 'react';
import DropMethodCard from '../components/quiz/DropMethodCard';

export class Summary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            retainedMethods: null,
            resume: null,
            amount: null
        };
    }

    goToHome = () => {
        this.props.history.push({
            pathname: '/home'
        })      
    }

    componentDidMount(){
        if(this.props.location.state.retainedMethods.length){
            console.log("methond retenu")
            this.setState({
                retainedMethods: this.props.location.state.retainedMethods,
                amount: this.props.location.state.retainedMethods.length
            });
        } else {
            this.setState({ amount: 0});
            console.log("pas de methond retenu")
        }
    };

    render(){
        return (
            <div className="Summary">
                <div>
                    <h3>You have retained {this.state.amount} method{this.state.amount > 1 ? "s" : ""}</h3>
                {this.state.retainedMethods ? 
                    <ul>
                        {this.state.retainedMethods.map((element, i) => {   
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
                    <p></p>
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
