import React, {useContext} from 'react';
import Auth from "../contexts/Auth";
import {Redirect, Route} from "react-router-dom";

const AuthenticatedRoute = ({path, component}) => {
    const {isAuthenticated} = useContext(Auth);
    return isAuthenticated ? (<Route path={path} component={component}/>) : (<Redirect to="/login"/>)
}
export default AuthenticatedRoute;