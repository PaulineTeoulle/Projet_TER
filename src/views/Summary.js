import React from 'react';
import DropMethodCard from '../components/quiz/DropMethodCard';
import axios from "axios";

export class Summary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            retainedMethods: null,
            resume: null,
            amount: null,
            endMessage: null
        };
    }

    goToHome = () => {
        this.props.history.push({
            pathname: '/home'
        })
    }

    componentDidMount() {
        if (this.props.location.state.retainedMethods.length) {
            this.setState({
                retainedMethods: this.props.location.state.retainedMethods,
                amount: this.props.location.state.retainedMethods.length
            });
        } else {
            this.setState({amount: 0});
        }
        if (this.state.endMessage === null) {
            let protocol = window.location.protocol;
            let host = window.location.hostname;
            let url = protocol + '//' + host;
            axios.get(url + '/reactTest/MATUI/API/Controllers/sortie/lireSortie.php')
                .then(response => {
                    this.setState({endMessage: response.data['message']})
                })
                .catch(error => console.log(error))

        }
    };

    render() {
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
                    {this.state.endMessage ?
                        <div className="messageCard">
                            <p>{this.state.endMessage}</p>
                        </div>
                        :
                        <p></p>
                    }

                    <button onClick={this.goToHome} className="button filled">Finish</button>
                </div>
            </div>
        );
    }
}


export default Summary;
