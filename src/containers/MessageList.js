import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../actions'
class MessageList extends Component {
  componentDidMount() {
    const {actions, curbook} = this.props;
    actions.messageList();
  }
  render() {
    const {messagelist} = this.props;
    return (
      <div>
        {messagelist.map(message => (
          <div key={message._id}>{message.orderid}
            <button onClick={() => {
                this.props.actions.dealMessage(message._id,true)
            }}>通过</button>
            <button>取消</button>
          </div>
        ))}
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {messagelist: state.drift.toJS().messagelist}
}
function mapDispathToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispathToProps)(MessageList)
