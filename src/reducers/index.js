import * as types from '../constants/actionTypes';
import wikiPage from './async';
import { findAuthToken } from '../utils/DOMHooks';
import { findError } from '../utils/DOMHooks';
import { findApiKey } from '../utils/DOMHooks';

export function ui(state = {
    errorMessage: '',
    isLoading: false
}, action) {
    switch (action.type) {
    case types.LOAD_WIKI:
    case types.AUTHENTICATE:
    case types.LOAD_PROJECTS:
    case types.SAVE_WIKI:
        return Object.assign(...state, {
            isLoading: true,
            errorMessage: ''
        });
    case types.AUTHENTICATE_SUCCESS:
    case types.LOAD_WIKI_SUCCESS:
    case types.LOAD_PROJECTS_SUCCESS:
    case types.SAVE_WIKI_SUCCESS:
        return Object.assign(...state, {
            isLoading: false,
            errorMessage: findError(action.payload)
        });
    case types.LOAD_WIKI_FAILURE:
    case types.AUTHENTICATE_ERROR:
    case types.LOAD_PROJECTS_FAILURE:
    case types.SAVE_WIKI_ERROR:
        let errorMessage = action.error.message;
        if (action.error.message === 'Unexpected end of input') {
            errorMessage = 'Wiki page for this project is not exist'
        }
        return Object.assign(...state, {
            isLoading: false,
            errorMessage: errorMessage
        });
    default:
        return state;
    }
}

export function projects(state = [], action) {
    switch (action.type) {
    case types.LOAD_PROJECTS:
        return state;
    case types.LOAD_PROJECTS_SUCCESS:
        return action.payload.projects;
    case types.LOAD_PROJECTS_FAILURE:
        return state;
    default:
        return state;
    }
}

export function currentUser(state = null, action) {
    switch (action.type){
    case types.GET_CURRENT_USER:
        return state;
    case types.GET_CURRENT_USER_SUCCESS:
        return action.payload.user;
    case types.GET_CURRENT_USER_ERROR:
        return null;
    case types.GET_API_KEY:
        return state;
    case types.GET_API_KEY_SUCCESS:
        const key = findApiKey(action.payload);
        return {api_key: key};
    default:
        return state;
    }
}

export function authToken(state = '', action) {
    switch (action.type){
    case types.GET_AUTH:
        return state;
    case types.GET_AUTH_SUCCESS:
    case types.AUTHENTICATE_SUCCESS:
        return findAuthToken(action.payload);
    case types.GET_AUTH_ERROR:
        return '';
    default:
        return state;
    }
}

export function isAuthorized(state = false, action) {
    switch (action.type){
    case types.AUTHENTICATE:
        return state;
    case types.AUTHENTICATE_SUCCESS:
        return !findError(action.payload);
    case types.AUTHENTICATE_ERROR:
        return false;
    default:
        return state;
    }
}

export function currentProject(state = {}, action) {
    switch (action.type) {
    case types.GET_CURRENT_PROJECT:
        return state;
    case types.SET_CURRENT_PROJECT:
        return action.project;
    default:
        return state;
    }
}

export {wikiPage};
