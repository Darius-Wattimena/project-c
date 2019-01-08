import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reviewActions } from '../_actions/review.actions';

function Rating(props) {
    let result = []; var star; for (var i = 1; i <= 5; ++i) {
        if (i <= props.amount)
            star = <span key={i} className="fas fa-star" title={`${props.amount} star rating`} />
        else
            star = <span key={i} className="far fa-star" />
        result.push(star)
    }
    return result
}

class AdminReviews extends React.Component {

    componentDidMount() {
        this.props.getAllReviews();
    }

    render() {

        const reviewState = this.props.review;

        return (
            <div className="panel col-md-8">
                <h1>User posted reviews</h1>
                {
                    reviewState.loading &&
                    <div className="progress">
                        <div className="indeterminate"></div>
                    </div>
                    ||
                    reviewState.reviews && reviewState.reviews.map(
                        (review, index) =>
                            <div className="review" key={index}>
                                <h5>Posted by {review.name} on {review.date} for <Link to={`/product/${review.productId}`}><b>{review.productName}</b></Link></h5>
                                <small>
                                    <Rating amount={review.rating} />
                                </small>
                                <p>
                                    {review.body}
                                </p>
                                {
                                    <button disabled={reviewState.deleting} className="btn btn-danger" onClick={() => { this.removeReview(review) }}>
                                        <i className="fas fa-trash" />
                                        &nbsp;Delete this review
                                                </button>
                                }
                                <hr />
                            </div>
                    )
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { review } = state;
    return {
        review
    };
}

// Map actions to props
const mapDispatchToProps = (dispatch) => {
    return {
        getAllReviews: () => dispatch(reviewActions.getAll()),
    }
};

const connectedAdminReviews = connect(mapStateToProps, mapDispatchToProps)(AdminReviews);
export { connectedAdminReviews as AdminReviews };