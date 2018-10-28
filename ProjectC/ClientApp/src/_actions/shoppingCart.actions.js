import { shoppingCartConstants } from '../_constants';
//import { shoppingCartService } from '../_services';
import { alertActions } from './';

export const shoppingCartActions = {
    addProduct,
    removeProduct,
    subtractProduct
};

function addProduct(product) {
    return dispatch => {
        dispatch(add(product));
    };

    function add(product) { return { type: shoppingCartConstants.ADD_PRODUCT, product } }
};

function removeProduct(product) {
    return dispatch => {
        dispatch(remove(product));
    }

    function remove(product) { return { type: shoppingCartConstants.REMOVE_PRODUCT, product } }
}

function subtractProduct(product) {
    return dispatch => {
        dispatch(subtract(product));
    }

    function subtract(product) { return { type: shoppingCartConstants.SUBTRACT_PRODUCT, product } }
}