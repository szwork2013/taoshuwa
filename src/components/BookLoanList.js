import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import * as Actions from '../actions'
import book_img from '../assets/images/book-1.jpg'
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
    const loanfriends = '2';
    return (
      <div>
        <ul>
          {loanTemplate}
        </ul>
        <ul className='borrowlistbox'>
          <li>
            <div className='borrowlist'>
              <dl>
                <dt><img src={book_img} /></dt>
                <dd>
                  <h4 className='bookname'>别让不好意思害了你</h4>
                  <div>
                    <p>作者：冯唐</p>
                    <p>类别：文学随笔</p>
                    <p className='loan'>已捐赠</p>
                  </div>
                  <a href='javascript:;' className='loand'>{loanfriends}位朋友借过</a>
                </dd>
              </dl>
            </div>
          </li>
          <li>
            <div className='borrowlist'>
              <dl>
                <dt><img src={book_img} /></dt>
                <dd>
                  <h4 className='bookname'>别让不好意思害了你</h4>
                  <div>
                    <p>作者：冯唐</p>
                    <p>类别：文学随笔</p>
                    <p className='loan'>已捐赠</p>
                  </div>
                  <a href='javascript:;' className='loand'>{loanfriends}位朋友借过</a>
                </dd>
              </dl>
            </div>
          </li>
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
