import { wishlistConstants } from "../_constants"


export const wishlistActions = {
    removeProduct,
};

function removeProduct(product) {
    return dispatch => {
        dispatch(remove(product));
    }

    function remove(product) { return { type: wishlistConstants.REMOVE_WISHLISTPRODUCT, product } }
}