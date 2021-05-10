import React from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEnvelope, faPen, faTrashAlt, faUser, faUserTag} from '@fortawesome/free-solid-svg-icons'
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {FormControl, InputLabel, MenuItem, Select,} from "@material-ui/core";

export class Users extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: null,
            modalOpen: false,
            idUser: null,
            currentRole: null,
            newRole: "user"
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
    }

    handleClickOpen(id, role) {
        this.setState({modalOpen: true, idUser: id, currentRole: role});
        console.log(id);
    };

    handleClose = () => {
        this.setState({modalOpen: false});
    };

    onRoleChange(event) {
        this.setState({newRole: event.target.value})
    }

    handleChange = (event) => {
        this.setState({newRole: event.target.value});
    };

    componentDidMount() {
        if (this.state.users === null) {
            axios.get('http://localhost/Projet_TER/API/Controllers/utilisateur/lireUtilisateur.php')
                .then(response => {
                    this.setState({users: response.data});
                })
                .catch(error => console.log(error))
        }
    };


    edit(role) {
        if (this.state.idUser !== null && role !== null) {
            let data = JSON.stringify({id_utilisateur: this.state.idUser, role: role});
            console.log(data);
            axios({
                method: 'put',
                url: 'http://localhost/Projet_TER/API/Controllers/utilisateur/modifierUtilisateur.php',
                data: data
            })
                .then(response => {
                    axios.get('http://localhost/Projet_TER/API/Controllers/utilisateur/lireUtilisateur.php')
                        .then(response => {
                            this.setState({users: response.data});
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

    delete = (id) => {
        if (id !== null) {
            let data = JSON.stringify({id: Number(id)});
            axios({
                method: 'delete',
                url: 'http://localhost/Projet_TER/API/Controllers/utilisateur/supprimerUtilisateur.php',
                data: data
            })
                .then(response => {
                    console.log(response)
                    if (response.status === 200) {
                        this.setState({
                            users: response.data
                        })
                    }
                })
                .catch(function (erreur) {
                    console.log(erreur);
                });
        }
    }


    chargeData() {
        let listItems = [];
        for (var i in this.state.users) {
            let child = [];
            child.push(<div key={i} className="row">
                <p>{this.state.users[i]['Pseudo']}</p>
                <p>{this.state.users[i]['Mail']}</p>
                <p>{this.state.users[i]['Role']}</p>

                <p>
                    <FontAwesomeIcon icon={faPen}
                                     onClick={this.handleClickOpen.bind(this, this.state.users[i]['ID_Utilisateur'], this.state.users[i]['Role'])}/>

                    <Dialog
                        open={this.state.modalOpen}
                        onClose={() => this.handleClose}
                    >
                        <DialogTitle>Changer le role de l'utilisateur {this.state.idUser}</DialogTitle>
                        <DialogContent>
                            <FormControl className="formControl">
                                <InputLabel>Role</InputLabel>
                                <Select className="select" onChange={this.handleChange.bind(this)} defaultValue="">
                                    <MenuItem value={"administrator"}>Administrator</MenuItem>
                                    <MenuItem value={"user"}>User</MenuItem>
                                    <MenuItem value={"super-admin"}>Super-administrator</MenuItem>
                                </Select>

                            </FormControl>
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={this.handleClose}>
                                Cancel
                            </Button>
                            <Button
                                onClick={this.edit.bind(this, this.state.newRole)}>
                                Ok
                            </Button>
                        </DialogActions>

                    </Dialog>


                    <FontAwesomeIcon icon={faTrashAlt}
                                     onClick={this.delete.bind(this, this.state.users[i]['ID_Utilisateur'])}/>
                </p>
            </div>)
            listItems.push(child);
        }
        return listItems;
    }

    render() {
        if (this.state.users === null) return (<p>Loading...</p>);
        else {
            console.log(this.state.users);
            return (
                <div className="Users">
                    <div className="header">
                        <p><FontAwesomeIcon icon={faUser}/>Username</p>
                        <p><FontAwesomeIcon icon={faEnvelope}/>Mail</p>
                        <p><FontAwesomeIcon icon={faUserTag}/>Role </p>
                    </div>
                    {this.chargeData()}
                </div>
            );
        }
    }
}

export default Users;

