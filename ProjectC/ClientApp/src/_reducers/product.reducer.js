import { productConstants } from '../_constants';

export function products(state = {}, action) {
    switch (action.type) {
        case productConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case productConstants.GETALL_SUCCESS:
            return {
                items: action.products,
                loaded: true
            };
        case productConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case productConstants.GETSEARCH_REQUEST:
            return {
                loading: true
            };
        case productConstants.GETSEARCH_SUCCESS:
            return {
                items: action.products
            };
        case productConstants.GETSEARCH_FAILURE:
            return {
                error: action.error
            };
        case productConstants.DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map(product =>
                    product.id === action.id
                        ? { ...product, deleting: true }
                        : product
                )
            };
        case productConstants.DELETE_SUCCESS:
            // remove deleted user from state
            return {
                items: state.items.filter(product => product.id !== action.id)
            };
        case productConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
            return {
                ...state,
                items: state.items.map(product => {
                    if (product.id === action.id) {
                        // make copy of user without 'deleting:true' property
                        const { deleting, ...productCopy } = product;
                        // return copy of user with 'deleteError:[error]' property
                        return { ...productCopy, deleteError: action.error };
                    }

                    return product;
                })
            };
        default:
            return state;
    }
}

export function product(state = {}, action) {
    switch (action.type) {
        case productConstants.GET_REQUEST:
            return {
                loading: true
            };
        case productConstants.GET_SUCCESS:
            return {
                item: action.product
            };
        case productConstants.GET_FAILURE:
            return {
                error: action.error
            };
        case productConstants.CHANGE_STOCK_SUCCESS:
            return {
                item: action.product,
                newStock: action.newStock
            }
        case productConstants.CHANGE_STOCK_FAILURE:
            return {
                error: action.error
            }
        default:
            return state;
    }
}