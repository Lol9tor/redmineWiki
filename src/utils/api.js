import fetch from 'isomorphic-fetch';
import * as urls from '../constants/urls';
import store from 'stores/state';

function sendRequest(obj) {
    const url = urls.BASE_URL + obj.url;
    let body = null,
        headers = obj.headers || {},
        userApiKey = '';

    if (store.getState().currentUser) {
        userApiKey = store.getState().currentUser.api_key;
    }

    return fetch(url, {
        method: obj.method,
        credentials: 'include',
        headers: Object.assign({}, headers, {
            "X-Redmine-API-Key": userApiKey
        }),
        body: obj.body || body
    }).then((response) => {
        console.log(response.headers.get('Content-Type'));
        const type = response.headers.get('Content-Type');
        if (type.indexOf('application/json') >= 0) {
            return response.json();
        } else {
            return response.text();
        }
    })

}

function transformBodyToEncodedString(body) {
    if (typeof body !== 'object') {
        return body;
    }
    let arr = [];
    for (let i in body) {
        if (body.hasOwnProperty(i)) {
            arr.push(encodeURIComponent(i) + "=" + encodeURIComponent(body[i]));
        }
    }
    return arr.join('&');
}

function transformBodyToMultipart(body) {
    if (typeof body !== 'object') {
        return body;
    }
    let formData = new FormData();
    for (let i in body) {
        if (body.hasOwnProperty(i)) {
            formData.append(i, body[i]);
        }
    }
    return formData;
}

export function getAuthToken() {
    const obj = {
        method: 'GET',
        url: ''
    };
    return sendRequest(obj);
}

export function authenticate(params) {
    const obj = {
        method: 'POST',
        url: '/login',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: `utf8=%E2%9C%93&authenticity_token=${encodeURIComponent(params.authToken)}&back_url=https%3A%2F%2Fcollab.mobidev.biz%2F&username=${params.username}&password=${params.password}&login=%D0%92%D1%85%D0%BE%D0%B4+%C2%BB`
    };
    return sendRequest(obj);
}

export function getApiKey() {
    const obj = {
        method: 'GET',
        url: '/my/account'
    };
    return sendRequest(obj);
}

export function getUserInfo() {
    const obj = {
        method: 'GET',
        url: '/users/current'+urls.TYPE_RECEIVED_DATA
    };
    return sendRequest(obj);
}

export function getProjects() {
    const limitation = '?limit=100',
        obj = {
            method: 'GET',
            url: urls.PROJECTS+urls.TYPE_RECEIVED_DATA+limitation
    };
    return sendRequest(obj);
}

export function getWikiPage(params) {
    const subProject = params.subProject ? `/${params.subProject}`: '',
        obj = {
        method: 'GET',
        url: `${urls.PROJECTS}/${params.project}${urls.WIKI}${subProject}${urls.TYPE_RECEIVED_DATA}`
    };
    return sendRequest(obj);
}

export function saveWikiPage(params) {
    const subProject = params.subProject ? `/${params.subProject}`: '',
        obj = {
        method: 'POST',
        body: transformBodyToMultipart(params.body),
        url: `${urls.PROJECTS}/${params.project}${urls.WIKI}${subProject}/Wiki`
    };
    return sendRequest(obj);
}
