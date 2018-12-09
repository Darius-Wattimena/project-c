import { orderConstants } from '../_constants'
import { orderService } from '../_services';
import { shoppingCartActions } from './shoppingCart.actions';
import { alertActions } from './';

export const orderActions = {
    create,
    getAll,
    getByUser,
    getPendingOrders,
    setOrderStatusConfirmed,
    setOrderStatusSend
};

function create(shoppingCartItems) {
    return dispatch => {

        dispatch(request());

        orderService.create(shoppingCartItems)
            .then(
            response => { 
                dispatch(success(response));
                dispatch(alertActions.success(response));
                dispatch(shoppingCartActions.clear()); // Clear the shopping cart
            },
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
            }
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

function setOrderStatusConfirmed(button, id) {
    return dispatch => {

        dispatch(request());
        orderService.setOrderStatusConfirmed(id)
            .then(
                () => {
                    dispatch(success());
                    button.disableConfirmButton();
                },
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: orderConstants.SET_ORDERSTATUS_CONFIRMED_REQUEST } }
    function success() { return { type: orderConstants.SET_ORDERSTATUS_CONFIRMED_SUCCESS } }
    function failure(error) { return { type: orderConstants.SET_ORDERSTATUS_CONFIRMED_FAILURE, error } }
}

function setOrderStatusSend(button, id) {
    return dispatch => {

        dispatch(request());
        orderService.setOrderStatusSend(id)
            .then(
                () => {
                    dispatch(success());
                    button.disableSendButton();
                },
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: orderConstants.SET_ORDERSTATUS_SEND_REQUEST } }
    function success() { return { type: orderConstants.SET_ORDERSTATUS_SEND_SUCCESS } }
    function failure(error) { return { type: orderConstants.SET_ORDERSTATUS_SEND_FAILURE, error } }
}