//心愿单列表
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux'
import moment from 'moment';
import {connect} from 'react-redux';
import * as Actions from '../actions'
import {saveCookie, getCookie, signOut} from '../utils/authService'
import book_img from '../assets/images/book-1.jpg'
import nobook_img from '../assets/images/nobook_img.png'
class DesireList extends Component {

  componentDidMount(){
    const {actions} = this.props;
    if(getCookie('token')){
      actions.desireList();
    }
  }

  render() {
    const {desirelist} = this.props;

    return (
      <div>
        <ul>
          {desirelist.map((item,index) =>(
            <li key={index}>
              <span>书名：{item.title}</span> <br />
              <span>作者：{item.author}</span> <br />
              <span>状态：{item.status === 1?'可借':'已借出'}</span> <br />
              <span>书名：{item.category.name}</span> <br />
              <br />
            </li>
          ))}
        </ul>

        <ul className='borrowlistbox'>
          <li>
            <div className='borrowlist'>
              <span className='tag bg-58BD91'>可借</span>
              <dl>
                <dt><img src={book_img} /></dt>
                <dd>
                  <h4 className='bookname'>别让不好意思害了你</h4>
                  <div>
                    <p>作者：冯唐</p>
                    <p>类别：文学随笔</p>
                    <p>标签：<span className='booktag'>励志</span><span className='booktag'>成功</span></p>
                  </div>
                  <div className='location'>
                    <span>嘉盛中心</span>
                  </div>
                </dd>
              </dl>
            </div>
          </li>
          <li>
            <div className='borrowlist'>
              <span className='tag bg-FF9E77'>已借出</span>
              <dl>
                <dt><img src={book_img} /></dt>
                <dd>
                  <h4 className='bookname'>别让不好意思害了你</h4>
                  <div>
                    <p>作者：冯唐</p>
                    <p>类别：文学随笔</p>
                    <p>标签：<span className='booktag'>励志</span><span className='booktag'>成功</span></p>
                  </div>
                  <div className='location'>
                    <span>嘉盛中心</span>
                  </div>
                </dd>
              </dl>
            </div>
          </li>
          <li>
            <div className='borrowlist'>
              <span className='tag bg-C8C8C8'>暂时没有</span>
              <dl>
                <dt><img src={nobook_img} /></dt>
                <dd>
                  <h4 className='bookname'>JavaScript DOM 编程艺术（第2版）</h4>
                  <div>
                    <p>作者：冯唐</p>
                    <p>类别：文学随笔</p>
                    <p>标签：<span className='booktag'>文学随笔</span></p>
                  </div>
                  <div className='nobook'>暂时还没有这本书</div>
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
  return {desirelist: state.drift.toJS().desirelist}
}
function mapDispathToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(mapStateToProps,mapDispathToProps)(DesireList);
