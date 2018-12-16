import { wishlistConstants } from "../_constants"
import { wishlistService } from "../_services/wishlist.service";
import { alertActions } from "./alert.actions";


export const wishlistActions = {
    getMyWishlists,
    getWishlistItems,
    addProduct,
    removeProduct,
};

function getWishlistItems(wishlistId) {
    return dispatch => {
        dispatch(request(wishlistId));

        wishlistService.getWishlistItems(wishlistId).then(
            wishlistItems => {
                dispatch(success(wishlistItems));
            },
            error => {
                dispatch(alertActions.error(error));
                dispatch(failure(error));
            }
        );
    }

    function request(wishlistId) { return { type: wishlistConstants.GET_SINGLE_REQUEST, id: wishlistId } };
    function success(wishlistItems) { return { type: wishlistConstants.GET_SINGLE_SUCCESS, items: wishlistItems } };
    function failure(error) { return { type: wishlistConstants.GET_SINGLE_FAILURE, error: error } };
}

function getMyWishlists() {
    return dispatch => {
        dispatch(request());

        wishlistService.getMyWishlists().then(
            wishlists => {
                dispatch(success(wishlists));
            },
            error => {
                dispatch(alertActions.error(error));
                dispatch(failure(error));
            }
        );
    }

    // Actions
    function request() { return { type: wishlistConstants.GET_REQUEST } };
    function success(wishlists) { return { type: wishlistConstants.GET_SUCCESS, lists: wishlists } };
    function failure(error) { return { type: wishlistConstants.GET_FAILURE, error: error } };
}

function addProduct(productId, wishlistId) {

    var wishlistItem = {
        'productId': productId,
        'wishlistId' : wishlistId
    };

    return dispatch => {
        dispatch(request());

        wishlistService.add(wishlistItem).then(
            response => {
                dispatch(success());
            },
            error => {
                dispatch(alertActions.error(error));
                dispatch(failure(error));
            }
        );
    }

    // Actions
    function request() { return { type: wishlistConstants.ADD_REQUEST } };
    function success() { return { type: wishlistConstants.ADD_SUCCESS } };
    function failure(error) { return { type: wishlistConstants.ADD_FAILURE, error: error } };
}

function removeProduct(product) {
    return dispatch => {
        dispatch(remove(product));
    }

    function remove(product) { return { type: wishlistConstants.REMOVE_WISHLISTPRODUCT, product } }
}