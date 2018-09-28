import React, { Component } from 'react';

import '../styling/SingleItemStyling.css';

class singleProduct extends Component {
    constructor(props) {
        super(props);
        this.state = { products: [], loading: true };

        fetch('api/Product')
            .then(response => response.json())
            .then(data => {
                this.setState({ products: data, loading: false });
            });
    }

    render() {
        var itemId = this.props.location.pathname.replace("/product/", "");
        function getPhone(code) {
            return this.state.products.filter(
                function (phone) { return phone.id === code }
            );
        }
        var phone = getPhone(itemId)[0];
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
