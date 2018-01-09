import React from 'react';
import axios from 'axios';
import getLogger from '../util/logger';

const log = getLogger('ProblemFormComponent');

export default class ProblemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      explanation: '',
      selectedTags: [],
    };
    this.tags = ['Data Structure', 'Strings', 'Sorting', 'Search', 'Graph Theory', 'Greedy', 'Dynamic Programming',
      'Constructive Algorithms', 'Bit Manipulation', 'Recursion', 'Game Theory', 'NP Complete'];
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const input = event.target.id;
    switch (input) {
      case 'name': {
        this.setState({ name: event.target.value });
        break;
      }
      case 'description': {
        this.setState({ description: event.target.value });
        break;
      }
      case 'explanation': {
        this.setState({ explanation: event.target.value });
        break;
      }
      default: {
        break;
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post('/api/problems', {
      problem: this.state,
    })
      .then(() => {
        window.location.href = '/';
      })
      .catch((error) => {
        log.error(error);
      });
  }

  render() {
    return (
      <div className="container form-container">
        <form onSubmit={this.handleSubmit}>
          <h2>Submit Your Entry</h2>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="name">
                  Problem Name
                  <input type="text" className="form-control" id="name" value={this.state.name} onChange={this.handleChange} />
                </label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="description">
                  Problem Description
                  <textarea className="form-control" id="description" value={this.state.description} onChange={this.handleChange} rows="5" />
                </label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="explanation">
                  Explanation
                  <textarea className="form-control" id="explanation" value={this.state.explanation} onChange={this.handleChange} rows="8" />
                </label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              {this.tags.map(tag => (
                <div className="tag-checkbox">
                  <label htmlFor={tag}>
                    <input type="checkbox" className="form-control" id={tag} value={this.state.name} onChange={this.handleTag} />
                    {tag}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <button type="submit" className="btn btn-primary" value="Submit">Submit</button>
        </form>
      </div>
    );
  }
}
