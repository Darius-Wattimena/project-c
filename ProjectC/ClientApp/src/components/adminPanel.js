//node imports
import React, { Component } from 'react';

//component imports


//base class
export default class adminPanel extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false };
    }

    render() {
        if (this.state.loading) {
            return (
                <p>Loading...</p>
            );
        } else {
            return (
                <div className='adminPanel'>
                    <button class="btn btn-success">Add new product</button>
                </div>
            );
        }
    }
}