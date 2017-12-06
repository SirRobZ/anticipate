import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">

            <h2>Anticipate</h2>
            <br />
            <Link to="/">Home</Link>
            <br />
            <Link to="/about">About</Link>
          </div>
          <div className="main-content">
            <Route path="/(login|logout)/" exact component={SignIn} />
            <Route path="/register" exact component={SignUp} />
            <Route path="/" exact component={Home} />
            <Route path="/about" exact component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
