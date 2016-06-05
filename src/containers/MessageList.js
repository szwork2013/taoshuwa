import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {browserHistory} from 'react-router'
import * as Actions from '../actions'
import book_img from '../assets/images/book-1.jpg'
import moment from 'moment'

function mapStateToProps(state) {
  return {messagelist: state.drift.toJS().messagelist}
}
function mapDispathToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
@connect(mapStateToProps, mapDispathToProps)
export default class MessageList extends Component {
  componentDidMount() {
    const {actions, curbook} = this.props;
    actions.messageList();
  }

  render() {
    let {messagelist,actions} = this.props;
    if(messagelist === undefined){
      messagelist=[];
    }
    const lisTemps = messagelist.map(message => {
        if(message.ispassed === 0){
          return (<li key={message._id}>
            <div className='borrowlist'>
              <span className='tag bg-FF9E77'>申请中</span>
              <dl>
                <dt><img src={message.bookid.image} onClick={()=>{browserHistory.push(`/book/${message.bookid._id}`)}}/></dt>
                <dd>
                  <h4 className='bookname'>{message.bookid.title}</h4>
                  <div>
                    <p>借书订单号：{message.orderid}</p>
                    <p>生成时间：{moment(message.created).format('YYYY-MM-DD')}</p>
                    <p>预计归还时间：{moment(message.endtime).format('YYYY-MM-DD')}</p>
                  </div>
                  <div className='btngroup'>
                    <button className='leftbtn' onClick={()=>{actions.dealMessage(message._id, false, message.bookid._id)}}>拒绝</button>
                    <button className='rightbtn' onClick={()=>{actions.dealMessage(message._id, true, message.bookid._id)}}>通过</button>
                  </div>
                </dd>
              </dl>
            </div>
          </li>)
        }else if(message.ispassed  === 1) {
          return (<li key={message._id}>
            <div className='borrowlist'>
              <span className='tag bg-58BD91'>已通过</span>
              <dl>
                <dt><img src={message.bookid.image} onClick={()=>{browserHistory.push(`/book/${message.bookid._id}`)}} /></dt>
                <dd>
                  <h4 className='bookname'>别让不好意思害了你</h4>
                  <div>
                  <p>借书订单号：{message.orderid}</p>
                    <p>生成时间：{moment(message.created).format('YYYY-MM-DD')}</p>
                    <p>预计归还时间：{moment(message.endtime).format('YYYY-MM-DD')}</p>
                  </div>
                </dd>
              </dl>
            </div>
          </li>)
        }else{
          return (<li key={message._id}>
            <div className='borrowlist'>
              <span className='tag bg-C8C8C8'>已拒绝</span>
              <dl>
                <dt><img src={message.bookid.image} onClick={()=>{browserHistory.push(`/book/${message.bookid._id}`)}} /></dt>
                <dd>
                  <h4 className='bookname'>别让不好意思害了你</h4>
                  <div>
                    <p>借书订单号：{message.orderid}</p>
                    <p>生成时间：{moment(message.created).format('YYYY-MM-DD')}</p>
                    <p>预计归还时间：{moment(message.endtime).format('YYYY-MM-DD')}</p>
                  </div>
                </dd>
              </dl>
            </div>
          </li>)
        }
    })

    return (
      <div>
        <ul className='borrowlistbox'>
          {lisTemps}
        </ul>
      </div>
    )
  }
}
