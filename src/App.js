import './App.scss';
import React, {useState} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';

import Home from './views/Home';
import Quiz from './views/Quiz';
import Tree from './views/Tree';
import Users from './views/Users';
import FileUpload from './views/FileUpload';
import Summary from './views/Summary';
import Warning from './components/Warning'
import Login from './views/Login';
import Register from './views/Register';
import Nav from './components/Nav';
import Auth from "./contexts/Auth"
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import {hasAuthenticated, isAdminRole} from "./services/AuthApi";

function App() {

    //Setup des états selon les setters
    const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticated());
    const [isAdmin, setIsAdmin] = useState(isAdminRole());
    const [isUser, setIsUser] = useState(isAdminRole());
    const [isSuperAdmin, setIsSuperAdmin] = useState(isAdminRole());

    return (
        //Provider pour distribuer les états à tous les niveaux
        <Auth.Provider value={{isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin,isUser,setIsUser,isSuperAdmin,setIsSuperAdmin}}>
            <Router>
                <div className="App">
                    <Nav/>
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/quiz" exact component={Quiz}/>
                        <Route path="/summary" exact component={Summary}/>
                        <Route path="/login" exact component={Login}/>
                        <Route path="/register" exact component={Register}/>
                        <AuthenticatedRoute path="/manageTree" component={Tree}/>
                        <AuthenticatedRoute path="/manageUsers" component={Users}/>
                        <AuthenticatedRoute path="/fileUpload" exact component={FileUpload}/>
                        <Redirect to="/"/> {/* Redirect to home when invalid url */}
                    </Switch>
                </div>
                <Warning/>
            </Router>
        </Auth.Provider>
    )
}

export default App;
