import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {useRoutes} from 'react-router';
import reactMixin from 'react-mixin';
import * as actions from '../actions/actions';
import transformTextile from '../utils/markdownRulesMapping';
import { Lifecycle } from 'react-router';

import OriginalTextile from '../components/OriginalTextile/OriginalTextile';
import TransformedTextile from '../components/TransformedTextile/TransformedTextile';
import Header from '../components/Header/Header';
import EditPageTitle from '../components/EditPageTitle/EditPageTitle';

import styles from './EditComponent.css';

@reactMixin.decorate(Lifecycle)
class EditComponent extends Component {

    constructor() {
        super();
        this.state = {
            textile: '',
            transformed: '',
            coefScrollTop: 0
        };
    }

    componentWillMount() {

        if (this.props.wikiPage.text) {
            const transformed = this.getTransformedHtml(this.props.wikiPage.text);
            this.setState({
                textile: this.props.wikiPage.text,
                transformed: transformed
            })
        } else {
            this.props.history.replaceState(null, '/projects')
        }
    }

    handleScroll(e) {
        const elem = e.currentTarget;
        this.setState({
            coefScrollTop: elem.scrollTop/elem.scrollHeight
        });
    }

    getTransformedHtml(text) {
        return transformTextile(text, this.props.currentProject.identifier);
    }

    onChange(e) {
        const transformed = this.getTransformedHtml(e.currentTarget.value);
        this.setState({
            textile: e.currentTarget.value,
            transformed: transformed
        });
    }

    clearTextileArea = () => {
        this.setState({
            textile: '',
            transformed: ''
        });
    };

    saveTextile = () => {
        const obj = {
            project: this.props.currentProject.identifier,
            subProject: '',
            body: {
                "_method": "put",
                "authenticity_token": this.props.authToken,
                "content[text]": this.state.textile,
                "commit": "Save",
                "content[comments]": ""
            }
        };
        if (this.state.textile === this.props.wikiPage.text) {
            alert('Nothing changed!')
        } else if (window.confirm('Are you sure you want save this text?')) {
            this.props.savePage(obj).then( () => {
                this.props.setPageText(this.state.textile);
                this.props.history.replaceState(null, '/projects');
            });
        }
    };

    routerWillLeave = () => {
        if (this.state.textile !== this.props.wikiPage.text) {
            return window.confirm('You have unsaved data! Are you sure you want to leave this window?');
        } else {
            return true;
        }
    };

    render() {
        return (
            <div>
                <div className={styles.headerContainer}>
                    <Header
                        history={this.props.history}
                        isButtonShow={false}
                        title="Edit page"
                    />
                    <EditPageTitle
                        title={this.props.currentProject.name}
                        saveTextile={this.saveTextile}
                        clearTextileArea={this.clearTextileArea}
                    />
                </div>
                <div className={styles.contentContainer}>
                    <OriginalTextile
                        textile={this.state.textile}
                        coefScrollTop={this.state.coefScrollTop}
                        onChange={(...args)=> this.onChange(...args)}
                        onScroll={(...args)=> this.handleScroll(...args)}
                    />
                    <TransformedTextile
                        transformed={this.state.transformed}
                        coefScrollTop={this.state.coefScrollTop}
                        onScroll={(...args)=> this.handleScroll(...args)}
                    />
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            wikiPage: state.wikiPage['wiki_page'] || {},
            currentProject: state.currentProject,
            authToken: state.authToken,
            currentUser: state.currentUser,
            isLoading: state.ui.isLoading
        }
    },
    (dispatch) => bindActionCreators(actions, dispatch)
)(EditComponent);
