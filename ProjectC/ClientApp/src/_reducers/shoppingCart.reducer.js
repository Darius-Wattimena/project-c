import { shoppingCartConstants } from '../_constants';


const initialState = {
    products: []
};

export function shoppingCart(state = initialState, action) {
    switch (action.type) {
        case shoppingCartConstants.ADD_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.product]
             };

        case shoppingCartConstants.REMOVE_PRODUCT:
            const filteredProducts = state.products.filter((item) => item.id !== action.product.id);
            return { ...state, products: filteredProducts }

        
        default:
            return state
    }
}