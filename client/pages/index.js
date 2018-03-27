import React from 'react'
import { render } from 'react-dom'
import { Route, IndexRoute } from 'react-router';
import { combineReducers } from 'redux-immutable';
import { ErrorBoundary } from '../components/'

const URL_CONTEXT = require('../../Config').context;
/**
 * 这里用来配置路由规则
 */
import App from './app/';
import Dashboard from './demo/Dashboard';
import Test from './index/Test';


const routes = (
  <Route path="/" breadcrumbName="主页" icon="home" component={App}>
    <IndexRoute breadcrumbName="控制面板" icon="laptop" component={Dashboard} />
    <Route path='test(:name)' component={Test} breadcrumbName="test" ></Route>
  </Route>
);

/**
 * load reducers
 */
import app from './app/reducers/index'; // app全局
import routing from './app/reducers/routing';
import checkOutCenter from './index/reducer';

const reducers = combineReducers({
  app,
  routing,
  checkOutCenter
});

/**
 * render document
 */
import Root from '../Root'
render(
  <ErrorBoundary>
    <Root routes={routes} reducers={reducers} basename={`${URL_CONTEXT}`} />
  </ErrorBoundary>,
  document.getElementById('main')
);
