import { orderConstants } from '../_constants';

const initialState = {
    items: []
};

export function order(state = initialState, action) {
    switch (action.type) {
        case orderConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case orderConstants.GETALL_SUCCESS:
            return {
                items: action.order
            };
        case orderConstants.GETALL_FAILURE:
            return {
                error: action.error
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
            return state
    }
}