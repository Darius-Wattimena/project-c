import { wishlistConstants } from '../_constants';

const initialState = {
    items: [],
    loaded: false,
    selectedItems: [],
    selectedId: null
};

export function wishlist(state = initialState, action) {
    switch (action.type) {
        // GET wishlists
        case wishlistConstants.GET_REQUEST:
            return { ...initialState, loading: true };

        case wishlistConstants.GET_SUCCESS:
            return { ...state, items: action.items, loading: false, loaded: true };

        case wishlistConstants.GET_FAILURE:
            return { ...state, error: action.error, loading: false };

        // Get single wishlist
        case wishlistConstants.GET_SINGLE_REQUEST:
            return {
                ...state, selected: false 
            };

        case wishlistConstants.GET_SINGLE_SUCCESS:
            return { ...state, current: action.wishlist, selected: true }

        case wishlistConstants.GET_SINGLE_FAILURE:
            return { ...state, error: action.error, selected: false };

        case wishlistConstants.REMOVE_WISHLISTPRODUCT:
            // Filter the products to exclude items that contain the id of the product to delete
            const filteredItems = state.items.filter((item) => item.productId !== action.product.id);
            return { ...state, wishlists: filteredItems };

        default:
            return state;
    }
}