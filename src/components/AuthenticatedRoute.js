import React, {useContext} from 'react';
import Auth from "../contexts/Auth";
import {Redirect, Route} from "react-router-dom";

const AuthenticatedRoute = ({path, component}) => {
    const {isAuthenticated} = useContext(Auth);
    const {userRole} = useContext(Auth);
    if(isAuthenticated){
        switch(userRole){
            case 'user':
                // accès a rien
                return <Redirect to="/"/>
            case 'administrator':
                // accès a l'arbre uniquement
                if(path === '/manageTree' || path === '/fileUpload'){
                    return <Route path={path} component={component}/> 
                } else {
                    return <Redirect to="/"/>
                }
            case 'super-admin':
                // accès a tout
                return <Route path={path} component={component}/> 
        }
    } else {
        return <Redirect to="/login"/>
    }
}
export default AuthenticatedRoute; 