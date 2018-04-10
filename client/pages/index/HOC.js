/* 高阶组件 */
import React, { Component, Fragment } from 'react';
import { PropTypes } from 'prop-types';

class TestHOC extends Component {
  render() {
    const { data } = this.props;
    return (
      <div>姓名： {data.name}, 年龄： {data.age}</div>
    );
  }
}
TestHOC.propTypes = {
  data: PropTypes.object
}
const HOC = (WrapComponent, data) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data
      }
    }
    render() {
      return <WrapComponent data={this.state.data} {...this.props} />
    }
  }
}

export default HOC(TestHOC, { name: 'fet', age: 10 })
