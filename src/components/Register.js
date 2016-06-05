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
import btn_big from '../assets/images/btn-big.png'

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

@connect(mapStateToProps, mapDispatchToProps)
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getVCode = this.getVCode.bind(this);
    this.state = {
      canClicked:true,
      aButtonTxt:'获取验证码'
    }
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
      return false;
    }

    const realVcode = this.props.vcode;
    if( Number(vcode) !== Number(realVcode)){
      alert('验证码输入不正确');
      return false;
    }

    if(!checkPassword(password)){
      alert('密码的格式不正确,只能输入6到20位的字母，数字及下划线');
      return false;
    }

    if(!checkICode(icode)){
      alert('邀请码格式不正确');
      return false;
    }

    return true;
  }

  //获取验证码
  getVCode(){
    const {actions} = this.props;
    const phonenum = this.refs.phone.value;

    if(!checkPhone(phonenum)){
      alert('手机号码格式不正确');
      return false;
    }

    if(this.state.canClicked){
      this.setState({canClicked:false})
      let time = 60;
      let myInterval = setInterval(()=>{
        time = time - 1;
        this.setState({aButtonTxt:`重新获取(${time})`})
        if(time <= -1){
          clearInterval(myInterval);
          this.setState({aButtonTxt:'获取验证码'})
          this.setState({canClicked:true})
        }
      },1000)
      actions.getVCode({phonenum});
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const {actions} = this.props;
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
    const winHeigt = document.body.clientHeight;
    return (
      <div className='reg' style={{height:winHeigt}}>
        <ul>
          <li>
            <div className='content'>
              <div className='reg-icon-type'>
                <img src={icon_mobile}/>
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
              <div className='reg-input'>
                <input type='text' ref='vcode' placeholder='请输入验证码'/>
                <a onClick={this.getVCode} ref='abutton'>{this.state.aButtonTxt}</a>
              </div>
            </div>
            <div className='one-line'></div>
          </li>
          <li>
            <div className='content'>
              <div className='reg-icon-type'>
                <img src={icon_password}/>
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
              <div className='reg-input'>
                <input type='text' ref='icode' placeholder='没有，不填该项'/>
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
  }
}
