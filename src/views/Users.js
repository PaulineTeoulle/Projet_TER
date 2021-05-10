import React from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEnvelope, faPen, faTrashAlt, faUser, faUserTag} from '@fortawesome/free-solid-svg-icons'

export class Users extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: null,
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        if (this.state.users === null) {
            axios.get('http://localhost/Projet_TER/API/Controllers/utilisateur/lireUtilisateur.php')
                .then(response => {
                    this.setState({users: response.data});
                })
                .catch(error => console.log(error))
        }
    };


    edit(id, role) {


        alert(id + " " + role);
    }

    delete = (id) => {
        if (id !== null) {
            let data = JSON.stringify({id: Number(id)});
            console.log(data);
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
                                     onClick={this.edit.bind(this, this.state.users[i]['ID_Utilisateur'], this.state.users[i]['Role'])}/>
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

