import { orderConstants } from '../_constants'
import { orderService } from '../_services';

export const orderActions = {
    create
};

function create(shoppingCartItems) {
    return dispatch => {

        dispatch(request());

        orderService.create(shoppingCartItems)
            .then(
            response => { console.log(response); dispatch(success(response)); },
            error => { console.log(error); dispatch(failure(error)); }
            );
    };

    function request() { return { type: orderConstants.CREATE_ORDER_REQUEST } }
    function success(response) { return { type: orderConstants.CREATE_ORDER_SUCCESS, response } }
    function failure(error) { return { type: orderConstants.CREATE_ORDER_FAILURE, error } }
}