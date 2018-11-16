import { orderProductsConstants } from '../_constants';

const initialState = {
    items: []
};

export function orderProducts(state = initialState, action) {
    switch (action.type) {
        case orderProductsConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case orderProductsConstants.GETALL_SUCCESS:
            return {
                items: action.orderProducts
            };
        case orderProductsConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case orderProductsConstants.GET_REQUEST:
            return {
                loading: true
            };
        case orderProductsConstants.GET_SUCCESS:
            return {
                items: action.orderProducts
            };
        case orderProductsConstants.GET_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}