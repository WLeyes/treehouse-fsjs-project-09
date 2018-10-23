import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

import './App.css';

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
