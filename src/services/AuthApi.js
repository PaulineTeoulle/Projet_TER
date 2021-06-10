import axios from 'axios';
import jwt_decode from "jwt-decode";
import {addItem, getItem, removeItem} from "./LocalStorage";

//Vérifie la connexion avec le token
export function hasAuthenticated() {
 
    const token = getItem('token');
    const result = token ? tokenIsValid(token) : false;
    if (false === result) {
        removeItem('token');
    }
    return result;
}

export function isUser(){
    const token = getItem('token');
    const result = token ? tokenIsValid(token) : false;
    if (false === result) {
        removeItem('token');
        return false;
    }
    if(true === result) {
        return getRole(token);
    }
    return false;
}

//Récup du role du token décodé
export function getRole(token){
    const tokenResult = decodeToken(token);
    return tokenResult['user_role'];
}

//Récupération du token + mise en localStorage
export function login(credentials) {
    let protocol = window.location.protocol;
    let host = window.location.hostname;
    let url = protocol + '//' + host;
    return axios
        .post(url + '/reactTest/MATUI/API/Controllers/connexion.php', credentials)
        .then(response => response.data.token)
        .then(token => {
            if(token !== undefined){
                addItem('token', token);
                return true;
            }
            else return false;
        });
}
//Supprime le token du localSTorage
export function logout() {
    removeItem('token');
}

//Verifie validité du token (avec temps d'expiration)
function tokenIsValid(token) {
    const decoded = jwt_decode(token);
    const exp = decoded['exp']
    return exp * 1000 > new Date().getTime();
}

//Traduit le token pour récupérer les infos
function decodeToken(token){
    return jwt_decode(token);
}