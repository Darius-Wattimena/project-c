﻿import { productConstants } from '../_constants';
import { productService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const productActions = {
    getAll,
    getAllAdmin,
    getById,
    loadById,
    add,
    _delete,
    recover,
    search,
    update,
    changeStock
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

function getAllAdmin() {
    return dispatch => {

        dispatch(request());

        productService.getAllAdmin()
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

function loadById(id) {
    return new Promise(
        (resolve, reject) => {
            productService.getWithSpecifications(id)
                .then(
                    products => {
                        console.log(products);
                        resolve(products);
                    },
                    error => {
                        reject(error);
                    }
                );
        });
}

function search(searchValue) {
    return dispatch => {
        dispatch(request(searchValue));
        productService.search(searchValue)
            .then(
                products => {
                    history.push('/products/nr');
                    dispatch(succes(products));
                },
                error => dispatch(failure(error))
            );
    };

    function request(searchValue) { return { type: productConstants.GETSEARCH_REQUEST } }
    function succes(products) { return { type: productConstants.GETSEARCH_SUCCESS, products } }
    function failure(error) { return { type: productConstants.GETSEARCH_FAILURE, error } }
}

function add(product, specifications) {
    return dispatch => {
        dispatch(request(product, specifications));

        productService.add(product, specifications)
            .then(
                () => {
                    dispatch(success());
                    history.push('/admin/product');
                    dispatch(alertActions.success('Added ' + product.name + ' to the inventory.'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(product, specifications) { return { type: productConstants.ADD_REQUEST, product, specifications } }
    function success(product, specifications) { return { type: productConstants.ADD_SUCCESS, product, specifications } }
    function failure(error) { return { type: productConstants.ADD_FAILURE, error } }
}

function update(product, specifications) {
    return dispatch => {
        dispatch(request(product, specifications));

        productService.update(product, specifications)
            .then(
                () => {
                    dispatch(success());
                    history.push('/admin/product');
                    dispatch(alertActions.success(product.name + ' was succesfully updated.'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(product, specifications) { return { type: productConstants.UPDATE_REQUEST, product, specifications } }
    function success(product, specifications) { return { type: productConstants.UPDATE_SUCCESS, product, specifications } }
    function failure(error) { return { type: productConstants.UPDATE_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        productService._delete(id)
            .then(
                response => {
                    dispatch(success(id));
                    dispatch(alertActions.success(response));
                },
                error => {
                    dispatch(failure(id, error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(id) { return { type: productConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: productConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: productConstants.DELETE_FAILURE, id, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function recover(id) {
    return dispatch => {
        dispatch(request(id));

        productService.recover(id)
            .then(
                response => {
                    dispatch(success(id));
                    dispatch(alertActions.success(response));
                },
                error => {
                    dispatch(failure(id, error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(id) { return { type: productConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: productConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: productConstants.DELETE_FAILURE, id, error } }
}

function changeStock(product, newStock, page) {
    return dispatch => {
        dispatch(request(product, newStock));
        productService.changeStock(product, newStock)
            .then(
                () => {
                    dispatch(success(product, newStock));
                    page.updateItem(newStock);
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request(product, newStock) { return { type: productConstants.CHANGE_STOCK_REQUEST, product, newStock } }
    function success(product, newStock) { return { type: productConstants.CHANGE_STOCK_SUCCESS, product, newStock } }
    function failure(error) { return { type: productConstants.CHANGE_STOCK_FAILURE, error } }
}