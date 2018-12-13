import { statisticsConstants } from '../_constants';
import { statisticsService } from '../_services';
import { alertActions } from './';

export const statisticsActions = {
    getOrders
};

function getOrders(start, end) {
    return dispatch => {
        dispatch(request());

        statisticsService.getOrders(start.toLocaleDateString("en-US"), end.toLocaleDateString("en-US"))
            .then(
                count => {
                    dispatch(success(count));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: statisticsConstants.GETORDERS_REQUEST } }
    function success(count) { return { type: statisticsConstants.GETORDERS_SUCCESS, count } }
    function failure(error) { return { type: statisticsConstants.GETORDERS_FAILURE, error } }
}