﻿import { orderConstants } from '../_constants'
import { orderService } from '../_services';
import { shoppingCartActions } from './shoppingCart.actions';

export const orderActions = {
    create,
    getAll,
    getByUser,
    getPendingOrders
};

function create(shoppingCartItems) {
    return dispatch => {

        dispatch(request());

        orderService.create(shoppingCartItems)
            .then(
            response => { dispatch(success(response)); shoppingCartActions.clear(); },
            error => { dispatch(failure(error)); }
            );
    };

    function request() { return { type: orderConstants.CREATE_ORDER_REQUEST } }
    function success(response) { return { type: orderConstants.CREATE_ORDER_SUCCESS, response } }
    function failure(error) { return { type: orderConstants.CREATE_ORDER_FAILURE, error } }
}

function getAll() {
    return dispatch => {

        dispatch(request());

        orderService.getAll()
            .then(
                order => dispatch(success(order)),
                error => dispatch(failure(error))
        );
    };

    function request() { return { type: orderConstants.GETALL_REQUEST } }
    function success(order) { return { type: orderConstants.GETALL_SUCCESS, order} }
    function failure(error) { return { type: orderConstants.GETALL_FAILURE, error } }
}

function getByUser() {
    return dispatch => {

        dispatch(request());

        orderService.GetByUser()
            .then(
                order => dispatch(success(order)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: orderConstants.GETALL_REQUEST } }
    function success(order) { return { type: orderConstants.GETBYUSER_SUCCESS, order } }
    function failure(error) { return { type: orderConstants.GETBYUSER_FAILURE, error } }
}

function getPendingOrders() {
    return dispatch => {

        dispatch(request());

        orderService.getPending()
            .then(
                order => dispatch(success(order)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: orderConstants.GET_PENDING_REQUEST } }
    function success(order) { return { type: orderConstants.GET_PENDING_SUCCESS, order } }
    function failure(error) { return { type: orderConstants.GET_PENDING_FAILURE, error } }
}