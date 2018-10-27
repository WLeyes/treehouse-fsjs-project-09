import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

class App extends Component {
  render(props) {
    return (
    <BrowserRouter>
      <Routes {...props}/>
    </BrowserRouter>
    );
  }
}

export default App;
