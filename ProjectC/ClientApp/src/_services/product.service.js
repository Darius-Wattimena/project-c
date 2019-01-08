import { authHeader, config } from '../_helpers';

export const productService = {
    getAll,
    getById,
    getWithSpecifications,
    getAllWithSpecifications,
    getAllWithoutSpecifications,
    _delete,
    add,
    search,
    changeStock,
    update
};

// Returns a collection of all products
function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/product/get', requestOptions).then(handleResponse, handleError);
}

function getAllWithoutSpecifications() {
    const requestOptions = {
        method: "GET",
        headers: authHeader()
    };

    return fetch(config.apiUrl + "/product/GetAllWithoutSpecifications", requestOptions).then(handleResponse, handleError);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/product/get/' + id, requestOptions).then(handleResponse, handleError);
}

function search(searchValue) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/product/customSearch/' + searchValue, requestOptions).then(handleResponse, handleError);
}

function getWithSpecifications(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/product/getWithSpecifications/' + id, requestOptions).then(handleResponse, handleError);
}

function getAllWithSpecifications() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/product/getAllWithSpecifications', requestOptions).then(handleResponse, handleError);
}

// Add a product to the database
function add(product, specifications) {
    var body = {}
    body.product = product;
    body.specifications = specifications

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(body)
    };

    return fetch(config.apiUrl + '/product/createWithSpecifications', requestOptions).then(handleResponse, handleError);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/product/delete/' + id, requestOptions).then(handleResponse, handleError);
}

function update(product, specifications) {
    var body = {}
    body.product = product;
    body.specifications = specifications

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(body)
    };

    return fetch(config.apiUrl + '/product/updateWithSpecifications', requestOptions).then(handleResponse, handleError);
}

function changeStock(product, newStock) {
    var body = {}
    body.product = product;
    body.newStock = newStock;

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };

    return fetch(config.apiUrl + '/product/changeStock', requestOptions).then(handleResponse, handleError);
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