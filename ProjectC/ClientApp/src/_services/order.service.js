﻿import { authHeader, config } from '../_helpers';

export const orderService = {
    create,
    getAll,
    GetByUser,
    getPending,
    setOrderStatusConfirmed,
    setOrderStatusSend
};

// Create a new order to be added to the database
// Requires a collection of shopping cart items
function create(shoppingCartItems) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(shoppingCartItems)
    };

    return fetch(config.apiUrl + '/order/create', requestOptions).then(handleResponse, handleError);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/order/get', requestOptions).then(handleResponse, handleError);
}

function getPending() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/order/getPendingOrders', requestOptions).then(handleResponse, handleError);
}

function setOrderStatusConfirmed(id) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader() }
    };

    return fetch(config.apiUrl + '/order/setOrderAsConfirmed/' + id, requestOptions).then(handleResponse, handleError);
}

function setOrderStatusSend(id) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader() }
    };

    return fetch(config.apiUrl + '/order/setOrderAsSend/' + id, requestOptions).then(handleResponse, handleError);
}

function GetByUser() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/order/getbyuser', requestOptions).then(handleResponse, handleError);
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