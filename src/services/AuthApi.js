import axios from 'axios';
import jwt_decode from "jwt-decode";
import {getItem, addItem, removeItem} from "./LocalStorage";

export function hasAuthenticated() {
    const token = getItem('token');
    const result = token ? tokenIsValid(token) : false;

    console.log(result);
    if (false === result) {
        removeItem('token');
    }
    return result;
}


export function login(credentials) {
    let protocol = window.location.protocol;
    let host = window.location.hostname;
    let url = protocol + '//' + host;
    return axios
        .post(url + '/Projet_TER/API/Controllers/connexion.php', credentials)
        .then(response => response.data.token)
        .then(token => {
            addItem('token', token);
            return true;
        });
}

export function logout() {
    removeItem('token');
}

function tokenIsValid(token) {

    const decoded = jwt_decode(token);
    const exp = decoded['exp']
    console.log(exp);
    return exp * 1000 > new Date().getTime();

}