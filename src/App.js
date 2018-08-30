import React from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';


function App () {
 
  return (
    <div className="app"> {/* am i using this className??? */}
    
        <Header />

        <Main />

        <Footer />

    </div>
  );
  
}

export default App

