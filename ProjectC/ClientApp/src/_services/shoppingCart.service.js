import { authHeader, config } from '../_helpers';

export const shoppingCartService = {
    add,
    getBasketItems,
    update,
    remove,
    clear
};

function add(shoppingBasketItem) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(shoppingBasketItem)
    };

    return fetch(config.apiUrl + '/shoppingbasketitem/add/', requestOptions).then(handleResponse, handleError);
}

function getBasketItems() {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    };

    return fetch(config.apiUrl + '/shoppingbasket/GetBasketItems/', requestOptions).then(handleResponse, handleError);
}

function update(shoppingBasketItem) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(shoppingBasketItem)
    };

    return fetch(config.apiUrl + '/shoppingbasketitem/update/' + shoppingBasketItem.product.id, requestOptions).then(handleResponse, handleError);
}

function remove(shoppingBasketItem) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/shoppingbasketitem/delete/' + shoppingBasketItem.product.id, requestOptions).then(handleResponse, handleError);
}

function clear() {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/shoppingbasket/clear/', requestOptions).then(handleResponse, handleError);
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