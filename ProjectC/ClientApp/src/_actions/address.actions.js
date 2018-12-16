import { addressConstants } from '../_constants'
import { addressService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const addressActions = {
    getByUser,
    update
};

function getByUser() {
    return dispatch => {

        dispatch(request());

        addressService.GetByUser()
            .then(
                address => dispatch(success(address)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: addressConstants.GET_REQUEST } }
    function success(address) { return { type: addressConstants.GET_SUCCESS, address } }
    function failure(error) { return { type: addressConstants.GET_FAILURE, error } }
}

function update(address) {
    return dispatch => {
        dispatch(request(address));

        addressService.update(address)
            .then(
                () => {
                    dispatch(success());
                    history.goBack();
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    }
    function request() { return { type: addressConstants.PUT_REQUEST } }
    function success(address) { return { type: addressConstants.PUT_SUCCESS, address } }
    function failure(error) { return { type: addressConstants.PUT_FAILURE, error } }
}
