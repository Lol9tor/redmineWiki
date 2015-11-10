import React, { Component, PropTypes } from 'react';
import * as actions from '../../actions/actions';
import { Link } from 'react-router';

import styles from './ProjectsSidebar.css';

class ProjectsSidebar extends Component {

    static propTypes = {
        projects: PropTypes.array.isRequired,
        getProjectPage: PropTypes.func.isRequired
    };

    handleClick(project) {
        this.props.getProjectPage(project);
    }

    render() {
        return (
            <div className={styles.sidebar}>
                <h2>Project's list</h2>
                <div>
                    <ul>
                        {this.props.projects.map((project) => {
                            return (
                            <li
                                key={project.id}
                                onClick={this.handleClick.bind(this, project)}
                            >
                                <Link to={'/projects/'+project.identifier}>
                                    {project.name}
                                </Link>
                            </li>)
                            }
                        )}
                    </ul>
                </div>
            </div>
        );
    }
}

export default ProjectsSidebar;
