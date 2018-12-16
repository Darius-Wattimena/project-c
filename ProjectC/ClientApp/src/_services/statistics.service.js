import { authHeader, config } from '../_helpers';

export const statisticsService = {
    getOrders,
    getIncome,
    getTotalUsers
};

function getOrders(start, end) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/statistics/getOrders?s=' + start + "&e=" + end, requestOptions).then(handleResponse, handleError);
}

function getIncome(start, end) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/statistics/getIncome?s=' + start + "&e=" + end, requestOptions).then(handleResponse, handleError);
}

function getTotalUsers() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/statistics/getTotalUsers', requestOptions).then(handleResponse, handleError);
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