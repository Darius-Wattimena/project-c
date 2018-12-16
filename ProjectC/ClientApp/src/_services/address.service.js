import { authHeader, config } from '../_helpers';

export const addressService = {
    GetByUser,
    update
};

function GetByUser() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/address/getbyuser', requestOptions).then(handleResponse, handleError);
}

function update(address) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(address)
    };

    return fetch(config.apiUrl + '/address/changeaddress/', requestOptions).then(handleResponse, handleError);
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