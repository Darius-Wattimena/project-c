//node imports
import React, { Component } from 'react';

//component imports


//base class
export default class addProductPage extends Component {
    constructor(props) {
        super(props);
        //this.state = { loading: false };
    }

    render() {
        return (
            <div className='adminPanel' class="col-md-4">
                <form action="/product" method="post">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" id="name" placeholder="Name" />
                    </div>
                    <div class="form-group">
                        <label for="price">Price</label>
                        <input min="0.01" step="0.01" class="form-control" id="price" placeholder="Price" />
                    </div>
                    <div class="form-group">
                        <label for='specifications'>Specifications <span class="text-danger">(not implemented yet)</span></label>
                        <input type="text" class="form-control" id="specifications" placeholder="?" />
                    </div>
                    <button type="submit" class="btn btn-primary">Add</button>
                </form>

            </div>
        );
    }
}