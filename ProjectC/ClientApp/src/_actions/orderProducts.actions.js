import { orderProductsConstants } from '../_constants'
import { orderProductsService } from '../_services';

export const orderProductsActions = {
    getAll,
    getById
};

function getAll() {
    return dispatch => {

        dispatch(request());

        orderProductsService.getAll()
            .then(
                orderProducts => dispatch(success(orderProducts)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: orderProductsConstants.GETALL_REQUEST } }
    function success(orderProducts) { return { type: orderProductsConstants.GETALL_SUCCESS, orderProducts } }
    function failure(error) { return { type: orderProductsConstants.GETALL_FAILURE, error } }
}

function getById(id) {
    return dispatch => {
        dispatch(request());
        orderProductsService.getById(id)
            .then(
                orderProducts => dispatch(success(orderProducts)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: orderProductsConstants.GET_REQUEST } }
    function success(orderProducts) { return { type: orderProductsConstants.GET_SUCCESS, orderProducts } }
    function failure(error) { return { type: orderProductsConstants.GET_FAILURE, error } }
}