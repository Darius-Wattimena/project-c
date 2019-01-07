import { reviewConstants } from '../_constants';

const initialState = {
    reviews: [],
    canPost: false
};

export function review(state = initialState, action) {
    switch (action.type) {
        //GET
        case reviewConstants.GET_REQUEST:
            return {
                ...state,
                loading: true,
                sending: false
            };

        case reviewConstants.GET_SUCCESS:
            return {
                ...state,
                loading: false,
                reviews: action.reviews,
                sent: false
            };

        case reviewConstants.GET_FAILURE:
            return {
                ...state,
                loading: false,
                sent: false,
                error: action.error
            };

        //ADD
        case reviewConstants.ADD_REQUEST:
            return {
                ...state,
                sending: true
            };

        case reviewConstants.ADD_SUCCESS:
            return {
                ...state,
                sending: false,
                sent: true,
                canPost: false
            }

        case reviewConstants.ADD_FAILURE:
            return {
                ...state,
                sending: false,
                error: action.error
            }

        // Allow user to post a review
        case reviewConstants.ALLOW_POST:
            return {
                ...state,
                canPost: true
            }

        // DELETE
        case reviewConstants.DELETE_REQUEST:
            return {
                ...state,
                deleting : true
            }

        case reviewConstants.DELETE_SUCCESS:
        case reviewConstants.DELETE_FAILURE:
            return {
                ...state,
                deleting: false
            }

        default:
            return state;
    }
}