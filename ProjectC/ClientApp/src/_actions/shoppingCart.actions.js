import { shoppingCartConstants } from '../_constants';
//import { shoppingCartService } from '../_services';
import { alertActions } from './';

export const shoppingCartActions = {
    addProduct
};

function addProduct(product) {
    return dispatch => {
        dispatch(add(product));
    };

    function add(product) { return { type: shoppingCartConstants.ADD_PRODUCT, product } }
};