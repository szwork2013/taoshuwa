import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link, browserHistory} from 'react-router'
import * as Actions from '../actions'
import book_img from '../assets/images/book-1.jpg'

function mapStateToProps(state) {
  return {loanlist: state.book.toJS().loanlist}
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
@connect(mapStateToProps, mapDispatchToProps)
export default class BookLoanList extends Component {
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
    console.log('loanlist--:',loanlist);
    const loanTemplate = loanlist.map(item => (
      <li key={item._id}>
        <div className='borrowlist'>
          <dl>
            <dt><img src={item.image} onClick={()=>{browserHistory.push(`/book/${item._id}`)}} /></dt>
            <dd>
              <h4 className='bookname'>{item.title}</h4>
              <div>
                <p>作者：{item.author}</p>
                <p>类别：文学随笔</p>
                <p className='loan'>已捐赠</p>
              </div>
              <a href='javascript:;' className='loand'>{item.cycle}位朋友借过</a>
            </dd>
          </dl>
        </div>
      </li>
    ))
    return (
      <div>
        <ul className='borrowlistbox'>
          {loanTemplate}
        </ul>
      </div>
    )
  }
}
