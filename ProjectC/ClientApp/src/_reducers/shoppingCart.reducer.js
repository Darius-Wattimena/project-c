import { shoppingCartConstants } from '../_constants';

export function shoppingCart(state = {}, action) {
    switch (action.type) {
        case shoppingCartConstants.ADD_PRODUCT:
            return [
                ...state,
                Object.assign({}, action.product)
            ];


        
        default:
            return state
    }
}