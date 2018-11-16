import { orderConstants } from '../_constants';

export function order(state = {}, action) {
    switch (action.type) {
        case orderConstants.CREATE_ORDER_REQUEST:
            return {
                loading: true
            };
        case orderConstants.CREATE_ORDER_SUCCESS:
            return {
                response: action.response
            };
        case orderConstants.CREATE_ORDER_FAILURE:
            return {
                error: action.error
            };
        default:
            return state;
    }
}