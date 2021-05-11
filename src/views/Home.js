import React from 'react';
import logo from '../public/logothedre.png';
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen} from "@fortawesome/free-solid-svg-icons";

export default class Home extends React.Component { // Tell webpack this JS file uses this image


    constructor(props) {
        super(props);
        this.state = {
            description: null
        }
    }

    componentDidMount() {
        if (this.state.description === null) {
            axios.get('http://localhost/Projet_TER/API/Controllers/accueil/lire.php')
                .then(response => {
                    this.setState({description: response.data['description']});
                })
                .catch(error => console.log(error))
        }
    };

    render() {
        if (this.state.description === null) return (<p>Loading...</p>);
        else return (
            <div className="Home">
                <div className="Logo">
                    <img src={logo} alt={'Logo Thedre'}/>
                </div>
                <div className="Accueil">
                    <h3> Contents <FontAwesomeIcon icon={faPen}/></h3>
                    <p>{this.state.description}</p>
                </div>
            </div>
        );
    }
}

