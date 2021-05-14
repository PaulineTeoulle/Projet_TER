import React from 'react';
import logo from '../public/logothedre.png';
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen} from "@fortawesome/free-solid-svg-icons";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {TextField} from "@material-ui/core";

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

    handleChange = (event) => {
        this.setState({newDescription: event.target.value});
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
        if (this.state.description === null) return (<p>Loading...</p>);
        else return (
            <div className="home">
                <div className="logo">
                    {<img src={logo} alt={'Logo Thedre'}/>}
                </div>
                <div className="content">
                    <h3> Contents <FontAwesomeIcon icon={faPen} onClick={this.handleOpen}/></h3>
                    <Dialog className="dialog"
                            open={this.state.modalOpen}
                            onClose={() => this.handleClose}
                    >
                        <DialogTitle className="dialogTitle">Modify home content</DialogTitle>
                        <DialogContent className="dialogContent">
                            <TextField className="textField"
                                       id="outlined-multiline-static"
                                       label="Description"
                                       multiline
                                       rows={10}
                                       defaultValue={this.state.description}
                                       variant="outlined"
                                       onChange={this.handleChange}
                            />
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={this.handleClose}>
                                Cancel
                            </Button>
                            <Button
                                onClick={this.edit}>
                                Ok
                            </Button>
                        </DialogActions>

                    </Dialog>
                    <p>{this.state.description}</p>
                </div>
            </div>
        );
    }
}

