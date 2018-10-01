import { productConstants } from '../_constants';
import { productService } from '../_services';

export const productActions = {
    getAll,
    add
};

function getAll() {
    return dispatch => {
        /*
        dispatch(request());

        productService.getAll()
            .then(
            products => dispatch(success(products)),
                error => dispatch(failure(error))
            );
            */
    };

    //function request() { return { type: productConstants.GETALL_REQUEST } }
    //function success(products) { return { type: productConstants.GETALL_SUCCESS, products } }
    //function failure(error) { return { type: productConstants.GETALL_FAILURE, error } }
}

function add(product) {
    return dispatch => {
        //dispatch(request(product));

        productService.add(product)
            .then(
                () => {
                    //dispatch(success());
                    //history.push('/adminpanel');
                    //dispatch(alertActions.success('Added product'));
                },
                error => {
                   // dispatch(failure(error));
                    //dispatch(alertActions.error(error));
                }
            );
    };

    //function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    //function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    //function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}