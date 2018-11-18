import { wishlistConstants } from '../_constants';

const initialState = {
    items: []
};

export function wishlist(state = initialState, action) {
    switch (action.type) {
        case wishlistConstants.REMOVE_WISHLISTPRODUCT:
            // Filter the products to exclude items that contain the id of the product to delete
            const filteredItems = state.items.filter((item) => item.productId !== action.product.id);
            return { ...state, items: filteredItems };

        default:
            return state
    }
}