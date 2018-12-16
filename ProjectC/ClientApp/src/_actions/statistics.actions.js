import { statisticsConstants } from '../_constants';
import { statisticsService } from '../_services';
import { alertActions } from './';

export const statisticsActions = {
    getOrders,
    getIncome,
    getTotalUsers
};

function getOrders(start, end) {
    return dispatch => {
        dispatch(request());

        statisticsService.getOrders(start.toLocaleDateString("en-US"), end.toLocaleDateString("en-US"))
            .then(
                orders => {
                    dispatch(success(orders));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: statisticsConstants.GETORDERS_REQUEST } }
    function success(orders) { return { type: statisticsConstants.GETORDERS_SUCCESS, orders } }
    function failure(error) { return { type: statisticsConstants.GETORDERS_FAILURE, error } }
}

function getIncome(start, end) {
    return dispatch => {
        dispatch(request());

        statisticsService.getIncome(start.toLocaleDateString("en-US"), end.toLocaleDateString("en-US"))
            .then(
                income => {
                    dispatch(success(income));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: statisticsConstants.GETINCOME_REQUEST } }
    function success(income) { return { type: statisticsConstants.GETINCOME_SUCCESS, income } }
    function failure(error) { return { type: statisticsConstants.GETINCOME_FAILURE, error } }
}

function getTotalUsers() {
    return dispatch => {
        dispatch(request());

        statisticsService.getTotalUsers()
            .then(
                totalUsers => {
                    dispatch(success(totalUsers));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: statisticsConstants.GETTOTALUSERS_REQUEST } }
    function success(totalUsers) { return { type: statisticsConstants.GETTOTALUSERS_SUCCESS, totalUsers } }
    function failure(error) { return { type: statisticsConstants.GETTOTALUSERS_FAILURE, error } }
}