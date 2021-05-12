import './App.scss';
import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';

import Home from './views/Home';
import Quiz from './views/Quiz';
import Tree from './views/Tree';
import Users from './views/Users';
import FileUpload from './views/FileUpload';

import Nav from './components/Nav';


export class App extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {list : null};
  //   this.componentDidMount = this.componentDidMount.bind(this);
  // }

//   componentDidMount(){
//   axios.get('http://localhost/reactTest/test/API/route.php')
//   .then(response =>{this.setState({list: response.data})})
//   .catch(error => console.log(error) )

//   console.log(this.state.list)
// };

  render(){
    return(
        <Router>
          <div className="App">
            <Nav/>
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/quiz" exact component={Quiz}/>
              <Route path="/manageTree" exact component={Tree}/>
              <Route path="/manageUsers" exact component={Users}/>
              <Route path="/fileUpload" exact component={FileUpload}/>
              <Redirect to="/"/> {/* Redirect to home when invalid url */}
            </Switch>
          </div>
        </Router>
    )
  }
}

export default App;
