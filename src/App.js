import './App.scss';
import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';

import Home from './views/Home';
import Quiz from './views/Quiz';
import Tree from './views/Tree';
import Users from './views/Users';
import Summary from './views/Summary';
import Warning from './components/Warning'

import Nav from './components/Nav';


export class App extends React.Component {

  render(){
    return(
        <Router>
          <div className="App">
            <Nav/>
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/quiz" exact component={Quiz}/>
              <Route path="/summary" exact component={Summary}/>
              <Route path="/manageTree" exact component={Tree}/>
              <Route path="/manageUsers" exact component={Users}/>
              <Redirect to="/"/> {/* Redirect to home when invalid url */}
            </Switch>
          </div>
          <Warning/>
        </Router>
    )
  }
}

export default App;
