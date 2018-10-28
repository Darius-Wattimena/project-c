import { specificationConstants } from '../_constants';
import { specificationService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const specificationActions = {
    add
};

function add(specifications, id) {
    return dispatch => {
        dispatch(request(specifications));

        specificationService.add(specifications, id)
            .then(
                () => {
                    dispatch(success());
                    history.push('/adminpanel/products');
                    dispatch(alertActions.success('Added specifications to the product.'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(specifications) { return { type: specificationConstants.ADD_REQUEST, specifications } }
    function success(specifications) { return { type: specificationConstants.ADD_SUCCESS, specifications } }
    function failure(error) { return { type: specificationConstants.ADD_FAILURE, error } }
}