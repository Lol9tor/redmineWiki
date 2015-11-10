import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';

import Spinner from '../components/Spinner/Spinner';
import styles from './LoginPage.css';

class LoginPage extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            error: ''
        }
    }

    componentWillMount() {
        this.props.getAuthToken();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isAuthorized) {
            this.props.getApiKey();
            if (nextProps.currentUser && nextProps.currentUser.api_key) {
                this.props.history.replaceState(null, '/projects');
                this.props.getUserInfo();
                this.props.loadProjects();
            }
        }
    }

    handleClick = () => {
        if (!this.state.password || !this.state.username) {
            alert('Fields can\'t be empty!');
            return;
        }
        const obj = {
            authToken: this.props.authToken,
            username: this.state.username,
            password: this.state.password
        };
        this.props.authenticate(obj);
    };

    handleKeyUp = (e) => {
        if (e.keyCode === 13) {
            this.handleClick();
        }
    };

    handleChange = () => {
        this.setState({
            username: this.username.value,
            password: this.password.value
        });
    };

    render() {
        return (
            <div className={styles.loginWrapper}>
                <div onKeyUp={this.handleKeyUp}>
                    <input
                        type="text"
                        placeholder="Input login"
                        value={this.state.username}
                        onChange={this.handleChange}
                        ref = {(elem) => {this.username = elem;}}
                    />
                    <input
                        type="password"
                        placeholder="Input password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        ref = {(elem) => {this.password = elem;}}
                    />
                </div>
                <div>{this.props.errorMessage}</div>
                <button onClick={this.handleClick} disabled={this.props.isLoading}>
                    {this.props.isLoading ? 'Loading...': 'Login'}
                </button>
            </div>
        )
    }
}

export default connect(
    (state) => {
        return {
            isAuthorized: state.isAuthorized,
            authToken: state.authToken,
            currentUser: state.currentUser,
            isLoading: state.ui.isLoading,
            errorMessage: state.ui.errorMessage
        };
    },
    (dispatch) => bindActionCreators(actions, dispatch)
)(LoginPage);

