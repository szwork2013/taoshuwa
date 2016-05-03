import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Link} from 'react-router';
import classnames from 'classnames';
import moment from 'moment';
import {Title, BookItemSim, BookItem, TModalIn} from '../components';
import * as Actions from '../actions'
import icon_saying from '../assets/images/icon-saying.png';
import {Carousel} from '../components/common';
import '../components/common/css/demo.less';
import {isOwnEmpty} from '../utils'
class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTipShow: false
    }
    this.addOneDesire = this.addOneDesire.bind(this);
  }
  componentDidMount() {
    const {id} = this.props.params; //文章的_id
    const {actions} = this.props;
    actions.fetchOneBook(id);
    actions.checkBookStatus(id);
  }
  addOneDesire(e) {
    const {curbook, actions} = this.props;
    actions.addDesire(curbook._id);
  }
  render() {
    const {curbook, bookstatus, userinfo} = this.props;
    if (isOwnEmpty(curbook)) {
      curbook.tags = []
    } else {
      curbook.tags = curbook.tags.slice(0, 2);
    }
    const title = ['漂流', '内容简介', '评价'];
    return (
      <div className='book-detail'>
        <BookItem book={curbook} index={0} handleDelOne={function() {}}/>
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
          <div className='comment-item'>
            <span className='comment-content'>想看你笑想和你闹想拥你入</span>
            <span className='comment-user'>——熊大</span>
          </div>
          <div className='comment-item'>
            <span className='comment-content'>想看你笑想和你闹想拥你入</span>
            <span className='comment-user'>——熊二</span>
          </div>
        </div>
        <div className='other-books1'>
        </div>
        {/*
          <div className='other-books'>
            <div className='other-books-title'>
              <span>这个地方其他的书</span>
            </div>
            <div>
              <div className='other-books-align'>
                <Carousel autoPlay={true} delay={5000}>
                  {[
                    [ < BookItemSim title = 'xx' status = '1' />, < BookItemSim title = 'yy' status = '2' />, < BookItemSim title = 'yy' status = '2' />
                    ],
                    [ < BookItemSim title = 'aa' status = '1' />, < BookItemSim title = 'bb' status = '2' />, < BookItemSim title = 'cc' status = '2' />
                    ],
                    [ < BookItemSim title = '11' status = '3' />, < BookItemSim title = '22' status = '1' />, < BookItemSim title = '33' status = '2' />
                    ]
                  ]}
                </Carousel>
              </div>
            </div>
          </div>
          */}
        <div className='cando'>
          <div className='left' onClick={() => {
            this.setState({commentInfo: '', isTipShow: true});
          }}>
            <span >读过</span>
            <TModalIn name='评论' cansee={this.state.isTipShow} placeholder='评价一下呗' bookid={curbook._id} handleClick={(e) => {
              this.setState({isTipShow: false})
            }}/>
          </div>
          <div className='right'>
            {!userinfo
              ? (
                <Link to={`/book/borrow/${curbook._id}`}>
                  <span>{curbook.status == 1
                      ? '申请借阅'
                      : `加入心愿单,到期时间为${curbook.endtime}`}</span>
                </Link>
              )
              : (bookstatus && bookstatus.bookStatus === 1
                ? (
                  <Link to={`/book/borrow/${curbook._id}`}>
                    <span>申请借阅</span>
                  </Link>
                )
                : (bookstatus && bookstatus.bookStatus === 2
                  ? (
                    <span>已申请</span>
                  )
                  : (
                    <a onClick={this.addOneDesire}>
                      <span>{`加心愿单,到期时间为:${moment(bookstatus.endtime).format('YYYY-MM-DD')}`}</span>
                    </a>
                  )))}
          </div>
        </div>
      </div>
    )
  }
}
//const { book,index,handleDelOne} = this.props;
BookDetail.propTypes = {}
function mapStateToProps(state) {
  return {curbook: state.book.toJS().curbook, bookstatus: state.drift.toJS().bookstatus, userinfo: state.auth.toJS().user}
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(BookDetail)
