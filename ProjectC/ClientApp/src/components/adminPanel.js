//node imports
import React, { Component } from 'react';

//component imports


//base class
export default class adminPanel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='adminPanel'>
                <a href='/adminpanel/product/add' class='btn btn-danger'>Add new product</a>
                <a class='btn btn-warning'>? product</a>
            </div>
        );
    }
}