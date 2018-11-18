﻿import { shoppingCartConstants } from '../_constants';


const initialState = {
    items: []
};

export function shoppingCart(state = initialState, action) {

    switch (action.type) {

        // GET ITEMS
        case shoppingCartConstants.GET_REQUEST:
            return {
                ...state,
                loading: true
            };
            break;

        case shoppingCartConstants.GET_SUCCESS:
            return {
                items: action.items
            };
            break;

        case shoppingCartConstants.GET_FAILURE:
            return {
                ...state,
                error: action.error
            };
            break;

        // ADD ITEM
        case shoppingCartConstants.ADD_REQUEST:
            return {
                ...state,
                loading: true
            };
            break;

        /*
        case shoppingCartConstants.ADD_SUCCESS:
            return {
                ...state,
                // Add the 'added' item to the collection
                items: [...state.items, action.item]
            };
            break;
        */

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
            break;

        case shoppingCartConstants.UPDATE_SUCCESS:

            // Discard any items with an amount of 0 or less
            var remainingItems = state.items.map(item =>
                                    item.productId === action.item.productId
                                        ? action.item
                                        : item);

            remainingItems = remainingItems.filter((i) => i.amount >= 1);

            return {
                ...state,
                // REPLACE old item with updated item
                items: remainingItems
            };
            break;

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
            break;

        case shoppingCartConstants.REMOVE_SUCCESS:
            return {
                ...state,
                // Exclude removed item
                items: state.items.filter(i => i.productId !== action.item.productId)
            };
            break;

        // CLIENT SIDED
        // ADD
        case shoppingCartConstants.ADD_CLIENT:

            // If the item already exists in the shopping cart:
            if (state.items.some(i => i.productId === action.item.productId)) {

                // Increment the amount of that product
                state.items.map(i => {
                    if (i.productId === action.item.id)
                        i.amount += 1;
                });

                return state;
            }

            // otherwise
            return {
                // Whatever was in the state
                ...state,
                // The existing items plus the new item
                items: [...state.items, action.item]
            };

        // REMOVE
        case shoppingCartConstants.REMOVE_CLIENT:
            // Filter the products to exclude items that contain the id of the product to delete
            var filteredItems = state.items.filter((item) => item.productId !== action.item.productId);
            return { ...state, items: filteredItems };

        // UPDATE
        case shoppingCartConstants.UPDATE_CLIENT:
            // Discard any items with an amount of 0 or less
            var remainingItems = state.items.filter((i) => i.amount >= 1);

            return {
                ...state, items: remainingItems
            };


        default:
            return state
    }
}