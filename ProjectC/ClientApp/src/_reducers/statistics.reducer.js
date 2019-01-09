import { statisticsConstants } from '../_constants';

var data = {};

export function statistics(state = {}, action) {
    switch (action.type) {

        case statisticsConstants.GETORDERS_REQUEST:
            data = {
                ...data,
                ordersLoading: true
            };
            return { data };
        case statisticsConstants.GETORDERS_SUCCESS:
            data = {
                ...data,
                orders: action.orders,
                ordersLoading: false
            };
            return { data };
        case statisticsConstants.GETORDERS_FAILURE:
            return {
                error: action.error
            };
        case statisticsConstants.GETINCOME_REQUEST:
            data = {
                ...data,
                incomeLoading: true
            };
            return { data };
        case statisticsConstants.GETINCOME_SUCCESS:
            data = {
                ...data,
                income: action.income,
                incomeLoading: false
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
        case statisticsConstants.GET_TOTALPRODUCTS_REQUEST:
            data = {
                ...data,
                totalProductsLoading: true
            };
            return { data };
        case statisticsConstants.GET_TOTALPRODUCTS_SUCCESS:
            data = {
                ...data,
                totalProducts: action.totalProducts,
                totalProductsLoading: false
            };
            return { data };
        case statisticsConstants.GET_TOTALPRODUCTS_FAILURE:
            return {
                error: action.error
            };
        default:
            return state;
    }
}