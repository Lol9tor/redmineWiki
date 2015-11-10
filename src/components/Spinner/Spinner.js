import React, { Component, PropTypes } from 'react';
import Spin from 'react-spinkit';

import styles from './Spinner.css';

class Spinner extends Component {

    render() {
        return (
            <div className={styles.spinner}>
                <Spin spinnerName="circle" noFadeIn>

                </Spin>
            </div>
        );
    }
}

export default Spinner;

