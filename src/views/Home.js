import React from 'react';
import Loader from '../components/Loader'
import logo from '../public/logothedre.png';
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen} from "@fortawesome/free-solid-svg-icons";
import ModalEditHome from "../components/modal/ModalEditHome";

export default class Home extends React.Component { // Tell webpack this JS file uses this image


    constructor(props) {
        super(props);
        this.state = {
            description: null,
            modalOpen: false,
            newDescription: null,

        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this.edit = this.edit.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);

    }

    componentDidMount() {
        let protocol = window.location.protocol;
        let host = window.location.hostname;
        let url = protocol + '//' + host;

        if (this.state.description === null) {
            axios.get(url + '/Projet_TER/API/Controllers/accueil/lire.php')
                .then(response => {
                    this.setState({description: response.data['description']});
                })
                .catch(error => console.log(error))
        }
    };

    handleOpen() {
        this.setState({modalOpen: true});
    };

    handleClose = () => {
        this.setState({modalOpen: false});
    };

    handleChange(description) {
        this.setState({newDescription: description});
    };

    edit() {
        if (this.state.newDescription !== null) {
            let data = JSON.stringify({description: this.state.newDescription});
            axios({
                method: 'put',
                url: 'http://localhost/Projet_TER/API/Controllers/accueil/modifier.php',
                data: data
            })
                .then(response => {
                    axios.get('http://localhost/Projet_TER/API/Controllers/accueil/lire.php')
                        .then(response => {
                            this.setState({description: response.data['description']});
                        })
                        .catch(error => console.log(error))
                    this.handleClose();
                })
                .catch(function (erreur) {
                    console.log(erreur);
                });

        }
        this.handleClose();
    }


    render() {
        if (this.state.description === null) return (<Loader/> );
        else return (
            <div className="Home">
                <div className="logo">
                    <img src={logo} alt={'Logo Thedre'}/>
                </div>
                <div className="content">
                    <h3> Contents <FontAwesomeIcon icon={faPen} onClick={this.handleOpen}/></h3>
                    <ModalEditHome
                        title="Modify description"
                        message="Please modify"
                        oldDescription={this.state.description}
                        actionButton="Confirm"
                        closeButton="Quit"
                        open={this.state.modalOpen}
                        close={this.handleClose}
                        mainAction={this.edit.bind(this)}
                        changeAction={this.handleChange.bind(this)}
                    />
                    <p>{this.state.description}</p>
                </div>
            </div>
        );
    }
}

