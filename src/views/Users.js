import React from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEnvelope, faPen, faTrashAlt, faUser, faUserTag} from '@fortawesome/free-solid-svg-icons'
import ModalEditRole from "../components/modal/ModalEditRole";
import ModalDeleteUser from "../components/modal/ModalDeleteUser";
import Loader from "../components/Loader";

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
        this.setState({modalEditOpen: true, idUser: id, currentRole: role}, function () {
            console.log(this.state.modalEditOpen);
            console.log(this.state.modalDeleteOpen);
        });

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

    handleChange(role) {
        this.setState({newRole: role});
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
                    console.log(response)
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
                    console.log(response)
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
        for (let i in this.state.users) {
            if (this.state.users.hasOwnProperty(i)) {
                let child = [];
                child.push(<div key={i} className="row">
                    <p>{this.state.users[i]['Pseudo']}</p>
                    <p>{this.state.users[i]['Mail']}</p>
                    <p>{this.state.users[i]['Role']}</p>

                    <FontAwesomeIcon icon={faPen}
                                     onClick={this.handleClickOpenEdit.bind(this, this.state.users[i]['ID_Utilisateur'], this.state.users[i]['Role'])}/>

                    <ModalEditRole
                        title={this.state.users[i]['Pseudo'] + " is currently " + this.state.users[i]['Role']}
                        message="New role : "
                        actionButton="Confirm"
                        closeButton="Quit"
                        open={this.state.modalEditOpen}
                        close={this.handleCloseEdit}
                        mainAction={this.edit.bind(this)}
                        changeAction={this.handleChange.bind(this)}
                        mainActionParameters={this.state.newRole}
                    />

                    <FontAwesomeIcon icon={faTrashAlt} onClick={this.handleClickOpenDelete}/>


                    <ModalDeleteUser
                        title="Warning"
                        message="Are you sure you want to delete this user ?"
                        actionButton="Yes"
                        closeButton="No"
                        open={this.state.modalDeleteOpen}
                        close={this.handleCloseDelete}
                        mainAction={this.delete.bind(this)}
                        mainActionParameters={this.state.users[i]['ID_Utilisateur']}
                    />

                </div>)
                listItems.push(child);
            }
        }
        return listItems;
    }

    render() {
        if (this.state.users === null) return (<Loader/>);
        else {
            console.log(this.state.users);
            return (
                <div className="Users">
                    <div className="header">
                        <p><FontAwesomeIcon icon={faUser}/>Username</p>
                        <p><FontAwesomeIcon icon={faEnvelope}/>Mail</p>
                        <p><FontAwesomeIcon icon={faUserTag}/>Role</p>
                    </div>
                    {this.chargeData()}
                </div>
            );
        }
    }
}

export default Users;

