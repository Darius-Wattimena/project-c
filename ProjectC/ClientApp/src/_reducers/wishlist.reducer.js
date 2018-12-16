import { wishlistConstants } from '../_constants';

const initialState = {
    // Users' wishlists
    lists: [],

    // Single wishlist
    selectedItems: [],
    selectedId: null,

    // Loading flags
    loading: false,
    loaded: false,
    loadingSingle: false,
    loadedSingle: false
};

export function wishlist(state = initialState, action) {
    switch (action.type) {
        // GET wishlists
        case wishlistConstants.GET_REQUEST:
            return { ...state, loading: true };

        case wishlistConstants.GET_SUCCESS:
            return { ...state, lists: action.lists, loading: false, loaded: true };

        case wishlistConstants.GET_FAILURE:
            return { ...state, error: action.error, loading: false };

        // Get single wishlist
        case wishlistConstants.GET_SINGLE_REQUEST:
            return {
                ...state, selectedId: action.id, loadingSingle: true, loadedSingle: false
            };

        case wishlistConstants.GET_SINGLE_SUCCESS:
            return { ...state, selectedItems: action.items, loadingSingle: false, loadedSingle: true }

        case wishlistConstants.GET_SINGLE_FAILURE:
            return { ...state, error: action.error, loadingSingle: false };

        case wishlistConstants.REMOVE_WISHLISTPRODUCT:
            // Filter the products to exclude items that contain the id of the product to delete
            const filteredItems = state.items.filter((item) => item.productId !== action.product.id);
            return { ...state, wishlists: filteredItems };


        //C CREATING A WISHLIST
        case wishlistConstants.CREATE_REQUEST:
            return { ...state, creating: true };

        case wishlistConstants.CREATE_SUCCESS:
        case wishlistConstants.CREATE_FAILURE:
            return { ...state, creating: false };

        // DELETING A WISHLIST ITEM
        case wishlistConstants.REMOVE_REQUEST:
            return { ...state, deleting: true };

        case wishlistConstants.REMOVE_SUCCESS:
        case wishlistConstants.REMOVE_FAILURE:
            return { ...state, deleting: false };

        // ADDING WISHLIST ITEM
        case wishlistConstants.ADD_REQUEST:
            return { ...state, adding: true };

        case wishlistConstants.ADD_SUCCESS:
        case wishlistConstants.ADD_FAILURE:
            return { ...state, adding: false };


        default:
            return state;
    }
}