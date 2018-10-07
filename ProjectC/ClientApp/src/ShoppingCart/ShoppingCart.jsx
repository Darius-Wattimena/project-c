//node imports
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { productActions } from '../_actions';

import '../styling/ProductListingStyle.css';

class ShoppingCart extends React.Component {
    constructor(props) {
        super(props);
        // TODO: 
        // TEST
        localStorage.setItem('shoppingCart', {
                items: [
                    {
                        id: 0,
                        amount: 1
                    },
                    {
                        id: 1,
                        amount: 2
                    }
                ]
        });
    }

    componentDidMount() {
        
    }

    render() {
        //const { products } = this.props;


        //const { products } = {
        //    products: {
        //        type: 'TEST',
        //        items: [
        //            {
        //                id: 0,
        //                name: 'test',
        //                amount: 1
        //            }
        //        ]
        //    }
        //};

        //shoppingCart.items.map((item, index) => {
        //    var product = productActions.getById(item.id);
        //    console.log(product);
        //    products.items.push({
        //        id: product.id,
        //        name: product.name,
        //        amount: item.amount
        //    });
        //    console.log(product.id);
        //});

        const products = {
            items: [
                {
                    id: 0,
                    amount: 1
                },
                {
                    id: 1,
                    amount: 2
                }
            ]
        };//localStorage.getItem('shoppingCart');
        console.log(products);

        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Shopping Cart</h2>
                <p>This will become the shopping cart</p>
                {products.items &&
                    <div>
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