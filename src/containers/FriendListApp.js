import React, { Component, PropTypes } from 'react';
import styles from './FriendListApp.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as FriendsActions from '../actions/FriendsActions';
import { FriendList, AddFriendInput } from '../components';


class FriendListApp extends Component {
  render () {
    const { friendlist: { friendsById }, actions } = this.props;
    //const actions = bindActionCreators(FriendsActions, dispatch);
    return (
      <div className={styles.friendListApp}>
        <h1>The FriendList</h1>
        <AddFriendInput addFriend={actions.addFriend} />
        <FriendList friends={friendsById} actions={actions} />
      </div>
    );
  }
}

FriendListApp.propTypes = {
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