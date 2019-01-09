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
import { reviewActions } from '../_actions/review.actions';

import { AddToCartConfirmModal } from '../ShoppingCart/AddToCartConfirmModal';
import { EditReviewModal } from '../SingleProductPage/Helpers/EditReviewModal';

function Rating(props) {

    // Used for displaying outline/solid stars based on review rating

    let result = [];

    var star;

    for (var i = 1; i <= 5; ++i) {
        if (i <= props.amount)
            star = <span key={i} className="fas fa-star" title={`${props.amount} star rating`} />
        else
            star = <span key={i} className="far fa-star" />

        result.push(star);
    }

    return result;
}

//base class
class SingleProductPage extends React.Component {

    constructor(props) {
        super(props);
        this.submitReview = this.submitReview.bind(this);
    }

    componentDidMount() {
        // Load single product
        this.props.getProductById(this.props.match.params.id);

        // Load reviews for this single product
        this.props.getReviews(this.props.match.params.id);
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

    submitReview() {

        // Find out what rating was selected (checking whether 'checked' or not from high to low)
        var rating =
            document.getElementById("star-5").checked ? 5 :
                document.getElementById("star-4").checked ? 4 :
                    document.getElementById("star-3").checked ? 3 :
                        document.getElementById("star-2").checked ? 2 :
                            document.getElementById("star-1").checked ? 1 :
                                -1;

        var reviewText = document.getElementById("reviewBody").value;

        var review = {
            'rating': rating,
            'body': reviewText,
            'productId': this.props.product.item.id
        };

        // Post the review
        this.props.postReview(review);
    }

    removeReview(review) {
        // DELETE review
        this.props.removeReview(review);
    }

    render() {
        const { product } = this.props;

        const wishlistState = this.props.wishlist;
        const reviewState = this.props.review;

        const user = JSON.parse(localStorage.getItem('user'));

        return (
            <div>
                {!product.item
                    &&
                    // Product has not loaded yet, show empty section with progress bar
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
                    // Show product
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
                                            className="btn btn-success actionButton"
                                            onClick={this.handleAdd.bind(this, product.item)}
                                            data-toggle="modal"
                                            data-target={`#AddToCartConfirmModal`}>
                                            Add to cart
                                        </button>
                                        <div className="dropdown">
                                            <button className="btn btn-info actionButton" onClick={this.loadWishlists.bind(this)} data-toggle="dropdown">
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

                        <div id="reviewSection">
                            <h3>Reviews</h3>
                            <hr />
                            {
                                // Loading
                                reviewState.loading
                                &&
                                <div className="progress">
                                    <div className="indeterminate"></div>
                                </div>
                                ||
                                // Show posted reviews
                                reviewState.reviews && reviewState.reviews.map(
                                    (review, index) =>
                                        <div className="review" key={index}>
                                            <h5>{review.name}</h5>
                                            <h6>{review.date}</h6>
                                            <small>
                                                <Rating amount={review.rating} />
                                            </small>
                                            <p style={{ color: (reviewState.updating && review.canEdit ? `gray` : `inherit`) }}>
                                                {review.body}
                                            </p>
                                            {
                                                // Edit button
                                                review.canEdit
                                                &&
                                                <div>
                                                    <button disabled={reviewState.deleting || reviewState.updating} className="btn btn-primary" data-toggle="modal" data-target={`#editReviewModal${review.id}`}>
                                                        <i className="fas fa-edit" />&nbsp;
                                                            Edit your review
                                                    </button>
                                                    <EditReviewModal base={this} review={review} />
                                                </div>
                                            }
                                            {
                                                // Delete button for reviews posted by self or all admins
                                                (review.canEdit || (user && user.role == "Admin"))
                                                &&
                                                <button disabled={reviewState.deleting || reviewState.updating} className="btn btn-danger" onClick={() => { this.removeReview(review) }}>
                                                    <i className="fas fa-trash" />&nbsp;
                                                    Delete this review
                                                </button>
                                            }
                                            <hr />
                                        </div>
                                )
                            }
                            {
                                // No reviews yet
                                (reviewState.reviews && !reviewState.loading)
                                &&
                                reviewState.reviews.length == 0
                                &&
                                <small>No reviews have been placed on this product yet. {reviewState.canPost ? ` Be the first!` : ``}<br /></small>
                            }
                            {
                                // Loading bar while sending review
                                reviewState.sending
                                &&
                                <div className="progress">
                                    <div className="indeterminate"></div>
                                </div>
                            }
                            {
                                // Rating and a review form
                                (reviewState.canPost && !reviewState.sent)
                                &&
                                <div className="row">
                                    <div className="col-md-6">
                                        <h4>Rate and review your {product.item.name}</h4>
                                        <small>Your name ({user && `${user.firstName} ${user.lastName}`}) will be publicized upon placing a review.</small>
                                        <br />
                                        <div className="stars row" disabled={reviewState.sending}>
                                            <input className="star star-5" id="star-5" type="radio" name="star" disabled={reviewState.sending} />
                                            <label className="star star-5" for="star-5" disabled={reviewState.sending}></label>
                                            <input className="star star-4" id="star-4" type="radio" name="star" disabled={reviewState.sending} />
                                            <label className="star star-4" for="star-4" disabled={reviewState.sending}></label>
                                            <input className="star star-3" id="star-3" type="radio" name="star" disabled={reviewState.sending} />
                                            <label className="star star-3" for="star-3" disabled={reviewState.sending}></label>
                                            <input className="star star-2" id="star-2" type="radio" name="star" disabled={reviewState.sending} />
                                            <label className="star star-2" for="star-2" disabled={reviewState.sending}></label>
                                            <input className="star star-1" id="star-1" type="radio" name="star" disabled={reviewState.sending} />
                                            <label className="star star-1" for="star-1" disabled={reviewState.sending}></label>
                                        </div>
                                        <br />
                                        <textarea maxLength="200" id="reviewBody" className="form-control" rows="5" disabled={reviewState.sending} />
                                        <br />
                                        <button id="reviewSubmitBtn" className="btn btn-primary" onClick={this.submitReview} disabled={reviewState.sending}>Submit</button>
                                    </div>
                                </div>
                            }
                            {
                                // Confirmation
                                reviewState.sent
                                &&
                                <p>Thank you for your feedback. 😊</p>
                            }
                        </div>

                    </div>
                }

                <AddToCartConfirmModal product={product.item} />

            </div>
        );
    }
}
function mapStateToProps(state) {
    const { product, shoppingCart, wishlist, review } = state;
    return {
        product,
        shoppingCart,
        wishlist,
        review
    };
}

// Map actions to props
const mapDispatchToProps = (dispatch) => {
    return {
        getMyWishlists: () => dispatch(wishlistActions.getMyWishlists()),

        addToWishlist: (product, wishlist) => { dispatch(wishlistActions.addProduct(product, wishlist)); },

        getProductById: id => { dispatch(productActions.getById(id)); },

        addProduct: product => { dispatch(shoppingCartActions.addProduct(product)); },

        getReviews: productId => { dispatch(reviewActions.getAllForProduct(productId)) },

        postReview: review => { dispatch(reviewActions.add(review)) },

        removeReview: review => { dispatch(reviewActions.remove(review)) }
    }
};

const connectedProductPage = connect(mapStateToProps, mapDispatchToProps)(SingleProductPage);
export { connectedProductPage as SingleProductPage };