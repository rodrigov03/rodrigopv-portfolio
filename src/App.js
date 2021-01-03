import Home from './components/Home/'
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  
  render() {
    return (
      <div className="main">
        <Home />
      </div>
    );
  }
}

export default App;
