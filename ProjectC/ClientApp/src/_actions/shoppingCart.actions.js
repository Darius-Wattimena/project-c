import { shoppingCartConstants } from '../_constants';
import { alertActions } from './';
import { shoppingCartService } from '../_services/shoppingCart.service';

export const shoppingCartActions = {
    loadCart,
    getItems,
    addProduct,
    updateItem,
    removeItem,
    clear,
    clearState
};

// Convert a product into a basket item
// This item does not yet have a shoppingBasketId or shoppingBasketItemId.
function convertToBasketItem(product) {
    return {
        'productId': product.id,
        'amount': 1,
        'product': product
    };
}

function loadCart() {
    return dispatch => {

        const user = localStorage.getItem('user');

        if (!user) {
            console.error("User is not logged in, cannot load cart.");
            return;
        }

        dispatch(request());

        shoppingCartService.getBasketItems()
            .then(
                items => {
                    // Store loaded items in state
                    dispatch(success(items));
                },
                error => {
                    // Could not load items
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
    function request() { return { type: shoppingCartConstants.GET_REQUEST } }
    function success(items) { return { type: shoppingCartConstants.GET_SUCCESS, items } }
    function failure(error) { return { type: shoppingCartConstants.GET_FAILURE, error } }
}

function getItems() {
    return dispatch => {
        // get locally stored items
        dispatch(get_local());
    }

    function get_local() { return { type: shoppingCartConstants.GET_CLIENT } }
}

function addProduct(product) {
    return dispatch => {

        const user = localStorage.getItem('user');

        // Convert product to basket item structure
        const item = convertToBasketItem(product);

        // Add the item to local shopping cart
        dispatch(add_local(item));
        //dispatch(alertActions.success(item.product.name + ' was added to the basket.'));

        // If user is logged in, add the item to their online basket as well
        if (user) {
            dispatch(request(item));
            dispatch(alertActions.success(item.product.name + ' was added to the basket.'));

            shoppingCartService.add(item)
                .then(
                    newItem => {
                        newItem.product = item.product;
                        // Product was added to the basket.
                        dispatch(success(newItem));
                        console.log("Added product to basket");
                    },
                    error => {
                        // Something went wrong
                        dispatch(failure(error));
                        dispatch(alertActions.error(error));
                    }
                );
        }
    };

    function request(item) { return { type: shoppingCartConstants.ADD_REQUEST, item } }
    function success(item) { return { type: shoppingCartConstants.ADD_SUCCESS, item } }
    function failure(error) { return { type: shoppingCartConstants.ADD_FAILURE, error } }

    function add_local(item) { return { type: shoppingCartConstants.ADD_CLIENT, item } }
};

function updateItem(item) {
    return dispatch => {

        dispatch(update(item)); // Update the item locally

        const user = localStorage.getItem('user');

        if (user) {
            dispatch(request(item));

            // Perform update
            shoppingCartService.update(item)
                .then(
                    response => {
                        dispatch(success(item));
                    },
                    error => {
                        dispatch(failure(error));
                        dispatch(alertActions.error(error));
                    }
                );
        }
    }

    function request(item) { return { type: shoppingCartConstants.UPDATE_REQUEST, item } }
    function success(item) { return { type: shoppingCartConstants.UPDATE_SUCCESS, item } }
    function failure(error) { return { type: shoppingCartConstants.UPDATE_FAILURE, error } }

    function update(item) { return { type: shoppingCartConstants.UPDATE_CLIENT, item } }
}

function removeItem(item) {

    return dispatch => {

        dispatch(remove(item)); // Remove the item locally

        const user = localStorage.getItem('user');

        if (user) {
            // User is logged in, remove the (product) item from their online shopping basket
            dispatch(request(item));

            shoppingCartService.remove(item)
                .then(
                    response => {
                        dispatch(success(item));
                        //dispatch(alertActions.success('Removed the product from the basket. (' + response + ')'));
                    },
                    error => {
                        dispatch(failure(error));
                        dispatch(alertActions.error(error));
                    }
                );
        }
    }

    function request(item) { return { type: shoppingCartConstants.REMOVE_REQUEST, item } }
    function success(item) { return { type: shoppingCartConstants.REMOVE_SUCCESS, item } }
    function failure(error) { return { type: shoppingCartConstants.REMOVE_FAILURE, error } }

    function remove(item) { return { type: shoppingCartConstants.REMOVE_CLIENT, item } }
}

function clear() {

    return dispatch => {

        clearState(); // Clear locally

        const user = localStorage.getItem('user');

        if (user) {
            dispatch(request());

            shoppingCartService.clear().then(
                response => {
                    console.log("Cleared shopping cart (server-side).");
                    dispatch(success());
                },
                error => {
                    dispatch(failure(error));
                }
            )
        }
    }

    function request() { return { type: shoppingCartConstants.CLEAR_REQUEST } }
    function success() { return { type: shoppingCartConstants.CLEAR_SUCCESS } }
    function failure(error) { return { type: shoppingCartConstants.CLEAR_FAILURE, error } }

    function clear_local() { return { type: shoppingCartConstants.CLEAR_CLIENT } };
}

function clearState() {

    return (dispatch) => {
        dispatch(clear_local()); // Clear locally
    }

    function clear_local() { return { type: shoppingCartConstants.CLEAR_CLIENT } };
}