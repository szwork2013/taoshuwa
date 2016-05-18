//借书列表
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux'
import moment from 'moment';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import * as Actions from '../actions'
import {saveCookie, getCookie, signOut} from '../utils/authService'
import book_img from '../assets/images/book-1.jpg'


function mapStateToProps(state) {
  return {borrowlist: state.drift.toJS().borrowlist}
}
function mapDispathToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
@connect(mapStateToProps, mapDispathToProps)
export default class BorrowList extends Component {

  constructor(props){
    super(props)
    this.finishReading = this.finishReading.bind(this);
  }

  finishReading(item){
    if(confirm('当你真的看完了，点击确定之后该书将能够被他人借阅')){
      const {actions} = this.props;
      actions.finishReading({bookid:item.bookid._id, driftid:item._id});
    }
  }

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
    } else if (stat === '已到期') {
      return <span className='tag bg-9FD8DF'>{stat}</span>
    } else if (stat === '被拒绝') {
      return <span className='tag bg-C8C8C8'>{stat}</span>
    }
  }
  setTools(item) {
    const stat = item.borrowStatus;
    if (stat === '申请中') {
      return null
      return (
        <div className='btngroup'>
          <button className='leftbtn'>取消</button>
          <button className='rightbtn'>确认</button>
        </div>
      )
    } else if (stat === '已借到') {
      return (
        <div className='btngroup'>
          <button className='middlebtn' onClick={()=>{this.finishReading(item)}}>看完了</button>
        </div>
      )
    } else if (stat === '已到期') {
      return null;
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
                  <dt><img src={item.bookid.image} onClick={()=>{browserHistory.push(`/book/${item.bookid._id}`)}}/></dt>
                  <dd>
                    <h4 className='bookname'>{item.bookid.title}</h4>
                    <div>
                      <p>借书订单号：{item.orderid}</p>
                      <p>生成时间：{moment(item.created).format('YYYY-MM-DD')}</p>
                      <p>预计归还时间：{moment(item.endtime).format('YYYY-MM-DD')}</p>
                    </div>
                    {this.setTools(item)}
                  </dd>
                </dl>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
