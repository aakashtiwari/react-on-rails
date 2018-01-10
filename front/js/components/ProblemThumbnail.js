/**
 * @fileOverview Problem Thumbnail component.
 */

import React from 'react';
import PropTypes from 'prop-types';

export default class ProblemThumbnail extends React.Component {
  static propTypes = {
    problems: PropTypes.isRequired,
    fetchAllProblems: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchAllProblems();
  }

  render() {
    const divStyle = {
      width: '300px',
      height: '325px',
    };

    if (this.props.problems == null) {
      return false;
    }
    return (
      <div>
        {this.props.problems.map(problem => (
          <a key={problem.id} href={`/problems/${problem.id}`} className="inline-block">
            <div className="img-thumbnail m20 clickable" style={divStyle}>
              <h1>{problem.name}</h1>
              <hr />
              <h4>Description:</h4>
              <p>{problem.description}</p>
            </div>
          </a>
        ))}
      </div>
    );
  }
}
