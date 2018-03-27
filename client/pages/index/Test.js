import React, { Component } from 'react';
import TestError from './TestError';
import { ErrorBoundary } from '../../components/'
class Test extends Component {
  render() {
    return (
      <div>
        <TestError />
      </div>
    )
  }
}
export default Test;
