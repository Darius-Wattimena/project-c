import React, { Component } from 'react';

import '../styling/SingleItemStyling.css';

class singleProduct extends Component {
    constructor(props) {
        super(props);
        this.state = { product: [], loading: true };

    }

    render() {
        var itemId = this.props.location.pathname.replace("/product/", "");

        fetch('api/Product/' + itemId)
            .then(response => response.json())
            .then(data => {
                this.setState({ product: data, loading: false });
            });

        var phone = this.state.product[0]
        return (
            <div className="singleProduct">
                <div class="row">
                    <div class="img-container">
                        <img src={phone.img} />
                    </div>
                    <div class="product-container">
                        <h2>{phone.name}</h2>
                        <h3>{phone.price},-</h3>
                        <button class="btn btn-success">Add to shoppingcart</button>
                        <button class="btn btn-success">Add to wishlist</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default singleProduct;
