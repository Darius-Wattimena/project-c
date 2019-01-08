import { authHeader, config } from '../_helpers';
import { authentication } from '../_reducers/authentication.reducer';

export const reviewService = {
    getAll,
    getAllForProduct,
    add,
    remove,
    update,
    getPermissions
};

function getPermissions(productId) {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader() }
    };

    return fetch(config.apiUrl + '/review/GetPermissions/' + productId, requestOptions).then(handleResponse, handleError);
}

function getAllForProduct(productId) {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader() }
    };

    return fetch(config.apiUrl + '/review/GetAllForProduct/' + productId, requestOptions).then(handleResponse, handleError);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader() }
    };

    return fetch(config.apiUrl + '/review/Get/', requestOptions).then(handleResponse, handleError);
}

function add(review) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(review)
    };

    return fetch(config.apiUrl + '/review/create/', requestOptions).then(handleResponse, handleError);
}

function update(review) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(review)
    };

    return fetch(config.apiUrl + '/review/update/' + review.id, requestOptions).then(handleResponse, handleError);
}

function remove(review) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/review/delete/' + review.id, requestOptions).then(handleResponse, handleError);
}

function handleResponse(response) {
    return new Promise((resolve, reject) => {
        if (response.ok) {
            // return json if it was returned in the response
            var contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                response.json().then(json => resolve(json));
            }
            else if (contentType && contentType.includes("text/plain")) {
                response.text().then(text => resolve(text));
            }
            else {
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