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
        case orderConstants.GET_PENDING_REQUEST:
            return {
                loading: true
            };
        case orderConstants.GET_PENDING_SUCCESS:
            return {
                items: action.order
            };
        case orderConstants.GET_PENDING_FAILURE:
            return {
                error: action.error
            };
        case orderConstants.GETBYUSER_REQUEST:
            return {
                loading: true
            };
        case orderConstants.GETBYUSER_SUCCESS:
            return {
                items: action.order
            };
        case orderConstants.GETBYUSER_FAILURE:
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
        case orderConstants.SET_ORDERSTATUS_CONFIRMED_FAILURE:
            return {
                error: action.error
            };
        case orderConstants.SET_ORDERSTATUS_SEND_FAILURE:
            return {
                error: action.error
            };
        default:
            return state;
    }
}