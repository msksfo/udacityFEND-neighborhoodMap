import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';


class App extends Component {
  constructor(props) {
    super(props)
   
  }

  
  render() {
    return (
      <div className="app">
      
        <Header />

        <Main />

        <Footer />

      </div>
    );
  }
}

export default App

