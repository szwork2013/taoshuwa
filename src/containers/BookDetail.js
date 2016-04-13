import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Link} from 'react-router';
//import BookItem from '../components/BookItem.js';
import {Title,BookItemSim,BookItem} from '../components';
import * as Actions from '../actions/FriendsActions'

import icon_saying from '../assets/images/icon-saying.png'
class BookDetail extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const {id} = this.props.params; //文章的_id
    const {actions} = this.props;
    actions.fetchOneBook(id);
  }
  render() {
    const {curbook} = this.props;
    curbook.tags = [1,2,3,4];
    const title = ['漂流','内容简介','评价'];

    return (
      <div className='book-detail'>
        <BookItem book={curbook} index={0} handleDelOne={function(){}} />
        <div className='saying'>
          <img src={icon_saying} />
          <span className='saying-title'>捐书者说</span>
          <div className='saying-content'>感谢小小淘书娃，让我能够免费获取丰富的书籍可看，同时我也能够将我的书分享书出去，再也不担心我的扔掉我的书了。</div>
        </div>

        { /*{
          <div className='drift'>
            <Title title={title[0]} />
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
            <Title title={title[1]} />
            <div className='content-padding'>
              <span>递进的情绪请省略，你又不是个演员，别设计那些情节，没意见我只想看看你怎么圆，你难过的太表面，像没天赋的演员</span>
            </div>
          </div>
          <div className='comment'>
            <Title title={title[2]} />
            <div className='comment-item'>
              <span className='comment-content'>想看你笑想和你闹想拥你入</span>
              <span className='comment-user'>——熊大</span>
            </div>
            <div className='comment-item'>
              <span className='comment-content'>想看你笑想和你闹想拥你入</span>
              <span className='comment-user'>——熊二</span>
            </div>
          </div>
        }*/}

        <div className='other-books'>
          <div className='other-books-title'><span>这个地方其他的书</span></div>
          <div>
            <div className='other-books-align'>
              <BookItemSim />
              <BookItemSim />
              <BookItemSim />
            </div>
          </div>
        </div>
        <div className='cando'>
          读过 申请借阅
        </div>
      </div>
    )
  }
}

//const { book,index,handleDelOne} = this.props;
BookDetail.propTypes = {}
function mapStateToProps(state) {
  return {
    curbook:state.booklist.curbook
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookDetail)
