import React, { Component, PropTypes } from 'react';

import styles from './EditPageTitle.css';

class EditPageTitle extends Component {

    static defaultProps = {
        link: "http://redcloth.org/hobix.com/textile/"
    };

    static propTypes = {
        title: PropTypes.string,
        clearTextileArea: PropTypes.func,
        saveText: PropTypes.func
    };

    goToRulesPage = () => {
        window.open(this.props.link, '_blank');
    };

    clearText = () => {
        if (window.confirm) {
            const answer = window.confirm('Are you sure you want delete all?');
            if (answer) {
                this.props.clearTextileArea();
            }
        }    
    };

    render() {

        return (
            <div className={styles.title}>
                <div className={styles.titleName}>{this.props.title}</div>
                <div className={styles.controlBarContainer}>
                    <ul className={styles.controlBar}>
                        <li onClick={this.props.saveTextile}>Save</li>
                        <li onClick={this.clearText}>Clear All</li>
                        <li onClick={this.goToRulesPage}>
                            Rules
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default EditPageTitle;
