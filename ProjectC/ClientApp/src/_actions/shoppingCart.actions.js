import { shoppingCartConstants } from '../_constants';
import { alertActions } from './';
import { shoppingCartService } from '../_services/shoppingCart.service';

export const shoppingCartActions = {
    getItems,
    addProduct,
    updateItem,
    removeItem,
    clear
};

function convertToBasketItem(product) {
    return {
        'productId': product.id,
        'amount': 0,
        'product': product
    };
}

function getItems() {
    return dispatch => {

        const user = localStorage.getItem('user');

        if (!user) {

            // get locally stored items
            dispatch(get_local());

            return;
        }

        dispatch(request());

        shoppingCartService.getBasketItems()
            .then(
                items => {
                    // Store retrieved items
                    dispatch(success(items));
                },
                error => {
                    // Could not retrieve items
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
    function request() { return { type: shoppingCartConstants.GET_REQUEST } }
    function success(items) { return { type: shoppingCartConstants.GET_SUCCESS, items } }
    function failure(error) { return { type: shoppingCartConstants.GET_FAILURE, error } }

    function get_local() { return { type: shoppingCartConstants.GET_CLIENT } }
}

function addProduct(product) {
    return dispatch => {

        const user = localStorage.getItem('user');

        const item = convertToBasketItem(product);

        if (user) {
            // User is logged in, add the item to their shopping basket
            dispatch(request(item));

            shoppingCartService.add(item)
                .then(
                    item => {
                        // Product was added to the basket.
                        dispatch(success(item));
                        console.log("Added product to basket");
                        dispatch(alertActions.success(item.product.name + ' was added to the basket.'));
                    },
                    error => {
                        // Something went wrong
                        dispatch(failure(error));
                        dispatch(alertActions.error(error));
                    }
                );
        }
        else {
            // User is not logged in, store the item locally
            dispatch(add_local(item));
            dispatch(alertActions.success(item.product.name + ' was added to the basket.'));
        }
    };

    function request(item) { return { type: shoppingCartConstants.ADD_REQUEST, item } }
    function success(item) { return { type: shoppingCartConstants.ADD_SUCCESS, item } }
    function failure(error) { return { type: shoppingCartConstants.ADD_FAILURE, error } }

    function add_local(item) { return { type: shoppingCartConstants.ADD_CLIENT, item } }
};

function updateItem(item) {
    return dispatch => {

        const user = localStorage.getItem('user');

        if (user) {
            dispatch(request(item));

            // Perform update
            shoppingCartService.update(item)
                .then(
                    response => dispatch(success(item)),
                    error => {
                        dispatch(failure(error));
                        dispatch(alertActions.error(error));
                    }
                );
        }
        else {
            dispatch(update_local(item));
        }
    }

    function request(item) { return { type: shoppingCartConstants.UPDATE_REQUEST, item } }
    function success(item) { return { type: shoppingCartConstants.UPDATE_SUCCESS, item } }
    function failure(error) { return { type: shoppingCartConstants.UPDATE_FAILURE, error } }

    function update_local(item) { return { type: shoppingCartConstants.UPDATE_CLIENT, item } }
}

function removeItem(item) {

    const user = localStorage.getItem('user');

    return dispatch => {

        if (user) {
            // User is logged in, remove the (product) item from their shopping basket
            dispatch(request(item));

            shoppingCartService.remove(item)
                .then(
                    response => {
                        dispatch(success(item));
                        //dispatch(alertActions.success('Removed the product from the basket. (' + response + ')'));
                    },
                    error => {
                        dispatch(alertActions.error(error));
                    }
                );
        }
        else {
            dispatch(remove_local(item));
            //dispatch(alertActions.error('Removed product from basket.'));
        }
    }

    function request(item) { return { type: shoppingCartConstants.REMOVE_REQUEST, item } }
    function success(item) { return { type: shoppingCartConstants.REMOVE_SUCCESS, item } }
    function failure(error) { return { type: shoppingCartConstants.REMOVE_FAILURE, error } }

    function remove_local(item) { return { type: shoppingCartConstants.REMOVE_CLIENT, item } }
}

function clear() {
    return dispatch => {

        const user = localStorage.getItem('user');

        if (user) {
            dispatch(request());

            shoppingCartService.clear().then(
                response => {
                    dispatch(success());
                },
                error => {
                    dispatch(failure(error));
                }
            )
        }
        else {
            dispatch(clear_local());
        }
    }

    function request() { return { type: shoppingCartConstants.CLEAR_REQUEST } }
    function success() { return { type: shoppingCartConstants.CLEAR_SUCCESS } }
    function failure(error) { return { type: shoppingCartConstants.CLEAR_FAILURE, error } }

    function clear_local() { return { type: shoppingCartConstants.CLEAR_CLIENT } };
}