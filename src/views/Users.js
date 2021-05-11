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
            modalEditOpen: false,
            modalDeleteOpen: false,
            idUser: null,
            currentRole: null,
            newRole: "user"
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
        this.handleCloseEdit = this.handleCloseEdit.bind(this);
        this.handleCloseDelete = this.handleCloseDelete.bind(this);
        this.handleClickOpenDelete = this.handleClickOpenDelete.bind(this);
        this.handleClickOpenEdit = this.handleClickOpenEdit.bind(this);

    }

    handleClickOpenEdit(id, role) {
        this.setState({modalEditOpen: true, idUser: id, currentRole: role});
        console.log(id);
    };

    handleCloseEdit() {
        this.setState({modalEditOpen: false});
    };

    handleClickOpenDelete() {
        this.setState({modalDeleteOpen: true});
    };

    handleCloseDelete() {
        this.setState({modalDeleteOpen: false});
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
                    this.handleCloseEdit();
                })
                .catch(function (erreur) {
                    console.log(erreur);
                });

        }
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
                    axios.get('http://localhost/Projet_TER/API/Controllers/utilisateur/lireUtilisateur.php')
                        .then(response => {
                            this.setState({users: response.data});
                        })
                        .catch(error => console.log(error))
                    this.handleCloseDelete();
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
                                     onClick={this.handleClickOpenEdit.bind(this, this.state.users[i]['ID_Utilisateur'], this.state.users[i]['Role'])}/>

                    <Dialog
                        open={this.state.modalEditOpen}
                        onClose={() => this.handleCloseEdit}
                    >
                        <DialogTitle>Modify role of this user : {this.state.users[i]['Pseudo']}</DialogTitle>
                        <DialogContent>
                            <FormControl>
                                <InputLabel>Role</InputLabel>
                                <Select className="select" onChange={this.handleChange.bind(this)} defaultValue="">
                                    <MenuItem value={"administrator"}>Administrator</MenuItem>
                                    <MenuItem value={"user"}>User</MenuItem>
                                    <MenuItem value={"super-admin"}>Super-administrator</MenuItem>
                                </Select>
                            </FormControl>
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={this.handleCloseEdit}>
                                Cancel
                            </Button>
                            <Button
                                onClick={this.edit.bind(this, this.state.newRole)}>
                                Ok
                            </Button>
                        </DialogActions>

                    </Dialog>


                    <FontAwesomeIcon icon={faTrashAlt}
                                     onClick={this.handleClickOpenDelete}/>

                    <Dialog
                        open={this.state.modalDeleteOpen}
                        onClose={() => this.handleCloseDelete}
                    >

                        <DialogContent>
                            <p>Are you sur about your choice ?</p>
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={this.handleCloseDelete}>
                                No
                            </Button>
                            <Button
                                onClick={this.delete.bind(this, this.state.users[i]['ID_Utilisateur'])}>
                                Yes
                            </Button>
                        </DialogActions>

                    </Dialog>
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

