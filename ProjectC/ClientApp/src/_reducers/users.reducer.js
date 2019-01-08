import { userConstants } from '../_constants';

export function users(state = {}, action) {
    switch (action.type) {
    case userConstants.GETALL_REQUEST:
        return {
            loading: true
        };
    case userConstants.GETALL_SUCCESS:
        return {
            items: action.users
        };
    case userConstants.GETALL_FAILURE:
        return { 
            error: action.error
        };
    case userConstants.DEACTIVATE_REQUEST:
        // add 'deactivating:true' property to user being deactivated
        return {
            ...state,
            deactivating: true,
            items: state.items.map(user =>
                user.id === action.id
                ? { ...user, deactivating: true }
                : user
            )
        };
    case userConstants.DEACTIVATE_SUCCESS:
        // remove deactivated user from state
        return {
            ...state,
            deactivating: false,
            items: state.items.map(user => {
                if (user.id === action.id) {
                    user.active = !user.active;
                    return { ...user, deactivating: false }
                }
                return user;
            })
        };
    case userConstants.DEACTIVATE_FAILURE:
        // remove 'deleting:true' property and add 'deactivateError:[error]' property to user 
        return {
            ...state,
            deactivating: false,
            items: state.items.map(user => {
                if (user.id === action.id) {
                    // make copy of user without 'deactivating:true' property
                    const { deactivating, ...userCopy } = user;
                    // return copy of user with 'deactivateError:[error]' property
                    return { ...userCopy, deactivateError: action.error };
                }

                return user;
            })
        };
    default:
        return state;
    }
}

export function editUser(state = {}, action) {
    switch (action.type) {
    case userConstants.GET_REQUEST:
        return {
            loading: true
        };
    case userConstants.GET_SUCCESS:
        return {
            items: action.user
        };
    case userConstants.GET_FAILURE:
        return {
            error: action.error
        };
    default:
        return state;
    }
}

export function user(state = {}, action) {
    switch (action.type) {
        case userConstants.GET_REQUEST:
            return {
                loading: true
            };
        case userConstants.GET_SUCCESS:
            return {
                items: action.user
            };
        case userConstants.GET_FAILURE:
            return {
                error: action.error
            };
        default:
            return state;
    }
}