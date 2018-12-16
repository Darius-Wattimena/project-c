import { shoppingCartConstants } from '../_constants';


const initialState = {
    items: []
};

function saveState(state) {
    localStorage.setItem('shoppingCart', JSON.stringify(state));
    return state;
}

export function shoppingCart(state = initialState, action) {

    switch (action.type) {

        ////////////////////// LOADING ITEMS //////////////////////
        case shoppingCartConstants.GET_REQUEST:
            return {
                ...state,
                syncing: true
            };

        case shoppingCartConstants.GET_SUCCESS:
            return saveState({
                items: action.items
            });

        case shoppingCartConstants.GET_FAILURE:
            return {
                ...state,
                error: action.error
            };

        ////////////////////// ADDING ITEMS //////////////////////
        case shoppingCartConstants.ADD_REQUEST:
            return {
                ...state,
                adding: action.item
            };

        case shoppingCartConstants.ADD_SUCCESS:
        case shoppingCartConstants.ADD_FAILURE:
            return saveState({
                ...state,
                adding: false
            });

        ////////////////////// UPDATE ITEM //////////////////////
        case shoppingCartConstants.UPDATE_REQUEST:
            return {
                ...state,
                // Set updating property to true for targeted item
                items: state.items.map(item =>
                    item.productId === action.item.productId
                        ? { ...item, updating: true }
                        : item
                ),
                syncing: true
            };

        case shoppingCartConstants.UPDATE_SUCCESS:

            // Replace the updated item
            var remainingItems = state.items.map(item =>
                item.productId === action.item.productId
                    ? action.item // updated item
                    : item);      // untouched item

            // Discard any items with an amount of 0 or less
            remainingItems = remainingItems.filter((i) => i.amount >= 1);

            return saveState({
                ...state,
                // REPLACE old item with updated item
                items: remainingItems,
                syncing: false
            });

        case shoppingCartConstants.UPDATE_FAILURE:
            return saveState({
                ...state,
                syncing: false
            });

        ////////////////////// REMOVE ITEM //////////////////////
        case shoppingCartConstants.REMOVE_REQUEST:

            return {
                ...state,
                // Set deleting property to true for targeted item
                items: state.items.map(item =>
                    item.productId === action.item.productId
                        ? { ...item, deleting: true }
                        : item
                )
            };

        case shoppingCartConstants.REMOVE_SUCCESS:
            return saveState({
                ...state,
                // Exclude removed item
                items: state.items.filter(i => i.productId !== action.item.productId)
            });

        ////////////////////// CLEAR CART //////////////////////
        case shoppingCartConstants.CLEAR_REQUEST:
            return {
                ...state,
                syncing: true
            };

        case shoppingCartConstants.CLEAR_SUCCESS:
            return saveState(initialState);

        ////////////////////// CLIENT CART FUNCTIONS //////////////////////
        case shoppingCartConstants.GET_CLIENT:
            var cart = JSON.parse(localStorage.getItem('shoppingCart'));
            if (cart) {
                return saveState(cart); // Cart found
            }
            return state; // Cart not found

        // ADD
        case shoppingCartConstants.ADD_CLIENT:

            // If the item already exists in the shopping cart:
            if (state.items.some(i => i.productId === action.item.productId)) {

                // Increment the amount of that product (update)
                state.items.map(i => {
                    if (i.productId === action.item.id)
                        i.amount += 1;
                });

                saveState(state); // store in cookies
                return state;
            }

            // Otherwise
            return saveState({
                // Whatever was in the state
                ...state,
                // The existing items plus the new item with an initial amount of 1
                items: [...state.items, { ...action.item, amount: 1 }]
            }); // save state

        // REMOVE
        case shoppingCartConstants.REMOVE_CLIENT:
            // Filter the products to exclude items that contain the id of the product to delete
            var filteredItems = state.items.filter((item) => item.productId !== action.item.productId);
            var newState = { ...state, items: filteredItems };

            return saveState(newState); // save state

        // UPDATE
        case shoppingCartConstants.UPDATE_CLIENT:
            // Discard any items with an amount of 0 or less
            var remainingItems = state.items.filter((i) => i.amount >= 1);

            var newState = {
                ...state, items: remainingItems
            };

            return saveState(newState); // save state

        // CLEAR
        case shoppingCartConstants.CLEAR_CLIENT:
            localStorage.removeItem('shoppingCart');
            return saveState(initialState);

        default:
            return state;
    }
}