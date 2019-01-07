import { wishlistConstants } from "../_constants"
import { wishlistService } from "../_services/wishlist.service";
import { alertActions } from "./alert.actions";


export const wishlistActions = {
    getMyWishlists,
    getWishlistItems,
    createWishlist,
    updateWishlist,
    deleteWishlist,
    addProduct,
    removeItem,
};

function createWishlist(wishlist) {
    return dispatch => {
        dispatch(request());

        wishlistService.create(wishlist).then(
            () => {
                dispatch(success());

                // Re-load 'my wishlists'
                dispatch(getMyWishlists());
            },
            error => {
                dispatch(alertActions.error(error));
                dispatch(failure(error));
            }
        );
    }

    function request() { return { type: wishlistConstants.CREATE_REQUEST } };
    function success() { return { type: wishlistConstants.CREATE_SUCCESS } };
    function failure(error) { return { type: wishlistConstants.CREATE_FAILURE, error: error } };
}

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

function addProduct(product, wishlist) {

    console.log(product);

    var wishlistItem = {
        'productId': product.id,
        'wishlistId': wishlist.id
    };

    return dispatch => {
        dispatch(request());

        wishlistService.add(wishlistItem).then(
            response => {
                dispatch(success());
                dispatch(alertActions.success(product.name + " was added to '" + wishlist.name + "'!"));

                // Re-load wishlist
                dispatch(getWishlistItems(wishlist.id));
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

function removeItem(wishlistItem) {
    return dispatch => {
        dispatch(request());

        wishlistService.remove(wishlistItem).then(
            response => {
                dispatch(success());

                // Re-load all items
                dispatch(getWishlistItems(wishlistItem.wishlistId));
            },
            error => {
                dispatch(alertActions.error(error));
                dispatch(failure(error));
            }
        );
    }

    // Actions
    function request() { return { type: wishlistConstants.REMOVE_REQUEST } };
    function success() { return { type: wishlistConstants.REMOVE_SUCCESS } };
    function failure(error) { return { type: wishlistConstants.REMOVE_FAILURE, error: error } };
}

function deleteWishlist(wishlistId) {
    return dispatch => {
        dispatch(request());

        wishlistService.deleteWishlist(wishlistId).then(
            response => {
                dispatch(success());

                // Re-load 'my wishlists'
                dispatch(getMyWishlists());
            },
            error => {
                dispatch(alertActions.error(error));
                dispatch(failure(error));
            }
        );
    }

    // Actions
    function request() { return { type: wishlistConstants.DELETE_REQUEST } };
    function success() { return { type: wishlistConstants.DELETE_SUCCESS } };
    function failure(error) { return { type: wishlistConstants.DELETE_FAILURE, error: error } };
}

function updateWishlist(wishlist) {
    return dispatch => {
        dispatch(request());

        wishlistService.update(wishlist).then(
            response => {
                dispatch(success());

                // Re-load 'my wishlists'
                dispatch(getMyWishlists());
            },
            error => {
                dispatch(alertActions.error(error));
                dispatch(failure(error));
            }
        );
    }

    // Actions
    function request() { return { type: wishlistConstants.DELETE_REQUEST } };
    function success() { return { type: wishlistConstants.DELETE_SUCCESS } };
    function failure(error) { return { type: wishlistConstants.DELETE_FAILURE, error: error } };
}