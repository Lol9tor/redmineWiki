import * as types from '../constants/actionTypes';
import * as urls from '../constants/urls';
import * as requests from '../utils/api';

export function loadProjects(obj) {
    return {
        type: types.PROMISE,
        types: [
            types.LOAD_PROJECTS,
            types.LOAD_PROJECTS_SUCCESS,
            types.LOAD_PROJECTS_FAILURE
        ],
        promise: requests.getProjects(obj)
    };
}

export function loadPage(obj) {
    return {
        type: types.PROMISE,
        types: [
            types.LOAD_WIKI,
            types.LOAD_WIKI_SUCCESS,
            types.LOAD_WIKI_FAILURE
        ],
        promise: requests.getWikiPage(obj)
    };
}

export function savePage(obj) {
    return {
        type: types.PROMISE,
        types: [
            types.SAVE_WIKI,
            types.SAVE_WIKI_SUCCESS,
            types.SAVE_WIKI_ERROR
        ],
        promise: requests.saveWikiPage(obj)
    };
}

export function setPageText(text) {
    return {
        type: types.SET_PAGE_TEXT,
        text
    }
}

export function getAuthToken() {
    return {
        type: types.PROMISE,
        types: [
            types.GET_AUTH,
            types.GET_AUTH_SUCCESS,
            types.GET_AUTH_ERROR
        ],
        promise: requests.getAuthToken()
    };
}

export function getApiKey() {
    return {
        type: types.PROMISE,
        types: [
            types.GET_API_KEY,
            types.GET_API_KEY_SUCCESS,
            types.GET_API_KEY_ERROR
        ],
        promise: requests.getApiKey()
    };
}

export function authenticate(obj) {
    return {
        type: types.PROMISE,
        types: [
            types.AUTHENTICATE,
            types.AUTHENTICATE_SUCCESS,
            types.AUTHENTICATE_ERROR
        ],
        promise: requests.authenticate(obj)
    };
}

export function getUserInfo() {
    return {
        type: types.PROMISE,
        types: [
            types.GET_CURRENT_USER,
            types.GET_CURRENT_USER_SUCCESS,
            types.GET_CURRENT_USER_ERROR
        ],
        promise: requests.getUserInfo()
    }
}

export function getCurrentUser() {
    return {
        type: types.GET_CURRENT_USER
    }
}

export function setCurrentUser(user) {
    return {
        type: types.SET_CURRENT_USER,
        user
    }
}

export function getCurrentProject() {
    return {
        type: types.GET_CURRENT_PROJECT
    }
}

export function setCurrentProject(project) {
    return {
        type: types.SET_CURRENT_PROJECT,
        project
    }
}
