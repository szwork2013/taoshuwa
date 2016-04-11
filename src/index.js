import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory,hashHistory, Link, IndexLink, Redirect } from  'react-router';
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from './store/configureStore';
import Root from './containers/Root';
import routes from './routes'


import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/index.css';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store)
render(
  <Root store={store}  history={browserHistory} routes={routes()}  />,
  document.getElementById('app')
);
