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
        <h1>这里是借书的通知，共计：{messagelist.length}条</h1>
        {messagelist.map(message => (message.ispassed === 0
          ? (
            <div key={message._id}>
              '还未借'+{message.borrowid.phone} || {message.orderid} || {message.bookid._id} ||{message.bookid.title}<br/>
              <button onClick={() => {
                this.props.actions.dealMessage(message._id, true, message.bookid._id)
              }}>通过</button>
              <button onClick={() => {
                this.props.actions.dealMessage(message._id, false, message.bookid._id)
              }}>取消</button>
            <br />
            </div>
          )
          : (  <div key={message._id}>
              {message.ispassed  === 1 ? `借出${message.borrowid.phone}`:`已拒绝${message.borrowid.phone}`} || {message.orderid} || {message.bookid._id} || {message.bookid.title}<br/>
            <br />
            </div>)))}
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
