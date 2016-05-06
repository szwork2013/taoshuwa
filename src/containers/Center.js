import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import CenterHeader from './CenterHeader.js'
import CenterBody from './CenterBody.js'
import {Nav} from '../components'
import * as Actions from '../actions'
import {saveCookie, getCookie, signOut} from '../utils/authService'

@connect(state => ({user: state.auth.toJS().user}), dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
}))

export default class Center extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const {actions} = this.props;
    if (getCookie('token')) {
      actions.borrowList();
    }
  }
  render() {
    const {user, actions} = this.props;
    return (
      <div>
        <CenterHeader user={user}/>
        <CenterBody user={user} logout={actions.logout}/>
        <Nav />
      </div>
    )
  }
}
