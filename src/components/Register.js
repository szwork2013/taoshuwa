import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions/FriendsActions'
//引入图片
import icon_mobile  from '../assets/images/icon-mobile.png'
import icon_check_code  from '../assets/images/icon-check-code.png'
import icon_password  from '../assets/images/icon-password.png'
import icon_icode  from '../assets/images/icon-icode.png'
import icon_split  from '../assets/images/icon-split.png'
import btn_big  from '../assets/images/btn-big.png'

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    //获取数据
  }

  handleSubmit(e){
    e.preventDefault();
    const {actions} = this.props;
    const {phone,password,cpassword} = this.refs
    actions.register(phone.value, password.value,cpassword.value);
  }

  render() {
    const {dispatch,actions } = this.props;

    return(
      <div className='reg'>
        <ul>
          <li>
            <div className='content'>
              <div className='reg-icon-type'>
                <img src={icon_mobile} />
              </div>
              <div className='reg-icon-split'>
                <img src={icon_split} />
              </div>
              <div className='reg-input'>
                <input type='text' ref='phone' placeholder='请输入手机号' />
              </div>
            </div>
            <div className='one-line'></div>
          </li>
          <li>
            <div className='content'>
              <div className='reg-icon-type'>
                <img src={icon_check_code} />
              </div>
              <div className='reg-icon-split'>
                <img src={icon_split} />
              </div>
              <div className='reg-input'>
                <input type='text' ref='phone' placeholder='请输入验证码' />
                <a><span>获取验证码</span></a>
              </div>
            </div>
            <div className='one-line'></div>
          </li>
          <li>
            <div className='content'>
              <div className='reg-icon-type'>
                <img src={icon_password} />
              </div>
              <div className='reg-icon-split'>
                <img src={icon_split} />
              </div>
              <div className='reg-input'>
                <input type='text' ref='phone' placeholder='请输入密码' />
              </div>
            </div>
            <div className='one-line'></div>
          </li>
          <li>
            <div className='content'>
              <div className='reg-icon-type'>
                <img src={icon_icode} />
              </div>
              <div className='reg-icon-split'>
                <img src={icon_split} />
              </div>
              <div className='reg-input'>
                <input type='text' ref='phone' placeholder='请输入邀请码' />
              </div>
            </div>
            <div className='one-line'></div>
          </li>
        </ul>

        <div className='icode-tip'>
          <a>什么是邀请码？</a>
        </div>
        <div className='reg-finish'>
          <a>完 成</a>
        </div>
      </div>
    )
    return;
    return (
      <div className="signin-box">
        <div className="signin-container">
          <h4 className="title">注 册</h4>
          <form className="signin-form form-horizontal" name="signinForm" onSubmit={this.handleSubmit} noValidate>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-addon">
                  <i className="fa fa-envelope-o"></i>
                </div>
                <input type="text"
                       className="form-control"
                       required
                       ref="phone"
                       placeholder="用户手机号码"/>
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-addon"><i className="fa fa-unlock-alt"></i></div>
                <input type="password"
                       required
                       className="form-control"
                       ref="password"
                       placeholder="密码"/>
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-addon"><i className="fa fa-unlock-alt"></i></div>
                <input type="password"
                       required
                       className="form-control"
                       ref="cpassword"
                       placeholder="确认密码"/>
              </div>
            </div>
            <div className="form-group">
              <button className="btn btn-primary btn-lg btn-block" type="submit">登 录</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
