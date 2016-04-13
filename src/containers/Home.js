import React, {Component, PropTypes} from 'react';
import styles from './FriendListApp.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import WeUI from 'react-weui';
import {Link} from 'react-router';
import 'weui';
import {Container, Group, NavBar, amStyles} from 'amazeui-touch';
import * as FriendsActions from '../actions/FriendsActions';
import {FriendList, AddFriendInput} from '../components';
const {Button} = WeUI;
class Home extends Component {
  componentDidMount() {
    const {actions} = this.props;
    actions.getUserInfo();
  }
  render() {
    const {friendlist, actions, children, auth} = this.props;
    let phone = 0;
    if (auth.user) {
      phone = auth.user.phone;
    }
    const urlpath = window.location.pathname;
    //alert(urlpath);
    return (
      <div className={urlpath === '/register'?'bg-white':'bg-default'}>
        {children}
        <div className='nav'>
          <Link to='/book' className='elem'>借书</Link>
          <Link to='/book/add' className='elem'>捐书</Link>
        </div>
      </div>
    );
  }
}
Home.PropTypes = {
  friendsById: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}
function mapStateToProps(state) {
  return {friendlist: state.friendlist, auth: state.auth}
}
function mapDispathToProps(dispatch) {
  return {
    actions: bindActionCreators(FriendsActions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispathToProps)(Home)
