//node imports
import React, { Component } from 'react';

//component imports
import Listproducts from '../features/productListing';

//base class
export default class loginPage extends Component {
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
                <div className='loginPage'>
                    <form>
                        E-mail:<br></br>
                        <input type="text" name="e-mail"></input><br></br>
                        Password:<br></br>
                        <input type="text" name="password"></input>
                    </form>
                </div>
            );
        }
    }
}