import { statisticsConstants } from '../_constants';

export function statistics(state = {}, action) {
    switch (action.type) {
        case statisticsConstants.GETORDERS_SUCCESS:
            return {
                data: action.count
            };
        case statisticsConstants.GETORDERS_FAILURE:
            return {
                error: action.error
            };
        default:
            return state;
    }
}