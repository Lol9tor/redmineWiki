import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';

import ProjectsSidebar from '../components/ProjectsSidebar/ProjectsSidebar';
import WikiPage from '../components/WikiPage/WIkiPage';
import Spinner from '../components/Spinner/Spinner';
import Header from '../components/Header/Header';

import './App.css';

class App extends Component {
    static propTypes = {
        loadProjects: PropTypes.func.isRequired,
        loadPage: PropTypes.func.isRequired,
        counter: PropTypes.number,
        isLoading: PropTypes.bool.isRequired,
        errorMessage: PropTypes.string,
        currentProject: PropTypes.object.isRequired
    };
/*    constructor(props) {
        super(props);
        if (!this.props.isAuthorized) {
            this.props.history.replaceState(null, '/');
        }
    }*/

    getProjectPage(project, subProject) {
        subProject = subProject ? subProject : '';

        if (typeof project === 'object') {
            this.props.setCurrentProject(project);
            project = project.identifier;
        }
        const obj = {
            project: project,
            subProject: subProject
        };
        this.props.loadPage(obj);
    }
    goToEditPage() {
        this.props.history.pushState(null, '/edit');
    }
    render() {
        let spinner;
        if (this.props.isLoading) {
            spinner = <Spinner />;
        }
        const wikiPage = <WikiPage
            params={ {projectId: this.props.currentProject.identifier} }
            getProjectPage={(...args)=> this.getProjectPage(...args)}
            wikiPage={this.props.wikiPage}
            errorMessage={this.props.errorMessage}
        />;

        return (
            <div className="wrapper">
                <Header
                    isButtonShow={!!this.props.wikiPage}
                    goToEditPage={(...args)=> this.goToEditPage(...args)}
                    title='Redmine tools'
                />
                <ProjectsSidebar
                    getProjectPage={(...args)=> this.getProjectPage(...args)}
                    projects={this.props.projects}
                />
                {wikiPage}
                {spinner}
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            wikiPage: state.wikiPage['wiki_page'],
            projects: state.projects,
            currentProject: state.currentProject,
            ui: state.ui,
            errorMessage: state.ui.errorMessage,
            isLoading: state.ui.isLoading,
            isAuthorized: state.isAuthorized,
            currentUser: state.currentUser
        };
    },
    (dispatch) => bindActionCreators(actions, dispatch)
)(App);
