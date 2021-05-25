import axios from 'axios';
import jwtDecode from "jwt-decode";
import {getItem, addItem, removeItem} from "./LocalStorage";

export function hasAuthenticated() {
    const token = getItem('token');
    const tokenIsValid = token ? tokenIsValid(token): false;

    if(false === tokenIsValid){
        removeItem('token');
    }
    return tokenIsValid;
}


export function  login(credentials){
    let protocol = window.location.protocol;
    let host = window.location.hostname;
    let url = protocol + '//' + host;
    return axios
        .post('http://localhost:80/Projet_TER/API/Controllers/connexion.php', credentials)
        .then(response =>response.data.token)
        .then(token =>{
            addItem('token');

            return true;
        });
}

export function logout(){
    removeItem('token');

}

function tokenIsValid(token){
    const {exp} = jwtDecode(token);

    return exp * 1000 > new Date().getTime();

}