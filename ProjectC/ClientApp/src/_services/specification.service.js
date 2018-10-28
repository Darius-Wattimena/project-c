import { authHeader, config } from '../_helpers';

export const specificationService = {
    getAllByProductId,
    add,
    update,
    _delete
};

function getAllByProductId(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/specification/getbyproduct/' + id, requestOptions).then(handleResponse, handleError);
}

function add(specification, pid) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(specification)
    };

    return fetch(config.apiUrl + '/specification/CreateSpecificationsForProduct/' + pid, requestOptions).then(handleResponse, handleError);
}

function update(specification) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(specification)
    };

    return fetch(config.apiUrl + '/specification/update/' + specification.id, requestOptions).then(handleResponse, handleError);
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/specification/delete/' + id, requestOptions).then(handleResponse, handleError);
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