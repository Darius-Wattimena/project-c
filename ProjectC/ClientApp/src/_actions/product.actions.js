import { productConstants } from '../_constants';
import { productService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const productActions = {
    getAll,
    add
};

function getAll() {
    return dispatch => {
        
        dispatch(request());

        productService.getAll()
            .then(
            products => dispatch(success(products)),
                error => dispatch(failure(error))
            );
            
    };

    function request() { return { type: productConstants.GETALL_REQUEST } }
    function success(products) { return { type: productConstants.GETALL_SUCCESS, products } }
    function failure(error) { return { type: productConstants.GETALL_FAILURE, error } }
}

function add(product) {
    return dispatch => {
        dispatch(request(product));

        productService.add(product)
            .then(
                () => {
                    dispatch(success());
                    history.push('/adminpanel');
                    dispatch(alertActions.success('Added ' + product.name + ' to the inventory.'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(product) { return { type: productConstants.ADD_REQUEST, product } }
    function success(product) { return { type: productConstants.ADD_SUCCESS, product } }
    function failure(error) { return { type: productConstants.ADD_FAILURE, error } }
}