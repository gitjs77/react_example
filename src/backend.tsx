import fetch from 'isomorphic-fetch';

async function parseResponse(response) {
    let contentType = response.headers.get('content-type');

    const text = await response.text();

    if (!contentType || contentType.indexOf('application/json') == -1)
        return text;

    // convert LocalDate, LocalDateTime to js Date object
    return JSON.parse(text, (key, val) => {
        if (typeof val == 'string') {
            // LocalDateTime
            if (/^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d.\d\d\dZ$/.test(val)) {
                return new Date(val);
            }

            // LocalDate
            if (/^\d\d\d\d-\d\d-\d\d$/.test(val)) {
                return new Date(val);
            }
        }

        return val;
    });
}

export function get(resource, params = undefined) {
    return rest('GET', resource, params, undefined);
}

export function post(resource, body = {}, qs = undefined) {
    return rest('POST', resource, qs, body);
}

export function put(resource, body = {}, qs = undefined) {
    return rest('PUT', resource, qs, body);
}

export function del(resource) {
    return rest('DELETE', resource, undefined, undefined);
}

export function rest(method, url, queryString, body) {
    const headers = {};

    if (typeof body == 'object' || typeof body == 'number') { // JSON request
        if (!(body instanceof FormData)) {
            headers['Content-Type'] = 'application/json';
            body = JSON.stringify(body);
        }
    }

    return new Promise((resolve, reject) => {
        fetch(url, {
            method,
            body,
            headers,
            cache: 'no-cache',
            credentials: 'same-origin'
        })
            .then(response => parseResponse(response))
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}