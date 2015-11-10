import React, { Component, PropTypes } from 'react';

import styles from './Header.css';

class Header extends Component {

    static propTypes = {
        isButtonShow: PropTypes.bool.isRequired,
        goToEditPage: PropTypes.func
    };

    goBack() {
        this.props.history.replaceState(null, '/projects');
    }

    render() {
        let editButton,
            prevPage = null;
        if (this.props.isButtonShow) {
            editButton = <div className={styles.editButton} onClick={this.props.goToEditPage}></div>;
        }
        if (!this.props.goToEditPage) {
            prevPage = <div
                className={styles.prevPage}
                onClick={this.goBack.bind(this)}
            >
            </div>;
        }

        return (
            <header className={styles.header}>
                {prevPage}
                <h1>{this.props.title}</h1>
                {editButton}
            </header>
        );
    }
}

export default Header;
