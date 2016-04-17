import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import * as Actions from '../actions'
class BookLoanList extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    //获取数据
    const {actions} = this.props;
    actions.fetchLoanBookList();
  }
  render() {
    const {loanlist, dispatch, actions} = this.props;
    const loanTemplate = loanlist.map(item => (
      <li key={item._id}>
        {item.title}
      </li>
    ))
    return (
      <div>
        <h1>我借出的书</h1>
        <ul>
          {loanTemplate}
        </ul>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {loanlist: state.book.toJS().loanlist}
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(BookLoanList)
