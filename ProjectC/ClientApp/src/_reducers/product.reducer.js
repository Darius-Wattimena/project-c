import { productConstants } from '../_constants';

export function products(state = {}, action) {
    switch (action.type) {
        case productConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case productConstants.GETALL_SUCCESS:
            return {
                items: action.products
            };
        case productConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case productConstants.GET_REQUEST:
            return {
                loading: true
            };
        case productConstants.GET_SUCCESS:
            return {
                items: action.products
            };
        case productConstants.GET_FAILURE:
            return {
                error: action.error
            };
        
        default:
            return state
    }
}