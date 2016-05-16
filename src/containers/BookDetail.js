import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Link,browserHistory} from 'react-router';
import classnames from 'classnames';
import moment from 'moment';
import {Title, BookItemSim, BookItem, TModalIn} from '../components';
import * as Actions from '../actions'
import icon_saying from '../assets/images/icon-saying.png';
import {Carousel} from '../components/common';
import {isOwnEmpty} from '../utils'

function mapStateToProps(state) {
  return {
    curbook: state.book.toJS().curbook,
    bookstatus: state.drift.toJS().bookstatus,
    userinfo: state.auth.toJS().user,
    commentList:state.comment.toJS().commentList
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
@connect(mapStateToProps, mapDispatchToProps)
export default class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { isTipShow: false }
    this.addOneDesire = this.addOneDesire.bind(this);
    this.handleTouchClick = this.handleTouchClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.checkCanComment =  this.checkCanComment.bind(this);
    this.handleCheckInfo = this.handleCheckInfo.bind(this);
  }

  static defaultProps = {
    userinfo:{}
  }

  static propTypes = {
    curbook:PropTypes.object.isRequired,
    userinfo:PropTypes.object.isRequired,
    bookstatus:PropTypes.object.isRequired,
  }

  componentDidMount() {
    const {id} = this.props.params; //文章的_id
    const {actions} = this.props;
    actions.fetchOneBook(id);//获取当前书的相信信息
    actions.checkBookStatus(id);//获取当前书的借阅状态
    actions.commentList(id);//获取当前书的评论列表
  }
  addOneDesire(e) {
    const {curbook, actions} = this.props;
    actions.addDesire(curbook._id);
  }

  handleCheckInfo(){
    const {userinfo,curbook} = this.props;
    let nickname = userinfo.nickname;
    if(!!nickname){
      browserHistory.push(`/book/borrow/${curbook._id}`)
    }else{
      alert('还未完善信息');
      browserHistory.push('/userinfo')
    }
  }

  //提示框的按钮点击事件
  handleClick(sStr){
    if(sStr===undefined || sStr.trim() === ''){
      alert('伙计，你没有输入内容');
      return;
    }

    if(sStr.trim().length < 5){
      alert('伙计，你输入的评论都没有五个字');
      return;
    }

    const {curbook,actions} = this.props;
    const content = sStr;
    const bookid = curbook._id;
    const commObj={
      bookid,content
    }
    actions.addComment(commObj)
    this.setState({isTipShow: false})
  }

  //蒙板点击事件
  handleTouchClick(){
    this.setState({isTipShow: false})
  }

  checkCanComment(){
    //判断当前用户是否已经登陆 没有登陆的直接跳转到登陆界面 登陆之后跳转回当前界面
    const {userinfo} = this.props;
    if(!isOwnEmpty(userinfo)){
      if(!!userinfo.nickname){
        this.setState({commentInfo: '', isTipShow: true});
      }else{
        alert('伙计，需要完善资料才能评价');
        browserHistory.push('/userinfo');
      }
    }else{
      alert('你还没有登录');
      browserHistory.push('/login');
    }
  }

  render() {
    const {curbook, bookstatus, userinfo,commentList} = this.props;
    if (isOwnEmpty(curbook)) {
      curbook.tags = []
    } else {
      curbook.tags = curbook.tags.slice(0, 2);
    }
    //各个栏目
    const title = ['漂流', '内容简介', '评价'];

    //评论处理
    const commentsPart = commentList.length>0 && commentList.map(commentItem =>(
      <div className='comment-item' key={commentItem._id}>
        <span className='comment-content'>{commentItem.content}</span>
        <span className='comment-user'>——{commentItem.userid.nickname }</span>
        <span className='comment-user'>时间：{moment(commentItem.created).format('MM-DD')}</span>
      </div>
    ))

    //右侧按钮设置
    const curStatus = curbook.status;
    let leftPart = '';
    if(isOwnEmpty(userinfo)){
      leftPart = (
        <div className='right'>
          <Link to='/login'>
            {curbook.status == 1 ? <span className='toask'>申请借阅</span>
              : (
                <div className='status'>
                  <div className='title'>添加心愿单</div>
                  <div className='tip'>(已借出，归还时间{curbook.endtime})</div>
                </div>
              )}
          </Link>
        </div>
      )
    }else{
      if(isOwnEmpty(bookstatus)){
        leftPart = (
          <div className='right-done'>
            <span>等待中...</span>
          </div>
        )
      }

      //前端根据书的状态判断
      if(curStatus === 1){
        if(bookstatus.bookStatus === 1){
          leftPart = (<div className='right'>
            {/*  <Link to={`/book/borrow/${curbook._id}`}>
                <span className='toask'>申请借阅</span>
              </Link>*/}
            <a onClick={this.handleCheckInfo}>
              <span className='toask'>申请借阅</span>
            </a>
          </div>)
        }else{
          leftPart = (
            <div className='right-done'>
            <span className='done'>已申请</span>
          </div>)
        }
      }else if(curStatus >= 2){
        leftPart = ((
          <div className='right'>
            <div className='status' onClick={this.addOneDesire}>
              <div className='title'>添加心愿单</div>
              <div className='tip'>(已借出，归还时间{moment(bookstatus.endtime).format('YYYY-MM-DD')})</div>
            </div>)
          </div>
        ))
      }
    }


    return (
      <div className='book-detail'>
        <BookItem book={curbook} />

        <div className='saying'>
          <img src={icon_saying}/>
          <span className='saying-title'>捐书者说</span>
          <div className='saying-content'>{curbook.saying}</div>
        </div>

        <div className='drift'>
          <Title title={title[0]}/>
          <div className='drift-item'>
            <span>淘书娃</span>
            <span>2016-04-13</span>
            <span>团结湖</span>
          </div>
          <div className='drift-item'>
            <span>小蓬蓬</span>
            <span>2016-06-13</span>
            <span>呼家楼</span>
          </div>
        </div>

        <div className='content'>
          <Title title={title[1]}/>
          <div className='content-padding'>
            <span>{curbook.summary}</span>
          </div>
        </div>

        <div className='comment'>
          <Title title={title[2]}/>
          {commentsPart}
        </div>
        <div style={{height:'80px'}}>

        </div>
        <div className='cando'>
          <div className='left' onClick={this.checkCanComment}>
            <span >评论</span>
          </div>
          {leftPart}
        </div>

        <TModalIn
          name='评论'
          cansee={this.state.isTipShow}
          placeholder='评价一下呗'
          bookid={curbook._id}
          handleTouchClick={this.handleTouchClick}
          handleClick={this.handleClick}/>
      </div>
    )
  }
}
