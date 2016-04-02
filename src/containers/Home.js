import React, { Component, PropTypes } from 'react';
import styles from './FriendListApp.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import WeUI from 'react-weui';
import 'weui';

import * as FriendsActions from '../actions/FriendsActions';
import { FriendList, AddFriendInput } from '../components';

const { Button } = WeUI;
class FriendListApp extends Component {

  render () {
    const { friendlist, actions,children } = this.props;
    return (
      <div className={styles.friendListApp}>
        <h1>The Home</h1>
        {children}
      </div>
    );
  }
}

FriendListApp.PropTypes = {
  friendsById: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}


function mapStateToProps(state){
  return {
    friendlist: state.friendlist
  }
}


function mapDispathToProps(dispatch){
  return {
    actions: bindActionCreators(FriendsActions, dispatch)
  }
}

export default connect(mapStateToProps,mapDispathToProps)(FriendListApp)
