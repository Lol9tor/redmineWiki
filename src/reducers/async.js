import * as types from '../constants/actionTypes';

export default function(state = {}, action) {
    switch (action.type) {
        case types.LOAD_WIKI:
            return state;
        case types.LOAD_WIKI_SUCCESS:
            return action.payload;
        case types.LOAD_WIKI_FAILURE:
            return {};
        case types.SET_PAGE_TEXT:
            return Object.assign(
                {},
                state,
                { wiki_page: Object.assign({}, state.wiki_page, {text: action.text}) }
            );
        default:
            return state;
    }
}
