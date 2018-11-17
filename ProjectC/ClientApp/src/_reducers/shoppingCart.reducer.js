import { shoppingCartConstants } from '../_constants';


const initialState = {
    items: []
};

export function shoppingCart(state = initialState, action) {

    switch (action.type) {

        case shoppingCartConstants.ADD_REQUEST:
            return {
                ...state,
                loading: true
            };
            break;

        case shoppingCartConstants.ADD_SUCCESS:
            return {
                ...state,
                items: [...state.items, action.product]
            };
            break;

        case shoppingCartConstants.ADD_CLIENT:

            // If the item already exists in the shopping cart:
            if (state.items.some(p => p.productId === action.product.id)) {

                // Increment the amount of that product
                state.items.map(i => {
                    if (i.productId === action.product.id)
                        i.amount += 1;
                });

                return state;
            }

            // otherwise
            // create a new shopping basket item with an initial amount of 1
            var newItem = action.product;

            //TODO: This is all that's needed for shopping basket items (no need to store the entire product) in the future
            newItem.productId = action.product.id;
            newItem.amount = 1;

            return {
                // Whatever was in the state
                ...state,
                // The existing items plus the new item
                items: [...state.items, newItem]
             };

        case shoppingCartConstants.REMOVE_CLIENT:
            // Filter the products to exclude items that contain the id of the product to delete
            const filteredItems = state.items.filter((item) => item.productId !== action.product.id);
            return { ...state, items: filteredItems };

        case shoppingCartConstants.UPDATE_CLIENT:
            // Subtract the amount of products
            state.items.map(i => {
                if (i.productId === action.product.id)
                    i.amount -= 1;
            });

            // Discard any items with an amount of 0 or less
            const remainingItems = state.items.filter((i) => i.amount >= 1);

            return {
                ...state, items: remainingItems
            };

        
        default:
            return state
    }
}