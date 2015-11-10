import React, { Component, PropTypes } from 'react';
import {scrollTo} from '../../utils/DOMHooks';
import _ from 'underscore';

import styles from './TransformedTextile.css';

class TransformedTextile extends Component {

    static propTypes = {
        transformed: PropTypes.string,
        coefScrollTop: PropTypes.number
    };

    constructor() {
        super();
    }

    handleClick(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    componentDidMount() {
        this.scrollElem = _.debounce(function (el, top) {
            scrollTo(el, top, 200);
        }, 100);
    }

    componentDidUpdate() {
        const scrollTop = Math.round(this.props.coefScrollTop*this.transformElem.scrollHeight);
        this.scrollElem(this.transformElem, scrollTop);
        //this.transformElem.scrollTop = scrollTop;
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
            <div
                ref = {(transf) => {this.transformElem = transf;}}
                className={styles.transformedContainer}
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}
            >
                <div
                    onClick = {this.handleClick}
                    className={styles.transformed}
                    dangerouslySetInnerHTML={{__html: this.props.transformed}}
                >
                </div>
            </div>
        );
    }
}

export default TransformedTextile;
