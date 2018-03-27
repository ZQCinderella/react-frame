import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import classnames from 'classnames';

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null,
    errorInfo: null
  }
  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      error: error.toString(),
      errorInfo: info.componentStack
    });
  }
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <div>Something went wrong.</div>
          <div style={{whiteSpace: 'pre-wrap'}}>
            {this.state.error}
            <br />
            {this.state.errorInfo}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
