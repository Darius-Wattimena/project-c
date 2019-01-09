import { reviewConstants } from '../_constants';
import { reviewService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const reviewActions = {
    getAll,
    getAllForProduct,
    add,
    remove,
    update
};

function getAll() {
    return dispatch => {
        dispatch(request());
        reviewService.getAll()
            .then(
                reviews => {
                    dispatch(success(reviews));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request() { return { type: reviewConstants.GET_REQUEST } }
    function success(reviews) { return { type: reviewConstants.GET_SUCCESS, reviews } }
    function failure(error) { return { type: reviewConstants.GET_FAILURE, error } }
}

function getAllForProduct(productId) {
    return dispatch => {
        dispatch(request());
        reviewService.getAllForProduct(productId)
            .then(
                reviews => {
                    dispatch(success(reviews));
                },
                error => {
                    dispatch(failure(error));
                }
        );

        // Check if can post
        reviewService.getPermissions(productId)
            .then(
            canPost => { 
                console.log("CAN POST: " + canPost);
                if (canPost) {
                    dispatch(allowPost());
                }
            },
            error => { }
            );
    };

    function request() { return { type: reviewConstants.GET_REQUEST } }
    function success(reviews) { return { type: reviewConstants.GET_SUCCESS, reviews } }
    function failure(error) { return { type: reviewConstants.GET_FAILURE, error } }

    function allowPost() { return { type: reviewConstants.ALLOW_POST } }
}

function add(review) {
    return dispatch => {
        dispatch(request());
        reviewService.add(review)
            .then(
                review => {
                    dispatch(success(review));

                    // Reload reviews! because a new one has been added
                    dispatch(getAllForProduct(review.productId));

                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request() { return { type: reviewConstants.ADD_REQUEST } }
    function success(review) { return { type: reviewConstants.ADD_SUCCESS, review } }
    function failure(error) { return { type: reviewConstants.ADD_FAILURE, error } }
}

function remove(review) {
    console.log(review);
    return dispatch => {
        dispatch(request());
        reviewService.remove(review)
            .then(
                () => {
                    dispatch(success());

                    // Reload reviews! because deleted
                    dispatch(getAllForProduct(review.productId));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request() { return { type: reviewConstants.DELETE_REQUEST } }
    function success() { return { type: reviewConstants.DELETE_SUCCESS } }
    function failure(error) { return { type: reviewConstants.DELETE_FAILURE, error } }
}

function update(review) {
    return dispatch => {
        dispatch(request());
        reviewService.update(review)
            .then(
                review => {
                    dispatch(success(review));

                    // Reload reviews! because, y'know... we did an update
                    dispatch(getAllForProduct(review.productId));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request() { return { type: reviewConstants.UPDATE_REQUEST } }
    function success(review) { return { type: reviewConstants.UPDATE_SUCCESS, review } }
    function failure(error) { return { type: reviewConstants.UPDATE_FAILURE, error } }
}