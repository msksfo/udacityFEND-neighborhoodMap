import React, { Component } from 'react';
import '../App.css';

class Header extends Component {
    render() {
        return (
            <header className="header">
                   
                <div className="title-div">
                    <h1 className="title">Our Global Neighborhood</h1>
                    <h2 className='subheading'>Explore the UNESCO World Heritage Sites</h2>
                </div> 
                   
            </header>
        ) 
    }
}

export default Header;