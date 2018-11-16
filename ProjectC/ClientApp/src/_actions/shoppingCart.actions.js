import { shoppingCartConstants } from '../_constants';
// TODO:
//import { shoppingCartService } from '../_services';
import { alertActions } from './';
import { shoppingCart } from '../_reducers/shoppingCart.reducer';

export const shoppingCartActions = {
    addProduct,
    removeProduct,
    subtractProduct,
    removeAll
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

function removeAll() {
    return dispatch => {
        dispatch(removeAll());
    }

    function removeAll() {
        return { type: shoppingCartConstants.REMOVE_ALL }
    };
}