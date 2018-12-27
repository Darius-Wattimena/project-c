//node imports
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../styling/progress-indicator.css';
import '../styling/ShoppingCartListingStyle.css';
import { shoppingCartActions } from '../_actions/shoppingCart.actions';
import { StockBlock } from '../ProductPage/StockBlock';
import { formatCurrency } from '../_helpers';
import { wishlistActions } from '../_actions/wishlist.actions';

class ShoppingCart extends React.Component {
    constructor(props) {
        super(props);

        this.props.getItems();

        if (localStorage.getItem("user")) {
            this.props.loadCart();
        }
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

    loadWishlists() {
        // Load wishlists once 
        if (!this.props.wishlist.loaded) {
            this.props.getMyWishlists();
        }
    }

    addToWishlist(product, wishlist) {
        this.props.addToWishlist(product, wishlist);
    }

    render() {

        var shoppingCart = this.props.shoppingCart;

        this.totalPrice = 0;    // Variable used to calculate the total price for order details
        this.totalDiscount = 0; // Variable used to calculate the total discount price for order details

        const wishlistState = this.props.wishlist;

        return (
            <div>
                <nav className="path-nav" aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                        <li className="breadcrumb-item"><Link to="/checkout">Shopping Cart</Link></li>
                    </ol>
                </nav>
                {
                    // Show indicator if shopping cart is being synced
                    shoppingCart.syncing
                    &&
                    <div className="progress">
                        <div className="indeterminate"></div>
                    </div>
                    ||
                    <div className="progress invisible"></div>
                }
                {shoppingCart.items &&
                    <div>
                        {
                            shoppingCart.items.length == 0
                            &&
                            !shoppingCart.syncing
                            &&
                            <div className="text-center">
                                <h3 style={{ paddingTop: '2em' }}>Your shopping cart is empty. ☹</h3>
                                <br />
                                <Link to="/products">
                                    Browse products
                                </Link>
                            </div>
                        }
                        {shoppingCart.items.map((item, index) => {
                            const isDisabled = shoppingCart.syncing || item.updating || item.deleting;

                            // Add up to price
                            this.totalPrice += item.product.price * item.amount;

                            return <div className="product row" key={index}>
                                <div className="imageColumn col-md-2">
                                    <Link to={`/product/${item.id}`}>
                                        <img src={item.product.imageUrl} />
                                    </Link>
                                </div>
                                <div className="nameColumn col-md-2">
                                    <Link to={`/product/${item.product.id}`}>
                                        <h4>{item.product.name}</h4>
                                    </Link>
                                </div>
                                <div className="stockColumn col-md-3">
                                    <StockBlock stock={item.product.stock} amount={item.amount} />
                                </div>
                                <div className="actionsColumn col-md-3">
                                    <div className="quantity row">
                                        Quantity:
                                        <div className="btn-group" role="group">
                                            <button disabled={isDisabled} className="btn btn-sm" onClick={this.handleDecrement.bind(this, item)}>-</button>
                                            {item.amount}
                                            <button disabled={isDisabled} className="btn btn-sm" onClick={this.handleIncrement.bind(this, item)}>+</button>
                                        </div>
                                    </div>
                                    <br />
                                    <div className="btn-group-vertical" role="group">
                                        <div class="dropdown">
                                            <button disabled={isDisabled || wishlistState.adding} type="button" onClick={this.loadWishlists.bind(this)} data-toggle="dropdown" className="btn btn-default">
                                                <i className="actionIcon fas fa-heart" style={{ color: 'red' }}></i>
                                                &nbsp;Add to wishlist
                                            </button>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                {
                                                    wishlistState.loading
                                                    &&
                                                    <small>Loading...</small>
                                                    ||
                                                    wishlistState.lists && wishlistState.lists.map((wishlist, index) =>
                                                        <button
                                                            key={index}
                                                            className="dropdown-item btn btn-link"
                                                            onClick={this.addToWishlist.bind(this, item.product, wishlist)}
                                                        >{wishlist.name}</button>
                                                    )
                                                }
                                            </div>
                                        </div>

                                        <button disabled={isDisabled} type="button" className="btn btn-default" onClick={this.handleRemove.bind(this, item)}>
                                            <i className="actionIcon fas fa-trash align-middle"></i>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                                <div className="priceColumn col-md-2">
                                    <h2>{formatCurrency(item.product.price * item.amount)}</h2>
                                </div>
                            </div>
                        }
                        )}
                        {
                            shoppingCart.items.length > 0 &&
                            <div className="orderDetails">
                                {
                                    this.totalDiscount > 0 &&
                                    <h2 className="discount">Total Discount: {formatCurrency(this.totalDiscount)}</h2>
                                }
                                <h2>Total Price: {formatCurrency(this.totalPrice)}</h2>
                                <br />
                                <Link className="continueShopping" to="/products">
                                    <i className="fas fa-chevron-left" />
                                    &nbsp;Continue shopping
                                </Link>
                                &nbsp;
                                <Link to="/order">
                                    <button disabled={shoppingCart.syncing} className="btn btn-primary orderButton">
                                        <i className="fas fa-chevron-right"></i>
                                        &nbsp;Order&nbsp;
                                <i className="fas fa-truck"></i>
                                    </button>
                                </Link>
                            </div>
                        }
                    </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { shoppingCart, wishlist } = state;
    return {
        //this.props.shoppingCart
        shoppingCart,
        wishlist
    };
}

// Map actions to props
const mapDispatchToProps = (dispatch) => {
    return {
        // this.props.loadCart
        loadCart: () => dispatch(shoppingCartActions.loadCart()),

        // this.props.getItems
        getItems: () => dispatch(shoppingCartActions.getItems()),

        // this.props.addProduct
        addProduct: product => dispatch(shoppingCartActions.addProduct(product)),

        // this.props.updateItem
        updateItem: item => dispatch(shoppingCartActions.updateItem(item)),

        // this.props.removeItem
        removeItem: item => dispatch(shoppingCartActions.removeItem(item)),

        // Wishlist stuff
        getMyWishlists: () => dispatch(wishlistActions.getMyWishlists()),

        addToWishlist: (product, wishlist) => { dispatch(wishlistActions.addProduct(product, wishlist)); },
    }
};

const connectedShoppingCart = connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
export { connectedShoppingCart as ShoppingCart };