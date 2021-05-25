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
import {hasAuthenticated} from "./services/AuthApi";
import Auth from "./contexts/Auth"
import AuthenticatedRoute from "./components/AuthenticatedRoute";

function App() {

    const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticated());
    //console.log(Auth.Provider);
    return (
        <Auth.Provider value={{isAuthenticated, setIsAuthenticated}}>
            <Router>
                <div className="App">
                    <Nav/>
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/quiz" exact component={Quiz}/>
                        <Route path="/summary" exact component={Summary}/>
                        <Route path="/manageTree" exact component={Tree}/>
                        <Route path="/manageUsers" exact component={Users}/>
                        <Route path="/login" exact component={Login}/>
                        <Route path="/register" exact component={Register}/>
                        <Route path="/fileUpload" exact component={FileUpload}/>
                        <AuthenticatedRoute path="/manageTree" component={Tree}/>
                        <AuthenticatedRoute path="/manageUsers" component={Users}/>
                        <AuthenticatedRoute path="/fileUpload" exact component={FileUpload}/>
                        {/*<AuthenticatedRoute path="/login" exact component={FileUpload}/>*/}
                        <Redirect to="/"/> {/* Redirect to home when invalid url */}
                    </Switch>
                </div>
                <Warning/>
            </Router>
        </Auth.Provider>
    )

}

export default App;
