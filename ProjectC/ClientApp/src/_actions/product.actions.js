import { productConstants } from '../_constants';
import { productService } from '../_services';

export const productActions = {
    getAll,
    getById
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

function getById(id) {
    return dispatch => {
        dispatch(request());
        productService.getById(id)
            .then(
                products => dispatch(success(products)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: productConstants.GET_REQUEST } }
    function success(products) { return { type: productConstants.GET_SUCCESS, products } }
    function failure(error) { return { type: productConstants.GET_FAILURE, error } }
}
