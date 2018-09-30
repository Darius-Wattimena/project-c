//node imports
import React, { Component } from 'react';

//component imports


//base class
export default class addProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false };
    }

    render() {
        return (
            <div className='adminPanel'>
                <form action="/products" method="post">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" id="name" placeholder="Name" />
                    </div>
                    <div class="form-group">
                        <label for="price">Price</label>
                        <input type="price" class="form-control" id="price" placeholder="Price" />
                    </div>
                    <button type="submit" class="btn btn-primary">Add</button>
                </form>

            </div>
        );
    }
}