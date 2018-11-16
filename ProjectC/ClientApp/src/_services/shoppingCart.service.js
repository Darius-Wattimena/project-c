import { authHeader, config } from '../_helpers';
import { shoppingCart } from '../_reducers/shoppingCart.reducer';

export const shoppingCartService = {
    create,
    update,
    remove
};

function create(shoppingCartItem) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    };

    return fetch(config.apiUrl + '/shoppingbasketitem/add/' + shoppingCart.id, requestOptions).then(handleResponse, handleError);
}

function update(shoppingCartItem) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(shoppingCartItem)
    };

    return fetch(config.apiUrl + '/shoppingbasketitem/update/' + shoppingCartItem.id, requestOptions).then(handleResponse, handleError);
}

function remove(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/shoppingbasketitem/delete/' + id, requestOptions).then(handleResponse, handleError);
}

function handleResponse(response) {
    return new Promise((resolve, reject) => {
        if (response.ok) {
            // return json if it was returned in the response
            var contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                response.json().then(json => resolve(json));
            } else {
                resolve();
            }
        } else {
            // return error message from response body
            response.text().then(text => reject(text));
        }
    });
}

function handleError(error) {
    return Promise.reject(error && error.message);
}