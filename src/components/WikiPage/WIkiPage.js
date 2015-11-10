import React, { Component, PropTypes } from 'react';
import * as actions from '../../actions/actions';

import transformTextile from '../../utils/markdownRulesMapping';
import { getParents } from '../../utils/DOMHooks';
import { hasClass } from '../../utils/DOMHooks';

import styles from './WikiPage.css';

class WikiPage extends Component {

    static defaultProps = {
        className: 'internalLinks'
    };

    handleClick(e) {
        e.preventDefault();
        if (hasClass(getParents(e.target), this.props.className)
            || hasClass(e.target, this.props.className)
            || e.target.href) {
            let elem = e.target.href ? e.target : e.target.querySelector('a');
            const str = elem.href.split('/');
            const dest = str[str.length-1];
            this.props.getProjectPage(this.props.params.projectId, dest)
        }
    }

    render() {
        let page = <div>Welcome to wiki pages editor</div>;
        if (this.props.wikiPage) {
            const res = transformTextile(this.props.wikiPage['text'], this.props.params.projectId);
            page = <div dangerouslySetInnerHTML={{__html: res}}></div>
        }
        if (this.props.errorMessage) {
            page = <p>{this.props.errorMessage}</p>;
        }

        return (
            <div className={styles.wikiPage} onClick={this.handleClick.bind(this)}>
                {page}
            </div>
        );
    }
}

export default WikiPage;
