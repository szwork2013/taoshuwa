import React, { Component } from 'react';
import { Provider } from 'react-redux';
import App from './App';
import DevTools from './DevTools';
import FriendListApp from './FriendListApp';

export default class Root extends Component {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <div>
          <FriendListApp />
          <DevTools />
        </div>
      </Provider>
    );
  }
}
