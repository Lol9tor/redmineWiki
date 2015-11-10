'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, Redirect } from 'react-router';
import { createHistory } from 'history';
import store from 'stores/state';
import App from 'containers/App';
import EditComponent from 'containers/EditComponent';
import LoginPage from 'containers/LoginPage';
import WikiPage from 'components/WikiPage/WIkiPage';

const history = createHistory();

ReactDOM.render(
    <Provider store={ store }>
        <Router history={ history }>
            <Route path="/">
                <IndexRoute component={ LoginPage } />
                <Route path="projects" component={ App } onEnter={requireAuth}>
                    <Route path=":id" component={ WikiPage }/>
                </Route>
                <Route path="edit" component={ EditComponent } />
            </Route>
            <Redirect from="*" to="/"/>
        </Router>
    </Provider>,
    document.getElementById('root')
);

function requireAuth(nextState, replaceState) {
    const state = store.getState();
    const isLoggedIn = state.isAuthorized;
    if (!isLoggedIn)
        replaceState({
            nextPathname: nextState.location.pathname
        }, '/')
}