import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {Link} from 'react-router';
import * as Actions from '../actions'
import { checkPhone, checkPassword } from  '../utils/authCheck'

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
    const phone = this.refs.phone.value;
    const password = this.refs.password.value;
    if(checkPhone(phone) && checkPassword(password)){
      actions.loginIn(phone,password);
    }else{
      alert('手机号或者密码的格式不对');
    }
  }

  render() {
    const {dispatch,actions } = this.props;

    return (
      <div className="signin-box">
          <div className="signin-container">
            <h4 className="title">登 录</h4>
            <ul>
              <li className='loginphone'><input placeholder="请输入手机号" ref='phone'  /></li>
              <li className='loginpassword'><input type='password' ref='password' placeholder="请输入密码" /></li>
            </ul>
            <button type='button' className='loginbtn' onClick={this.handleSubmit} >登陆</button>
            <div className='goreg'>
              <span>没有帐号，去</span>
              <Link to='register'>注册</Link>
            </div>
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
