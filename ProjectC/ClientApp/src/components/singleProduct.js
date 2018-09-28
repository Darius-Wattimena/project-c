import React, { Component } from 'react';

import data from '../data/products.json';
import '../styling/SingleItemStyling.css';

class singleProduct extends Component {
    render() {
        var itemId = this.props.location.pathname.replace("/product/", "");
        function getPhone(code) {
            return data.filter(
                function (data) { return data.id === code }
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
