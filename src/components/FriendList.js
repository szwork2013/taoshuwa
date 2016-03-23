import React, { Component, PropTypes } from 'react';
//import mapValues from 'lodash/object/mapValues';
var _ = require('lodash');
import styles from './FriendList.css';
import FriendListItem from './FriendListItem';

function transform(obj){
  var arr = [];
  for(var item in obj){
    arr.push(obj[item]);
  }
  return arr;
}

export default class FriendList extends Component {
  static propTypes = {
    friends: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  render () {
    const friends = transform(this.props.friends);
    return (
      <ul className={styles.friendList}>
        {
          friends.map( (friend) => {
            return (<FriendListItem
              key={friend.id}
              id={friend.id}
              name={friend.name}
              starred={friend.starred}
              {...this.props.actions} />);
          })
        }
      </ul>
    );
  }

}
