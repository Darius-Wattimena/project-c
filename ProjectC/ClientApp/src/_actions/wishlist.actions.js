import { wishlistConstants } from "../_constants"
import { wishlistService } from "../_services/wishlist.service";
import { alertActions } from "./alert.actions";


export const wishlistActions = {
    getMyWishlists,
    getWishlistItems,
    removeProduct,
};

function getWishlistItems(wishlistId) {
    return dispatch => {
        dispatch(request());

        wishlistService.getWishlistItems(wishlistId).then(
            wishlist => {
                dispatch(success(wishlist));
            },
            error => {
                dispatch(alertActions.error(error));
                dispatch(failure(error));
            }
        );
    }

    // Actions
    function request() { return { type: wishlistConstants.GET_SINGLE_REQUEST } };
    function success(wishlist) { return { type: wishlistConstants.GET_SINGLE_SUCCESS, wishlist: wishlist } };
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
    function success(wishlists) { return { type: wishlistConstants.GET_SUCCESS, items: wishlists } };
    function failure(error) { return { type: wishlistConstants.GET_FAILURE, error: error } };
}

function removeProduct(product) {
    return dispatch => {
        dispatch(remove(product));
    }

    function remove(product) { return { type: wishlistConstants.REMOVE_WISHLISTPRODUCT, product } }
}