import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import CenterHeader from './CenterHeader.js'
import CenterBody from './CenterBody.js'
import * as Actions from '../actions'

class Center extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {user,actions} = this.props;
    return (
      <div>
        <CenterHeader user={user} />
        <CenterBody user={user} logout={actions.logout} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {user: state.auth.toJS().user}
}
function mapDispathToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(mapStateToProps,mapDispathToProps)(Center);
