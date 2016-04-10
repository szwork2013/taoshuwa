import React, { Component } from 'react';
import { Router } from  'react-router';
import { Provider } from 'react-redux';
import DevTools from './DevTools';

export default class Root extends Component {
  render() {
    const {store,history,routes} = this.props;
    const width = document.body.clientWidth;
    if(width > 400){
      return (
        <Provider store={store}>
          <div>
            <Router history={history}>
              {routes}
            </Router>
            <DevTools />
          </div>
        </Provider>
      );
    }else {
      return (
        <Provider store={store}>
          <div>
            <Router history={history}>
              {routes}
            </Router>
          </div>
        </Provider>
      );
    }

  }
}
