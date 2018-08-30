import React, { Component } from 'react';

class Error extends Component {
    render(){
        return (
            <div className="error">
                We're sorry! Google maps is unavailable at this time. Please try again later.
            </div>
        )
    }
}

export default Error