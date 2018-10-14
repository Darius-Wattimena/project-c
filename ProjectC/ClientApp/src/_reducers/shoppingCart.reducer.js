import { shoppingCartConstants } from '../_constants';


const initialState = {
    products: []
};

export function shoppingCart(state = initialState, action) {
    switch (action.type) {
        case shoppingCartConstants.ADD_PRODUCT:
            return {
                // Whatever was in the state
                ...state,
                // Whatever was in the products array, plus the product to add
                // TODO: Only increase the amount if the product already exists
                products: [...state.products, action.product]
             };

        case shoppingCartConstants.REMOVE_PRODUCT:
            // Filter the products to exclude items that contain the id of the product to delete
            const filteredProducts = state.products.filter((item) => item.id !== action.product.id);
            return { ...state, products: filteredProducts }

        
        default:
            return state
    }
}