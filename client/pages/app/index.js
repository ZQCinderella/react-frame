import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import '../../common/less/index.less';
import './index.less';

export class App extends Component {

  static propTypes = {
    children: PropTypes.node,
    router: PropTypes.object,
    routes: PropTypes.array
  };
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    toast: state.get('toast'),
    routing: state.get('routing')
  };
}

export default connect(mapStateToProps)(App);
