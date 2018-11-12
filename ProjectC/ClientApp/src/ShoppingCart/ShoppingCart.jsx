//node imports
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';

import '../styling/ShoppingCartListingStyle.css';
import { shoppingCartActions } from '../_actions/shoppingCart.actions';
import { orderActions } from '../_actions/order.actions';

class ShoppingCart extends React.Component {
    constructor(props) {
        super(props);

        // TODO: For later, should we store the shopping cart in local storage?
        localStorage.setItem('shoppingCart', JSON.stringify({
            items: [
            ]
        }));

    }

    handleOrder(shoppingCartItems) {
        this.props.createOrder(shoppingCartItems);
        console.log("OK");
    }

    handleRemove(product) {
        // Remove a product from the cart
        this.props.removeProduct(product);
        // re-render
        this.forceUpdate();
    }

    // Adding quantity
    handleAdd(product) {
        // Add a product to the cart (+1)
        this.props.addProduct(product);
        // re-render
        this.forceUpdate();
    }

    handleSubtract(product) {
        // -1
        this.props.subtractProduct(product);
        // re-render
        this.forceUpdate();
    }

    render() {

        var shoppingCart = this.props.shoppingCart;

        // Retrieve shopping cart products
        //if (localStorage.getItem('shoppingCart') != null) {
        //    products = JSON.parse(localStorage.getItem('shoppingCart'));
        //}
        // TODO: Maybe we should make the state persistent?

        return (
            <div>
                <h2 style={{'padding-top' : '1em'}}>Shopping Cart</h2>
                {shoppingCart.items &&
                    <div>
                        {shoppingCart.items.length == 0 &&
                            <div>
                                <h3 style={{ 'padding-top': '2em' }}>Your shopping cart is empty. ☹</h3>
                            </div>
                        }
                        {shoppingCart.items.map((item, index) =>
                            <div className="product row" key={index}>
                                <div className="imageColumn col-md-4">
                                    <Link to={`/product/${item.id}`}>
                                        <img src={item.imageUrl} />
                                    </Link>
                                </div>
                                <div className="productColumn col-md-4">
                                    <Link to={`/product/${item.id}`}>
                                        <h4>{item.name}</h4>
                                    </Link>
                                    <h2>{item.price},-</h2>
                                    <p>Quantity:
                                <button className="btn btn-sm" onClick={this.handleSubtract.bind(this, item)}>-</button>
                                        {item.amount}
                                        <button className="btn btn-sm" onClick={this.handleAdd.bind(this, item)}>+</button>
                                    </p>
                                </div>
                                <div className="actionsColumn col-md-4">
                                    <button className="btn btn-danger" onClick={this.handleRemove.bind(this, item)}>Remove</button>
                                    <button className="btn btn-primary">Add to wishlist</button>
                                </div>
                            </div>
                    )}
                    {
                        shoppingCart.items &&
                        <Link className="btn btn-danger" to="/order">
                            Order
                            </Link>
                    }
                    </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { shoppingCart } = state;
    return {
        //this.props.shoppingCart
        shoppingCart
    };
}

// Map actions to props
const mapDispatchToProps = (dispatch) => {
    return {
        // this.props.addProduct
        addProduct: product => dispatch(shoppingCartActions.addProduct(product)),

        // this.props.removeProduct
        removeProduct: product => dispatch(shoppingCartActions.removeProduct(product)),

        // this.props.subtractProduct
        subtractProduct: product => dispatch(shoppingCartActions.subtractProduct(product)),

        // this.props.createOrder
        createOrder: shoppingCartItems => dispatch(orderActions.create(shoppingCartItems))
    }
};

const connectedShoppingCart = connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
export { connectedShoppingCart as ShoppingCart };