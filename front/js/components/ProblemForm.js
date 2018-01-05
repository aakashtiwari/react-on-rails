import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import getLogger from '../util/logger';

const log = getLogger('ProblemFormComponent');

export default class ProblemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      explanation: '',
    };

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
        debugger;
        <Redirect push to="/"/>
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
          <button type="submit" className="btn btn-primary" value="Submit">Submit</button>
        </form>
      </div>
    );
  }
}
