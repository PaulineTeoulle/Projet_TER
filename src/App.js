import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React from 'react';


export class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {list : null};
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount(){
  axios.get('http://localhost/reactTest/test/API/route.php')
  .then(response =>{this.setState({list: response.data})})
  .catch(error => console.log(error) )

  console.log(this.state.list)
};

  render(){
    if(!this.state.list){
      return <p>loading...</p>
    } else {
      return(
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>whh</p>
            <div>Data: {JSON.stringify(this.state.list)}</div>
          </header>
        </div>
      )
    }
  }
}

export default App;
