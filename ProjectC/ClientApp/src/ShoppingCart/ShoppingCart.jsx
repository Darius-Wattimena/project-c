﻿//node imports
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';

import '../styling/ShoppingCartListingStyle.css';

class ShoppingCart extends React.Component {
    constructor(props) {
        super(props);

        // TEST

        localStorage.setItem('shoppingCart', JSON.stringify({
            items: [
                {
                    id: 0,
                    name: 'Product 1',
                    imageUrl: 'https://img.freepik.com/free-icon/smartphone_318-81372.jpg?size=338c&ext=jpg',
                    amount: 1,
                    price: 3000
                },
                {
                    id: 1,
                    name: 'Product 2',
                    imageUrl: 'https://img.freepik.com/free-icon/smartphone_318-81372.jpg?size=338c&ext=jpg',
                    amount: 2,
                    price: 200
                }
            ]
        }));

    }

    // Removing an item from ze basket
    handleRemove(id, event) {
        console.log(id);
        var products = JSON.parse(localStorage.getItem('shoppingCart'));
        for (var i = 0; i < products.items.length; i++) {
            if (products.items[i].id === id) {
                // subtract one
                products.items[i].amount -= 1;

                // if zero, remove it
                if (products.items[i].amount <= 0) {
                    products.items.splice(i, 1);
                }
            }
        }
        // update shopping cart
        localStorage.setItem('shoppingCart', JSON.stringify(products));

        // refresh
        history.push("/checkout");
    }

    render() {

        var products = { items: [] };

        // Retrieve shopping cart products
        if (localStorage.getItem('shoppingCart') != null) {
            products = JSON.parse(localStorage.getItem('shoppingCart'));
        }

        return (
            <div>
                <h2>Shopping Cart</h2>
                <p>This will become the shopping cart</p>
                {products.items &&
                    <div>
                        {products.items.length == 0 && <h2>Your shopping cart is empty.</h2>}
                        {products.items.map((product, index) =>
                            <div className="product row" key={index}>
                                <div className="imageColumn col-md-4" key={index}>
                                    <Link to={`/product/${product.id}`}>
                                        <img src={product.imageUrl} />
                                    </Link>
                                </div>
                                <div className="productColumn col-md-4" key={index}>
                                    <Link to={`/product/${product.id}`}>
                                        <h4>{product.name}</h4>
                                    </Link>
                                    <h2>{product.price},-</h2>
                                    <p>Quantity: {product.amount}</p>
                                </div>
                                <div className="actionsColumn col-md-4">
                                    <button className="btn btn-danger" onClick={this.handleRemove.bind(this, product.id)}>Remove</button>
                                </div>
                            </div>
                        )}
                    </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { products } = state;
    return {
        products
    };
}

const connectedShoppingCart = connect(mapStateToProps)(ShoppingCart);
export { connectedShoppingCart as ShoppingCart };