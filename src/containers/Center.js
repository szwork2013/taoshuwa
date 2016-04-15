import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import CenterHeader from './CenterHeader.js'
import CenterBody from './CenterBody.js'

class Center extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {user} = this.props;
    return (
      <div>
        <CenterHeader user={user} />
        <CenterBody user={user} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {user: state.auth.user}
}
function mapDispathToProps(dispatch) {
  return {}
}
export default connect(mapStateToProps)(Center);
