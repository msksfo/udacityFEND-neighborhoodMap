import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';

import Main from './components/Main';


class App extends Component {
  constructor(props) {
    super(props)
   
  }

  
  render() {
    return (
      <div className="app">
      
        <Header />

        <Main />
      </div>
    );
  }
}

export default App

//TODO: add api attribution
