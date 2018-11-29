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

        this.props.getItems();
    }

    handleRemove(item) {
        // Remove a product from the cart
        this.props.removeItem(item);
    }

    // Adding quantity
    handleAdd(product) {
        // Add a product to the cart (+1)
        this.props.addProduct(product);
    }

    handleIncrement(item) {
        item.amount += 1;
        this.props.updateItem(item);
    }

    handleDecrement(item) {
        item.amount -= 1;
        this.props.updateItem(item);
    }

    render() {

        var shoppingCart = this.props.shoppingCart;

        return (
            <div>
                <h2 style={{ 'padding-top': '1em' }}>Shopping Cart</h2>
                {
                    shoppingCart.loading && <p><small>Loading...</small></p>
                }
                {shoppingCart.items &&
                    <div>
                        {
                            shoppingCart.items.length == 0 &&
                            <div>
                                <h3 style={{ 'padding-top': '2em' }}>Your shopping cart is empty. ☹</h3>
                            </div>
                        }
                        {shoppingCart.items.map((item, index) =>
                            <div className="product row" key={index}>
                                <div className="imageColumn col-md-4">
                                    <Link to={`/product/${item.id}`}>
                                        <img src={item.product.imageUrl} />
                                    </Link>
                                </div>
                                <div className="productColumn col-md-4">
                                    <Link to={`/product/${item.product.id}`}>
                                        <h4>{item.product.name}</h4>
                                    </Link>
                                    <h2>{item.product.price},-</h2>
                                    <p>Quantity:
                                <button disabled={item.updating || item.deleting} className="btn btn-sm" onClick={this.handleDecrement.bind(this, item)}>-</button>
                                        {item.amount}
                                        <button disabled={item.updating || item.deleting} className="btn btn-sm" onClick={this.handleIncrement.bind(this, item)}>+</button>
                                    </p>
                                </div>
                                <div className="actionsColumn col-md-4">
                                    <button disabled={item.updating || item.deleting} className="btn btn-danger" onClick={this.handleRemove.bind(this, item)}>Remove</button>
                                    <button disabled={item.updating || item.deleting} className="btn btn-primary">Add to wishlist</button>
                                </div>
                            </div>
                        )}
                        {
                            shoppingCart.items.length > 0 &&
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
        // this.props.getItems
        getItems: () => dispatch(shoppingCartActions.getItems()),

        // this.props.addProduct
        addProduct: product => dispatch(shoppingCartActions.addProduct(product)),

        // this.props.updateItem
        updateItem: item => dispatch(shoppingCartActions.updateItem(item)),

        // this.props.removeItem
        removeItem: item => dispatch(shoppingCartActions.removeItem(item))
    }
};

const connectedShoppingCart = connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
export { connectedShoppingCart as ShoppingCart };