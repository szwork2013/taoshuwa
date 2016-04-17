import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../actions'
import { checkPhone, checkVCode, checkICode,checkPassword } from '../utils/authCheck.js'
//引入图片
import icon_mobile from '../assets/images/icon-mobile.png'
import icon_check_code from '../assets/images/icon-check-code.png'
import icon_password from '../assets/images/icon-password.png'
import icon_icode from '../assets/images/icon-icode.png'
import icon_split from '../assets/images/icon-split.png'
import btn_big from '../assets/images/btn-big.png'


class Register extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getVCode = this.getVCode.bind(this);
  }
  componentDidMount() {
    //获取数据
  }
  checkRegInfo(regInfo) {
    const {phone, password, icode, vcode } = regInfo;

    if(!checkPhone(phone)){
      alert('手机号码格式不正确');
      return false;
    }

    if(!checkVCode(vcode)){
      alert('验证码格式不正确');
      return;
    }

    const realVcode = this.props.vcode;
    if( Number(vcode) !== Number(realVcode)){
      alert('验证码输入不正确');
      return;
    }

    if(!checkPassword(password)){
      alert('密码的格式不正确,只能输入6到20位的字母，数字及下划线');
      return;
    }

    if(!checkICode(icode)){
      alert('邀请码格式不正确');
      return;
    }

    return true;
  }

  //获取验证码
  getVCode(){
    const {actions} = this.props;
    actions.getVCode();
  }

  handleSubmit(e) {
    e.preventDefault();
    const {actions} = this.props;
    console.log(this.refs);
    const {phone, password, icode, vcode} = this.refs;
    const regInfo = {
      phone: phone.value,
      password: password.value,
      icode: icode.value,
      vcode:vcode.value
    }
    if(this.checkRegInfo(regInfo)){
      actions.register(regInfo);
    }
  }
  render() {
    const {dispatch, actions} = this.props;
    return (
      <div className='reg'>
        <ul>
          <li>
            <div className='content'>
              <div className='reg-icon-type'>
                <img src={icon_mobile}/>
              </div>
              <div className='reg-icon-split'>
                <img src={icon_split}/>
              </div>
              <div className='reg-input'>
                <input type='text' ref='phone' placeholder='请输入手机号'/>
              </div>
            </div>
            <div className='one-line'></div>
          </li>
          <li>
            <div className='content'>
              <div className='reg-icon-type'>
                <img src={icon_check_code}/>
              </div>
              <div className='reg-icon-split'>
                <img src={icon_split}/>
              </div>
              <div className='reg-input'>
                <input type='text' ref='vcode' placeholder='请输入验证码'/>
                <a onClick={this.getVCode}><span>获取验证码</span></a>
              </div>
            </div>
            <div className='one-line'></div>
          </li>
          <li>
            <div className='content'>
              <div className='reg-icon-type'>
                <img src={icon_password}/>
              </div>
              <div className='reg-icon-split'>
                <img src={icon_split}/>
              </div>
              <div className='reg-input'>
                <input type='password' ref='password' placeholder='请输入密码'/>
              </div>
            </div>
            <div className='one-line'></div>
          </li>
          <li>
            <div className='content'>
              <div className='reg-icon-type'>
                <img src={icon_icode}/>
              </div>
              <div className='reg-icon-split'>
                <img src={icon_split}/>
              </div>
              <div className='reg-input'>
                <input type='text' ref='icode' placeholder='请输入邀请码'/>
              </div>
            </div>
            <div className='one-line'></div>
          </li>
        </ul>
        <div className='icode-tip'>
          <a>什么是邀请码？</a>
        </div>
        <div className='reg-finish'>
          <a onClick={this.handleSubmit}>完 成</a>
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
                <input type="text" className="form-control" required ref="phone" placeholder="用户手机号码"/>
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-addon">
                  <i className="fa fa-unlock-alt"></i>
                </div>
                <input type="password" required className="form-control" ref="password" placeholder="密码"/>
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-addon">
                  <i className="fa fa-unlock-alt"></i>
                </div>
                <input type="password" required className="form-control" ref="cpassword" placeholder="确认密码"/>
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
    vcode: state.auth.toJS().vcode
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register)
