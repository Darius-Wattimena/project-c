//node imports
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { productActions } from '../_actions';

import '../styling/ProductListingStyle.css';

class ShoppingCart extends React.Component {
    constructor(props) {
        super(props);
        
        // TEST
        /*
        localStorage.setItem('shoppingCart', JSON.stringify({
                items: [
                    {
                        id: 0,
                        name: 'Product 1',
                        imageUrl: 'https://img.freepik.com/free-icon/smartphone_318-81372.jpg?size=338c&ext=jpg',
                        amount: 1
                    },
                    {
                        id: 1,
                        name: 'Product 2',
                        imageUrl: 'https://img.freepik.com/free-icon/smartphone_318-81372.jpg?size=338c&ext=jpg',
                        amount: 2
                    }
                ]
        }));
        */
    }

    render() {

        var products = { items: [] };

        // Retrieve shopping cart products
        if (localStorage.getItem('shoppingCart') != null) {
            products = JSON.parse(localStorage.getItem('shoppingCart'));
        }

        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Shopping Cart</h2>
                <p>This will become the shopping cart</p>
                {products.items &&
                    <div>
                    {products.items.length == 0 && <h2>Your shopping cart is empty.</h2>}
                        {products.items.map((product, index) =>
                            <div className="product" key={index}>
                                <Link to={`/product/${product.id}`}>
                                    <img src={product.imageUrl}></img>
                                    <h4>{product.name}</h4>
                                </Link>
                                <p>Amount: {product.amount}</p>
                                <h3>{product.price}</h3>
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