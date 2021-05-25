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

//Vérifie le role admin du token
export function isAdminRole(){
    const token = getItem('token');
    const result = token ? tokenIsValid(token) : false;
    if (false === result) {
        removeItem('token');
        return false;
    }
    if(true === result) {
       const role = getRole(token);
       if (role ==="administrator"){
           return true;
       }
    }
    return false;
}
//Vérifie le role user du token
export function isUserRole(){
    const token = getItem('token');
    const result = token ? tokenIsValid(token) : false;
    if (false === result) {
        removeItem('token');
        return false;
    }
    if(true === result) {
        const role = getRole(token);
        if (role ==="user"){
            return true;
        }
    }
    return false;
}

//Vérifie le role superAdmin du token
export function isSuperAdminRole(){
    const token = getItem('token');
    const result = token ? tokenIsValid(token) : false;
    if (false === result) {
        removeItem('token');
        return false;
    }
    if(true === result) {
        const role = getRole(token);
        if (role ==="super-admin"){
            return true;
        }
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
        .post(url + '/Projet_TER/API/Controllers/connexion.php', credentials)
        .then(response => response.data.token)
        .then(token => {
            addItem('token', token);
            return true;
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