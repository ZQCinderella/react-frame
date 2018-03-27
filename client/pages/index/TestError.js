import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class TestError extends Component {
  state = {
    count: 0,
    error: null
  }
  componentWillMount() {
    //const a = {};
    //const b = a.name.lastName;
  }
  handleClick = () => {
    this.setState({
      count: this.state.count + 1
    });
  }
  clickMan = () => {
    try {
      const a = {};
      const b = a.name.lastName;
    } catch (error) {
      //react声明周期外的函数中如果出错，只能使用这种方式去使错误边界感知到
      this.setState({ error });
    }
  }
  render() {
    const { count, error } = this.state;
    if (count === 5) {
      throw new Error('计数满足，boom');
    }
    if (error) {
      throw new Error('event handle crashed');
    }
    return (
      <div>
        <div onClick={this.handleClick}>{count}</div>
        <div onClick={this.clickMan}>a man, click me</div>
      </div>
    )
  }
}
export default TestError;
