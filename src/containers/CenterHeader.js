import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router';
import user_head from '../assets/images/user-head.png';
import default_head from '../assets/images/default-head.png';
import {isOwnEmpty} from '../utils/index.js';
class CenterHeader extends Component {
  constructor(props) {
    super(props);
  }

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
              <Link to='/reg'>注册</Link>
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
CenterHeader.propTypes = {
  user: PropTypes.object.isRequired
}
function mapStateToProps(state) {
  return {user: state.auth.user}
}
function mapDispathToProps(dispatch) {
  return {}
}
export default CenterHeader;
