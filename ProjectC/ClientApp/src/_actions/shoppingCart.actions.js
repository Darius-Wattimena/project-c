import { shoppingCartConstants } from '../_constants';
// TODO:
//import { shoppingCartService } from '../_services';
import { alertActions } from './';

export const shoppingCartActions = {
    addProduct,
    removeProduct,
    subtractProduct,
    clear
};

function addProduct(product) {
    return dispatch => {
        dispatch(add(product));
        dispatch(alertActions.success('Added product to basket.'));
    };

    function add(product) { return { type: shoppingCartConstants.ADD_REQUEST, product } }
};

function removeProduct(product) {
    return dispatch => {
        dispatch(remove(product));
        dispatch(alertActions.error('Removed product from basket.'));
    }

    function remove(product) { return { type: shoppingCartConstants.REMOVE_REQUEST, product } }
}

function subtractProduct(product) {
    return dispatch => {
        dispatch(subtract(product));
    }

    function subtract(product) { return { type: shoppingCartConstants.SUBTRACT_REQUEST, product } }
}

function clear() {
    return dispatch => {
        dispatch(clear());
    }

    function clear() {
        return { type: shoppingCartConstants.CLEAR_REQUEST }
    };
}