import { productConstants } from '../_constants';
import { productService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const productActions = {
    getAll,
    getById,
    add,
    _delete,
    search
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
        productService.getWithSpecifications(id)
            .then(
                products => dispatch(success(products)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: productConstants.GET_REQUEST } }
    function success(product) { return { type: productConstants.GET_SUCCESS, product } }
    function failure(error) { return { type: productConstants.GET_FAILURE, error } }
}

function search(searchValue) {
    return dispatch => {
        dispatch(request(searchValue));
        productService.search(searchValue)
            .then(
                products => dispatch(succes(products)),
                error => dispatch(failure(error))
            );
    };

    function request(searchValue) { return { type: productConstants.GETSEARCH_REQUEST } }
    function succes(products) { return { type: productConstants.GETSEARCH_SUCCESS, products } }
    function failure(error) { return { type: productConstants.GETSEARCH_FAILURE, error } }
}

function add(product) {
    return dispatch => {
        dispatch(request(product));

        productService.add(product)
            .then(
                () => {
                    dispatch(success());
                    history.push('/adminpanel/products');
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

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        productService._delete(id)
            .then(
                () => {
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) { return { type: productConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: productConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: productConstants.DELETE_FAILURE, id, error } }
}