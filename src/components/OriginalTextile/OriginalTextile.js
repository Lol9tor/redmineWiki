import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import {scrollTo} from '../../utils/DOMHooks';

import styles from './OriginalTextile.css';

class OriginalTextile extends Component {

    static propTypes = {
        textile: PropTypes.string,
        onChange: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.scrollElem = _.debounce(function (el, top) {
            scrollTo(el, top, 200);
        }, 100);
    }

    componentDidUpdate() {
        const scrollTop = Math.round(this.props.coefScrollTop*this.transformElem.scrollHeight);
        this.scrollElem(this.transformElem, scrollTop);
    }

    handleScroll = (e) => {
        this.props.onScroll(e);
    };

    handleMouseOver = () => {
        this.transformElem.addEventListener('scroll', this.handleScroll);
    };

    handleMouseOut = () => {
        this.transformElem.removeEventListener('scroll', this.handleScroll)
    };
    
    render() {
        return (
            <div className={styles.textileContainer}>
                <textarea
                    ref={(transf) => {this.transformElem = transf;}}
                    value={this.props.textile}
                    onChange={this.props.onChange}
                    onMouseOver={this.handleMouseOver}
                    onMouseOut={this.handleMouseOut}
                    className={styles.textile}
                />
            </div>
        );
    }
}

export default OriginalTextile;