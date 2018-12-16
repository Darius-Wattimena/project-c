import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { productActions } from '../_actions';
import { history } from '../_helpers';
import { shoppingCartActions } from '../_actions/shoppingCart.actions';
import { wishlistActions } from '../_actions/wishlist.actions';
import '../styling/WishlistStyling.css';
import '../styling/progress-indicator.css';


function CartButton(props) {
    return (
        <button class="btn cartbutton" onClick={props.base.props.addProductToCart.bind(this, props.product)}>
            Add to cart
        </button>
    );
}

class WishlistPage extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // Load wishlists once 
        if (!this.props.wishlist.loaded) {
            this.props.getMyWishlists();
        }
    }

    selectWishlist(wishlistId) {
        this.props.getWishlistItems(wishlistId);
    }

    handleAdd(product) {
        this.props.addProduct(product);
    }

    handleRemove(product) {
        this.props.removeProduct(product);
    }

    render() {
        const wishlist = this.props.wishlist;

        return (
            <div>
                <div className="row">
                    <div className="col-md-2">
                        <h4>My wishlists</h4>
                        <hr />
                        {
                            wishlist.loading
                            &&
                            <div class="progress">
                                <div class="indeterminate"></div>
                            </div>
                            ||
                            wishlist.items && wishlist.items.map((wishlist, index) =>
                                <button className="btn btn-link" onClick={this.selectWishlist(wishlist.id)}>{wishlist.name}</button>
                            )
                        }
                        <button className="btn btn-info btn-block">Create wishlist</button>
                    </div>
                    <div className="col-md-10">
                        {
                            wishlist.selected === true
                            &&
                            <p>Selected {wishlist.current.name}</p>
                        }
                        {false &&
                            wishlist.items.x && wishlist.items.x.map((product, index) =>
                            <div className="wishlist-item row" key="{index}">
                                <div className="col-sm-3">

                                    <Link to={`/product/${product.id}`}>

                                        <div className="wishlist-image">
                                            <img src={product.imageUrl}></img>
                                        </div>

                                    </Link>
                                </div>
                                <div className="col-sm-9">
                                    <h4>{product.name}</h4>
                                    <h3>{product.price},-</h3>
                                    <CartButton product={product} base={this} />
                                    <button className="btn btn-danger" onClick={this.handleRemove.bind(this, product)}>
                                        Remove
                                    </button>
                                </div>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log(state);
    const { wishlist } = state;
    return {
        wishlist: wishlist
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        // accessible via this.props.getAllProducts
        getMyWishlists: () => dispatch(wishlistActions.getMyWishlists()),
        getWishlistItems: wishlistId => { dispatch(wishlistActions.getWishlistItems(wishlistId)); },
        addProductToCart: product => { dispatch(shoppingCartActions.addProduct(product)); }
    }
};

const connectedWishlistPage = connect(mapStateToProps, mapDispatchToProps)(WishlistPage);
export { connectedWishlistPage as WishlistPage };

