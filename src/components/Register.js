import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions/FriendsActions'

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

