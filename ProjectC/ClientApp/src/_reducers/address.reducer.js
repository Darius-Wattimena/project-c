import { addressConstants } from '../_constants';

const initialState = {
    items: []
};

export function address(state = initialState, action) {
    switch (action.type) {
        case addressConstants.GET_REQUEST:
            return {
                loading: true
            };
        case addressConstants.GET_SUCCESS:
            return {
                items: action.address
            };
        case addressConstants.GET_FAILURE:
            return {
                error: action.error
            };
        default:
            return state;
    }
}