//借书列表
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux'
import moment from 'moment';
import {connect} from 'react-redux';
import * as Actions from '../actions'
import {saveCookie, getCookie, signOut} from '../utils/authService'
import book_img from '../assets/images/book-1.jpg'
export default class BorrowList extends Component {
  componentDidMount() {
    const {actions} = this.props;
    if (getCookie('token')) {
      actions.borrowList();
    }
  }
  setBookStatus(stat) {
    if (stat === '申请中') {
      return <span className='tag bg-FF9E77'>{stat}</span>
    } else if (stat === '已借到') {
      return <span className='tag bg-58BD91'>{stat}</span>
    } else if (stat === '已归还') {
      return <span className='tag bg-9FD8DF'>{stat}</span>
    } else if (stat === '已取消') {
      return <span className='tag bg-C8C8C8'>{stat}</span>
    }
  }
  setTools(stat) {
    if (stat === '申请中') {
      return (
        <div className='btngroup'>
          <button className='leftbtn'>取消</button>
          <button className='rightbtn'>确认</button>
        </div>
      )
    } else if (stat === '已借到') {
      return (
        <div className='btngroup'>
          <button className='middlebtn'>归还</button>
        </div>
      )
    } else if (stat === '已归还') {
      return (
        <div className='btngroup'>
          <button className='middlebtn'>评价</button>
        </div>
      )
    } else if (stat === '已取消' ||stat === '已拒绝') {
      return null
    }
  }
  render() {
    const {borrowlist} = this.props;
    return (
      <div>
        <ul className='borrowlistbox'>
          {borrowlist.map((item, index) => (
            <li key={index}>
              <div className='borrowlist'>
                {this.setBookStatus(item.borrowStatus)}
                {/*<span className='tag bg-FF9E77'>{item.borrowStatus}</span>*/}
                <dl>
                  <dt><img src={item.bookid.image}/></dt>
                  <dd>
                    <h4 className='bookname'>{item.bookid.title}</h4>
                    <div>
                      <p>借书订单号：{item.orderid}</p>
                      <p>生成时间：{moment(item.created).format('YYYY-MM-DD')}</p>
                      <p>预计归还时间：{moment(item.endtime).format('YYYY-MM-DD')}</p>
                    </div>
                    {this.setTools(item.borrowStatus)}
                  </dd>
                </dl>
              </div>
            </li>
          ))}
        </ul>
        <ul className='borrowlistbox'>
          <li>
            <div className='borrowlist'>
              <span className='tag bg-FF9E77'>申请中</span>
              <dl>
                <dt><img src={book_img}/></dt>
                <dd>
                  <h4 className='bookname'>别让不好意思害了你</h4>
                  <div>
                    <p>借书订单号：00000000</p>
                    <p>生成时间：2016-04-26</p>
                    <p>预计归还时间：2016-04-26</p>
                  </div>
                  <div className='btngroup'>
                    <button className='leftbtn'>取消</button>
                    <button className='rightbtn'>确认</button>
                  </div>
                </dd>
              </dl>
            </div>
          </li>
          <li>
            <div className='borrowlist'>
              <span className='tag bg-C8C8C8'>已取消</span>
              <dl>
                <dt><img src={book_img}/></dt>
                <dd>
                  <h4 className='bookname'>别让不好意思害了你</h4>
                  <div>
                    <p>借书订单号：00000000</p>
                    <p>生成时间：2016-04-26</p>
                    <p>预计归还时间：2016-04-26</p>
                  </div>
                </dd>
              </dl>
            </div>
          </li>
          <li>
            <div className='borrowlist'>
              <span className='tag bg-58BD91'>申请中</span>
              <dl>
                <dt><img src={book_img}/></dt>
                <dd>
                  <h4 className='bookname'>别让不好意思害了你</h4>
                  <div>
                    <p>借书订单号：00000000</p>
                    <p>生成时间：2016-04-26</p>
                    <p>预计归还时间：2016-04-26</p>
                  </div>
                  <div className='btngroup'>
                    <button className='middlebtn'>归还</button>
                  </div>
                </dd>
              </dl>
            </div>
          </li>
          <li>
            <div className='borrowlist'>
              <span className='tag bg-FF9E77'>申请中</span>
              <dl>
                <dt><img src={book_img}/></dt>
                <dd>
                  <h4 className='bookname'>别让不好意思害了你</h4>
                  <div>
                    <p>借书订单号：00000000</p>
                    <p>生成时间：2016-04-26</p>
                    <p>预计归还时间：2016-04-26</p>
                  </div>
                  <div className='btngroup'>
                    <button className='middlebtn'>评价</button>
                  </div>
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
  return {borrowlist: state.drift.toJS().borrowlist}
}
function mapDispathToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispathToProps)(BorrowList);
