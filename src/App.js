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
import {hasAuthenticated, isUser} from "./services/AuthApi";

/**
 * @Goal : Router : change the browser URL and return the right component
 * @UsedByModule : index.js
 * @ModuleUsed : Home, Quiz, Summary, Login, Register, Tree, Users
 * @VisibleVariables :
 * @VisibleProcedures :
 * @returns {JSX.Element} the right component depending on browser URL
 */
function App() {

    /**
     * Setup state for auth and role
     */
    const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticated());
    const [userRole, setUserRole] = useState(isUser());

    /**
     * Render the right component according to state
     */
    return (
        //Provider to share state to all levels
        <Auth.Provider value={{
            isAuthenticated, setIsAuthenticated, userRole, setUserRole
        }}>
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
