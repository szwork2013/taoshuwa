import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory,hashHistory, Link, IndexLink, Redirect } from  'react-router';

import configureStore from './store/configureStore';
import Root from './containers/Root';


import 'bootstrap/dist/css/bootstrap.css';

const store = configureStore();
render(
  <Root store={store} history={browserHistory} />,
  document.getElementById('app')
);
