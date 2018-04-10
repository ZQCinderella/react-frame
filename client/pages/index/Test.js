import React, { Component, Fragment } from 'react';
import TestError from './TestError';
import { ErrorBoundary } from '../../components/';
import WrapCom from './HOC';
import App from './Context';
//onst WrapCom = HOC.default;

const List = ({ data }) => (
  <ul>
    {
      data.map(item => <li key={item.name}>{item.name}</li>)
    }
  </ul>
)
const withLoading = (BaseComponent) => {
  /* eslint-disable */
  return ({ isLoading, ...otherProps }) => {
    console.log(isLoading);
    return (
      isLoading ?
        <div>正在加载</div> :
        <BaseComponent {...otherProps} />
    )
  }
}

/**
 * 通过propsKey 可以达到让 外层组件只接收一个props属性(一个对象)， 通过内部展开props[key] 将对象的属性透传到真实组件的props上
 * @param {*} propsKey 
 */
const flatten = (propsKey) => {
  return BaseComponent => {
    return props => {
      return <BaseComponent {...props} {...props[propsKey]} />
    }
  }
}
const loadingList = withLoading(List);
const FlattenLoadingList = flatten('list')(loadingList);

class Test extends Component {
  render() {
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
      </Fragment>
    )
  }
}
export default Test;
