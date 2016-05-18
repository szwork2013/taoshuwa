//心愿单列表
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux'
import moment from 'moment';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import * as Actions from '../actions'
import {saveCookie, getCookie, signOut} from '../utils/authService'
import book_img from '../assets/images/book-1.jpg'
import nobook_img from '../assets/images/nobook_img.png'



function mapStateToProps(state) {
  return {desirelist: state.drift.toJS().desirelist}
}
function mapDispathToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
@connect(mapStateToProps, mapDispathToProps)
export default class DesireList extends Component {
  componentDidMount() {
    const {actions} = this.props;
    if (getCookie('token')) {
      actions.desireList();
    }
  }
  render() {
    const {desirelist} = this.props;
    return (
      <div>
        <ul className='borrowlistbox'>
          {desirelist.map((item, index) => (
            <li key={index}>
              <div className='borrowlist'>
                {item.status === 1
                  ? <span className='tag bg-58BD91'>可借</span>
                  : <span className='tag bg-FF9E77'>已借出</span>}
                <dl>
                  <dt><img src={item.image} onClick={()=>{browserHistory.push(`/book/${item._id}`)}}/></dt>
                  <dd>
                    <h4 className='bookname'>{item.title}</h4>
                    <div>
                      <p>作者：{item.author || '无名'}</p>
                      <p>类别：{item.category && item.category.name}</p>
                      <p>标签：<span className='booktag'>励志</span>
                        <span className='booktag'>成功</span>
                      </p>
                    </div>
                    <div className='location'>
                      <span>{item.address || '嘉盛中心'}</span>
                    </div>
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
