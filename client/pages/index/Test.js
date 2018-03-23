import React, { Component } from 'react';
import { Map, List, fromJS, is } from 'immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import action from './action';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    }
  }
  componentDidMount() {
    this.setState({ value: this.state.value + 1 });
    console.log(this.state.value);

    this.setState({ value: this.state.value + 1 });
    console.log(this.state.value);
    
    setTimeout(() => {
      this.setState({ value: this.state.value + 1 });
      console.log(this.state.value);

      this.setState({ value: this.state.value + 1 });
      console.log(this.state.value);

      this.setState({ value: this.state.value + 1 });
      console.log(this.state.value);
    }, 0);
  }
  render() {
    return (
      <div>
        hahas
      </div>
    )
  }
}
const mapStateToProps = (state, props) => {
  const order = state.get('checkOutCenter');
  const queryPayList = order.get('queryPayList');
  const updateQuick = order.get('updateQuick');
  const updateDeduct = order.get('updateDeduct');
  return {
    queryPayList,
    updateQuick,
    updateDeduct
  }
};
const bindActionAndCreators = (dispatch) => {
  return {
    action: bindActionCreators(action, dispatch)
  }
};

export default connect(mapStateToProps, bindActionAndCreators)(Test)
