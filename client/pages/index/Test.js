import React, { Component, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import TestError from './TestError';
import { ErrorBoundary } from '../../components/';
import WrapCom from './HOC';
import App from './Context';
import FlattenLoadingList from './LoadingHOC';
import ContexReplacetRedux from './ContextReplaceRedux';
import ContextReduxApp from './Context-react-redux';

const TestCom = (props) => {
  return <div>000</div>
}
const GenerateContext = (BaseComponent) => {
  const InnerCom = (props, context) => {
    return <BaseComponent {...props} router={context.router}/>
  }
  InnerCom.contextTypes = {
    router: PropTypes.object
  }
  return InnerCom;
}

class GenerateCon extends Component {
  static contextTypes = {
    router: PropTypes.object,
    location: PropTypes.object
  }
}
class TestCon extends GenerateCon {
  render() {
    console.log(this.context)
    return <div>555</div>
  }
}

class Test extends Component {
  render() {
    const Te = GenerateContext(TestCom);
    return (
      <Fragment>
        <TestError />
        <WrapCom />
        <App />
        {
          <FlattenLoadingList list={{
            isLoading: false,
            data: [{ name: 'fet' }, { name: 'sherry' }]
          }} />
        }
        <ContexReplacetRedux />
        <ContextReduxApp />
        <Te />
        <TestCon />
      </Fragment>
    )
  }
}
export default Test;
