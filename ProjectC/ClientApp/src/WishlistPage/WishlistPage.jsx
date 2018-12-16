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
import { formatCurrency } from '../_helpers';
import { DeleteConfirmModal, RenameModal } from './Helpers';

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

    handleRemove(item) {
        this.props.removeItem(item);
    }

    handleCreate() {
        this.props.createEmptyWishlist();
    }

    render() {
        const wishlistState = this.props.wishlist;

        var selectedWishlist = null;

        console.log(wishlistState.selectedItems);

        if (wishlistState.selectedId) {
            // Wishlist has been selected
            selectedWishlist = wishlistState.lists.find(wl =>
                wl.id === wishlistState.selectedId
            );
        }
        else {
            // If the lists are loaded,
            if (wishlistState.loaded && wishlistState.lists.length > 0) {
                // Load the first list by default
                this.selectWishlist(wishlistState.lists[0].id);
            }
        }

        const actionDisabled = wishlistState.deleting;

        return (
            <div className="wishlistContent">
                <div className="row">
                    <div className="col-md-3">
                        <h4>My wishlists</h4>
                        <hr />
                        {
                            wishlistState.loading
                            &&
                            // 'My wishlists' are loading...
                            <div className="progress">
                                <div className="indeterminate"></div>
                            </div>
                        }
                        {
                            // Display users' wishlists
                            wishlistState.lists.length > 0 && wishlistState.lists.map((wishlist, index) =>
                                <div className="row">
                                    <div className="col-md-7">
                                        <button
                                            key={index}
                                            disabled={wishlist.id === wishlistState.selectedId}
                                            className="wishlistBtn text-left btn btn-link btn-block"
                                            onClick={this.selectWishlist.bind(this, wishlist.id)}>
                                            {wishlist.name}
                                        </button>
                                    </div>
                                    <div className="col-md-5 btn-group">
                                        <button className="btn btn-link float-right" data-toggle="modal" data-target={`#renameModal${wishlist.id}`}>
                                            <i className="fas fa-edit text-default" />
                                        </button>
                                        <button className="btn btn-link float-right" data-toggle="modal" data-target={`#deleteModal${wishlist.id}`}>
                                            <i className="fas fa-times text-danger" />
                                        </button>
                                        <RenameModal wishlist={wishlist} />
                                        <DeleteConfirmModal wishlist={wishlist} />
                                    </div>
                                </div>
                            )
                        }
                        {
                            wishlistState.creating && <button className="btn btn-link btn-block" disabled="true">...</button>
                        }
                        <button disabled={wishlistState.creating} className="createWishlistBtn btn btn-info btn-block" onClick={this.handleCreate.bind(this)}>
                            <i className="fas fa-plus" />&nbsp;
                            Create wishlist
                        </button>
                    </div>

                    <div className="col-md-1"></div>

                    <div className="col-md-8">
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
                                wishlistState.selectedItems.map((item, index) =>
                                    <div className="wishlist-item row" key="{index}">
                                        <div className="col-sm-6">
                                            <Link to={`/product/${item.product.id}`}>

                                                <div className="wishlist-image">
                                                    <img src={item.product.imageUrl}></img>
                                                </div>

                                            </Link>
                                        </div>
                                        <div className="col-sm-6">
                                            <h4>{item.product.name}</h4>
                                            <h3>{formatCurrency(item.product.price)}</h3>

                                            <div className="btn-group">
                                                <CartButton product={item.product} base={this} />
                                                <button disabled={actionDisabled} className="btn btn-danger" onClick={this.handleRemove.bind(this, item)}>
                                                    Remove
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                ))
                        }
                    </div>
                    <div className="col-md-1"></div>
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
        createEmptyWishlist: () => dispatch(wishlistActions.createWishlist({})),
        getMyWishlists: () => dispatch(wishlistActions.getMyWishlists()),
        getWishlistItems: wishlistId => { dispatch(wishlistActions.getWishlistItems(wishlistId)); },
        removeItem: wishlistItem => { dispatch(wishlistActions.removeItem(wishlistItem)) },
        addProductToCart: product => { dispatch(shoppingCartActions.addProduct(product)); },
    }
};

const connectedWishlistPage = connect(mapStateToProps, mapDispatchToProps)(WishlistPage);
export { connectedWishlistPage as WishlistPage };

