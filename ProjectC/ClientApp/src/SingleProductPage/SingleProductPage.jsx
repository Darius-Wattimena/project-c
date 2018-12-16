//node imports
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { productActions } from '../_actions';
import { shoppingCartActions } from '../_actions/shoppingCart.actions';

import '../styling/progress-indicator.css';
import '../styling/SingleProductStyle.css';
import { StockBlock } from '../ProductPage/StockBlock';
import { formatCurrency } from '../_helpers/currency-format';
import { wishlistActions } from '../_actions/wishlist.actions';

//base class
class SingleProductPage extends React.Component {

    componentDidMount() {
        this.props.getProductById(this.props.match.params.id);
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

    // Adding quantity (or new product)
    handleAdd(product) {
        console.log("Adding product " + product.name + " to the shopping basket");
        this.props.addProduct(product);
    }

    render() {
        const { product } = this.props;

        const wishlistState = this.props.wishlist;

        return (
            <div>
                {!product.item
                    &&
                    <div className="SingleProduct row">
                        <div className="col-md-12">
                            <nav className="path-nav" aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                                    <li className="breadcrumb-item"><Link to="/products">Products</Link></li>
                                </ol>
                            </nav>
                            <div className="progress">
                                <div className="indeterminate"></div>
                            </div>
                        </div>
                    </div>
                    ||
                    <div>
                        <nav className="path-nav" aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                                <li className="breadcrumb-item"><Link to="/products">Products</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">{product.item.name}</li>
                            </ol>
                        </nav>
                        <div className="SingleProduct">
                            <div className="row">
                                <div className="col-md-5">
                                    <div className="img-container">
                                        <img src={product.item.imageUrl ? product.item.imageUrl : 'https://www.elite-electronics.com.au/images/yamaha/imagenotavailable.png'} />
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <h2>{product.item.name}</h2>
                                    <h3>{formatCurrency(product.item.price)}</h3>
                                    <StockBlock stock={product.item.stock} />
                                    <div className="button-group">
                                        <button disabled={(this.props.shoppingCart.adding && this.props.shoppingCart.adding.productId === product.item.id)}
                                            className="btn btn-success actionButton" onClick={this.handleAdd.bind(this, product.item)}>Add to cart</button>
                                        <div class="dropdown">
                                            <button class="btn btn-info actionButton" onClick={this.loadWishlists.bind(this)} data-toggle="dropdown">
                                                Add to wishlist
                                                &nbsp;<i className="fas fa-heart" />
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
                                                            onClick={this.addToWishlist.bind(this, product.item, wishlist)}
                                                        >{wishlist.name}</button>
                                            )
                                        }
                                            </div>
                                    </div>
                                </div>
                                <p>{product.item.description}</p>
                            </div>

                            {
                                // Specifications
                                product.item.specifications &&
                                <table className="table table-hover" style={{ margin: 1 + "em" }}>
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Specificaties</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {product.item.specifications.map((spec, index) =>
                                            <tr>
                                                <td scope="row">{spec.name}</td>
                                                <td>{spec.value}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            }
                        </div>
                    </div>
                    </div>
            }
            </div>
        );
    }
}
function mapStateToProps(state) {
    const { product, shoppingCart, wishlist } = state;
    return {
        product,
        shoppingCart,
        wishlist
    };
}

// Map actions to props
const mapDispatchToProps = (dispatch) => {
    return {
        getMyWishlists: () => dispatch(wishlistActions.getMyWishlists()),

        addToWishlist: (product, wishlist) => { dispatch(wishlistActions.addProduct(product, wishlist)); },

        getProductById: id => { dispatch(productActions.getById(id)); },

        addProduct: product => { dispatch(shoppingCartActions.addProduct(product)); },
    }
};

const connectedProductPage = connect(mapStateToProps, mapDispatchToProps)(SingleProductPage);
export { connectedProductPage as SingleProductPage };