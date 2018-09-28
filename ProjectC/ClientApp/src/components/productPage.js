//node imports
import React, { Component } from 'react';

//component imports
import Listproducts from '../features/productListing';

//base class
export default class productPage extends Component {
    constructor(props) {
        super(props);
        this.state = { products: [], loading: true };

        fetch('api/Product')
            .then(response => response.json())
            .then(data => {
                this.setState({ products: data, loading: false });
                console.log(this.state.products);
            });
    }

    render() {
        if (this.state.loading) {
            return (
                <p>Loading products...</p>
            );
        } else {
            return (
                <div className='productPage'>
                    <Listproducts data={this.state.products} />
                </div>
            );
        }
    }
}