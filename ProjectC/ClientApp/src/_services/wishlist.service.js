import { authHeader, config } from '../_helpers';

export const wishlistService = {
    add,
    remove,
    getWishlistItems,
    getMyWishlists,
    create,
    update,
    deleteWishlist
};

function add(wishlistItem) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(wishlistItem)
    };

    console.log(wishlistItem);

    return fetch(config.apiUrl + '/wishlistitem/create/', requestOptions).then(handleResponse, handleError);
}

function getMyWishlists() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/wishlist/GetMyWishlists/', requestOptions).then(handleResponse, handleError);
}

function getWishlistItems(wishlistId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/wishlist/GetItems/' + wishlistId, requestOptions).then(handleResponse, handleError);
}

function create(wishlist) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(wishlist)
    };

    return fetch(config.apiUrl + '/wishlist/create/', requestOptions).then(handleResponse, handleError);
}

function update(wishlist) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(wishlist)
    };

    return fetch(config.apiUrl + '/wishlist/update/' + wishlist.id, requestOptions).then(handleResponse, handleError);
}

function deleteWishlist(wishlistId) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/wishlist/delete/' + wishlistId, requestOptions).then(handleResponse, handleError);
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