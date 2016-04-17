import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router';
import user_head from '../assets/images/user-head.png';
import default_head from '../assets/images/default-head.png';
import {isOwnEmpty} from '../utils/index.js';
export default class CenterHeader extends Component {
  render() {
    const {user} = this.props;
    const isLogin = isOwnEmpty(user);
    if (isLogin) {
      return (
        <div>
          <div className='center'>
            <div className='center-header-top'>
              <img src={default_head}/>
            </div>
            <div className='center-header-bottom'>
              <Link to='/login'>登录</Link>｜
              <Link to='/register'>注册</Link>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div className='center'>
            <div className='center-header-top'>
              <img src={user_head}/>
            </div>
            <div className='center-header-bottom'>
              <span>{user.phone}</span>
            </div>
          </div>
        </div>
      )
    }
  }
}
