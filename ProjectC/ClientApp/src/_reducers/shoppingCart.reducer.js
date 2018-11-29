import { shoppingCartConstants } from '../_constants';


const initialState = {
    items: []
};

function setLocalShoppingCart(state) {
    localStorage.setItem('shoppingCart', JSON.stringify(state));
}

export function shoppingCart(state = initialState, action) {

    switch (action.type) {

        // GET ITEMS
        case shoppingCartConstants.GET_REQUEST:
            return {
                ...state,
                loading: true
            };

        case shoppingCartConstants.GET_SUCCESS:
            return {
                items: action.items
            };

        case shoppingCartConstants.GET_FAILURE:
            return {
                ...state,
                error: action.error
            };

        // ADD ITEM
        case shoppingCartConstants.ADD_REQUEST:
            return {
                ...state,
                adding: action.item
            };

        case shoppingCartConstants.ADD_SUCCESS:
            return {
                ...state,
                adding: null
            }

        // UPDATE ITEM
        case shoppingCartConstants.UPDATE_REQUEST:
            return {
                ...state,
                // Set updating property to true for targeted item
                items: state.items.map(item =>
                    item.productId === action.item.productId
                        ? { ...item, updating: true }
                        : item
                )
            };

        case shoppingCartConstants.UPDATE_SUCCESS:

            // Discard any items with an amount of 0 or less
            var remainingItems = state.items.map(item =>
                                    item.productId === action.item.productId
                                        ? action.item // updated item
                                        : item);      // untouched item

            remainingItems = remainingItems.filter((i) => i.amount >= 1);

            console.log(remainingItems);

            return {
                ...state,
                // REPLACE old item with updated item
                items: remainingItems
            };

        // REMOVE ITEM
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
            return {
                ...state,
                // Exclude removed item
                items: state.items.filter(i => i.productId !== action.item.productId)
            };

        // CLEAR CART
        case shoppingCartConstants.CLEAR_REQUEST:
            return {
                ...state,
                loading: true
            };

        case shoppingCartConstants.CLEAR_SUCCESS:
            return initialState;

        // CLIENT SIDED
        //GET
        case shoppingCartConstants.GET_CLIENT:
            var cart = JSON.parse(localStorage.getItem('shoppingCart'));
            if (cart) {
                console.log(cart);
                console.log(state);
                return cart;
            }
            return state;

        // ADD
        case shoppingCartConstants.ADD_CLIENT:

            // If the item already exists in the shopping cart:
            if (state.items.some(i => i.productId === action.item.productId)) {

                // Increment the amount of that product
                state.items.map(i => {
                    if (i.productId === action.item.id)
                        i.amount += 1;
                });

                setLocalShoppingCart(state); // store in cookies
                return state;
            }

            // otherwise
            var newState = {
                // Whatever was in the state
                ...state,
                // The existing items plus the new item
                items: [...state.items, { ...action.item, amount: 1 }]
            };

            setLocalShoppingCart(newState); // store in cookies
            return newState;

        // REMOVE
        case shoppingCartConstants.REMOVE_CLIENT:
            // Filter the products to exclude items that contain the id of the product to delete
            var filteredItems = state.items.filter((item) => item.productId !== action.item.productId);
            var newState = { ...state, items: filteredItems };

            setLocalShoppingCart(newState); // store in cookies
            return newState;

        // UPDATE
        case shoppingCartConstants.UPDATE_CLIENT:
            // Discard any items with an amount of 0 or less
            var remainingItems = state.items.filter((i) => i.amount >= 1);

            var newState = {
                ...state, items: remainingItems
            };

            setLocalShoppingCart(newState); // store in cookies
            return newState;

        // CLEAR
        case shoppingCartConstants.CLEAR_CLIENT:

            localStorage.removeItem('shoppingCart');
            return initialState;

        default:
            return state
    }
}