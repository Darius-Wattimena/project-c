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
        <button className="btn cartbutton" onClick={props.base.props.addProductToCart.bind(this, props.product)}>
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
        const wishlistState = this.props.wishlist;

        var selectedWishlist = null;

        if (wishlistState.selectedId) {
            selectedWishlist = wishlistState.lists.find(wl =>
                wl.id === wishlistState.selectedId
            );
        }

        return (
            <div>
                <div className="row">
                    <div className="col-md-2">
                        <h4>My wishlists</h4>
                        <hr />
                        {
                            wishlistState.loading
                            &&
                            // 'My wishlists' are loading...
                            <div className="progress">
                                <div className="indeterminate"></div>
                            </div>
                            ||
                            // Display users' wishlists
                            wishlistState.lists && wishlistState.lists.map((wishlist, index) =>
                                <button
                                    key={index}
                                    disabled={wishlist.id === wishlistState.selectedId}
                                    className="btn btn-link"
                                    onClick={this.selectWishlist.bind(this, wishlist.id)}>
                                    {wishlist.name} {wishlist.id}
                                </button>
                            )
                        }
                        <button className="btn btn-info btn-block">
                            <i className="fas fa-plus"/>&nbsp;
                            Create wishlist
                        </button>
                    </div>
                    <div className="col-md-10">
                        {
                            // If a wishlist has been selected, show the name right away
                            selectedWishlist
                            &&
                            <h3>{selectedWishlist.name}</h3>
                        }
                        {
                            // Loading bar for single selected wishlist
                            wishlistState.loadingSingle
                            &&
                            <div className="progress">
                                <div className="indeterminate"></div>
                            </div>
                            ||
                            <div className="progress invisible"></div>
                        }
                        {
                            // Single wishlist has been loaded, show the products (if any)
                            wishlistState.loadedSingle
                            &&
                            (wishlistState.selectedItems.length === 0
                                &&
                                <p>This wishlist is empty.</p>
                                ||
                                wishlistState.selectedItems.map((product, index) =>
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
                                ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
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

