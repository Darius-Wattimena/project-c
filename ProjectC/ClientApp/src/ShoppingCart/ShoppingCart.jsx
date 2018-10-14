//node imports
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';

import '../styling/ShoppingCartListingStyle.css';
import { shoppingCartActions } from '../_actions/shoppingCart.actions';

class ShoppingCart extends React.Component {
    constructor(props) {
        super(props);

        // TEST

        localStorage.setItem('shoppingCart', JSON.stringify({
            items: [
                {
                    id: 0,
                    name: 'Samsung S9',
                    imageUrl: 'https://image.coolblue.nl/max/2048x1536/products/818820',
                    amount: 1,
                    price: 670
                },
                {
                    id: 1,
                    name: 'Iphone XS',
                    imageUrl: 'https://static.toiimg.com/photo/65625284/Apple-iPhone-XS.jpg',
                    amount: 2,
                    price: 649
                }
            ]
        }));

    }

    handleRemove(id, event) {
        var products = JSON.parse(localStorage.getItem('shoppingCart'));
        
        for (var i = 0; i < products.items.length; i++) {
            if (products.items[i].id === id) {
                products.items.splice(i, 1);
            }
        }
        // update shopping cart
        localStorage.setItem('shoppingCart', JSON.stringify(products));
        // refresh
        history.push("/checkout");
    }

    // Subtracting quantity for an item from ze basket
    handleSubtract(id, event) {
        var products = JSON.parse(localStorage.getItem('shoppingCart'));
        
        for (var i = 0; i < products.items.length; i++) {
            if (products.items[i].id === id) {
                console.log(id);
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

    // Adding quantity
    handleAdd(product) {

        this.props.addProduct(product);
        history.push("/checkout");

        //var products = JSON.parse(localStorage.getItem('shoppingCart'));
        //
        //console.log(products.items.length);
        //for (var i = 0; i < products.items.length; i++) {
        //    console.log(i);
        //    if (products.items[i].id === id) {
        //        console.log("ADD");
        //        // add one
        //        products.items[i].amount += 1;
        //    }
        //}
        //// update shopping cart
        //localStorage.setItem('shoppingCart', JSON.stringify(products));
        //// refresh
        //history.push("/checkout");
    }

    render() {

        var products = { items: [] };

        console.log(this.props);

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
                                <div className="imageColumn col-md-4">
                                    <Link to={`/product/${product.id}`}>
                                        <img src={product.imageUrl} />
                                    </Link>
                                </div>
                                <div className="productColumn col-md-4">
                                    <Link to={`/product/${product.id}`}>
                                        <h4>{product.name}</h4>
                                    </Link>
                                    <h2>{product.price},-</h2>
                                <p>Quantity:
                                <button className="btn btn-sm" onClick={this.handleSubtract.bind(this, product.id)}>-</button>
                                    {product.amount}
                                    <button className="btn btn-sm" onClick={this.handleAdd.bind(this, product)}>Test Add</button>
                                </p>
                                </div>
                            <div className="actionsColumn col-md-4">
                                <button className="btn btn-danger" onClick={this.handleRemove.bind(this, product.id)}>Remove</button>
                                <button className="btn btn-primary">Add to wishlist</button>
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

// Map actions to props
const mapDispatchToProps = (dispatch) => {
    return {
        // this.props.addProduct
        addProduct: product => dispatch(shoppingCartActions.addProduct(product))
    }
};

const connectedShoppingCart = connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
export { connectedShoppingCart as ShoppingCart };