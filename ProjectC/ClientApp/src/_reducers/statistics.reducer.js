import { statisticsConstants } from '../_constants';

var data = {};

export function statistics(state = {}, action) {
    switch (action.type) {
        case statisticsConstants.GETORDERS_SUCCESS:
            data = {
                ...data,
                orders: action.orders
            };
            return { data };
        case statisticsConstants.GETORDERS_FAILURE:
            return {
                error: action.error
            };
        case statisticsConstants.GETINCOME_SUCCESS:
            data = {
                ...data,
                income: action.income
            };
            return { data };
        case statisticsConstants.GETINCOME_FAILURE:
            return {
                error: action.error
            };
        case statisticsConstants.GETTOTALUSERS_SUCCESS:
            data = {
                ...data,
                totalUsers: action.totalUsers
            };
            return { data };
        case statisticsConstants.GETTOTALUSERS_FAILURE:
            return {
                error: action.error
            };
        default:
            return state;
    }
}