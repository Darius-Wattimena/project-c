import { shoppingCartConstants } from '../_constants';
import { alertActions } from './';
import { shoppingCartService } from '../_services/shoppingCart.service';

///TODO: Implement definition of 'shoppingCartItem'
// TODO: Store product inside shoppingCartItem ???

export const shoppingCartActions = {
    addProduct,
    updateProduct,
    removeProduct,
    clear
};

function convertToBasketItem(product) {
    return {
        productId: product.id,
        amount: product.amount // TODO: This is wrong
    };
}

function addProduct(product) {
    return dispatch => {

        const user = localStorage.getItem('user');

        const shoppingBasketItem = convertToBasketItem(product);

        if (user) {
            // User is logged in, add the item to their shopping basket
            shoppingCartService.add(shoppingBasketItem)
                .then(
                    response => {
                        // Product was added to the basket.
                        dispatch(success(product));
                        dispatch(alertActions.success('Added product to basket. (' + response + ')'));
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
            dispatch(add_local(product));
            dispatch(alertActions.success('Added product to basket.'));
        }
    };

    function request(product) { return { type: shoppingCartConstants.ADD_REQUEST, product } }
    function success(product) { return { type: shoppingCartConstants.ADD_SUCCESS, product } }
    function failure(error) { return { type: shoppingCartConstants.ADD_FAILURE, error } }

    function add_local(product) { return { type: shoppingCartConstants.ADD_CLIENT, product } }
};

function updateProduct(product) {
    return dispatch => {
        dispatch(update_local(product));
    }

    function request(product) { return { type: shoppingCartConstants.UPDATE_REQUEST, product } }
    function success(product) { return { type: shoppingCartConstants.UPDATE_SUCCESS, product } }
    function failure(error) { return { type: shoppingCartConstants.UPDATE_FAILURE, error } }

    function update_local(product) { return { type: shoppingCartConstants.UPDATE_CLIENT, product } }
}

function removeProduct(product) {

    const user = localStorage.getItem('user');

    return dispatch => {

        if (user) {
            // User is logged in, remove the item from their shopping basket
            shoppingCartService.remove(product.id)
                .then(
                    response => {
                        dispatch(success());
                        dispatch(alertActions.success('Removed the product from the basket. (' + response + ')'));
                    },
                    error => {
                        dispatch(alertActions.error(error));
                    }
                );
        }
        else {
            dispatch(remove_local(product));
            dispatch(alertActions.error('Removed product from basket.'));
        }
    }

    function request(product) { return { type: shoppingCartConstants.REMOVE_REQUEST, product } }
    function success() { return { type: shoppingCartConstants.REMOVE_SUCCESS } }
    function failure(error) { return { type: shoppingCartConstants.REMOVE_FAILURE, error } }

    function remove_local(product) { return { type: shoppingCartConstants.REMOVE_CLIENT, product } }
}

function clear() {
    return dispatch => {
        dispatch(clear_local());
    }

    function clear_local() { return { type: shoppingCartConstants.CLEAR_CLIENT } };
}