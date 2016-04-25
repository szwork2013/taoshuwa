//借书列表
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux'
import moment from 'moment';
import {connect} from 'react-redux';
import * as Actions from '../actions'
import {saveCookie, getCookie, signOut} from '../utils/authService'

export default class BorrowList extends Component {

  componentDidMount() {
    const {actions} = this.props;
    if(getCookie('token')){
      actions.borrowList();
    }
  }
  render() {
    const {borrowlist} = this.props;

    return (
      <div>
        <h1>这里是借书列表</h1>
        <ul>
          {borrowlist.map((item,index) =>(
            <li key={index}>
              <span>书名：{item.bookid.title}</span>  <br />
              <span>订单号：{item.orderid}</span>  <br />
              <span>该书唯一编号：{item.bookid._id}</span>  <br />
              <span>创建时间：{moment(item.created).format('YYYY-MM-DD')}</span>  <br />
              <span>预计归还时间：{moment(item.endtime).format('YYYY-MM-DD')}</span>  <br />
              <span>当前状态：{item.borrowStatus}</span>  <br />
              <br />
            </li>

          ))}
        </ul>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {borrowlist: state.drift.toJS().borrowlist}
}
function mapDispathToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(mapStateToProps,mapDispathToProps)(BorrowList);
