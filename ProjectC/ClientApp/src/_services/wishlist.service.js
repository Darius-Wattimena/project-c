import { authHeader, config } from '../_helpers';

export const wishlistService = {
    add,
    getItems,
    remove
};

function add(wishlistItem, wishlistId) {
    // TODO: Implement...
}

function getItems(wishlistId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/wishlist/GetItems/' + wishlistId, requestOptions).then(handleResponse, handleError);
}

function remove(wishlistItem) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/wishlistitem/delete/' + wishlistItem.id, requestOptions).then(handleResponse, handleError);
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