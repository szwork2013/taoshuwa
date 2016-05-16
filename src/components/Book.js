import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link, browserHistory} from 'react-router'
import * as Actions from '../actions'
import {isOwnEmpty} from '../utils/index.js'
import {API_ROOT} from '../config'
import BookItem from './BookItem';
import Position from './Position.js';
import Nav from './Nav';
var Loading = require('react-loading');
import book_img from '../assets/images/book-1.jpg'
import pos_img from '../assets/images/map-pos.png';
import icon_question from '../assets/images/icon-question.png'
function mapStateToProps(state) {
  return {
    books: state.book.toJS().list,
    isFetching: state.other.toJS().isFetching,
    searchPosi: state.posi.toJS().searchPosi
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
@connect(mapStateToProps, mapDispatchToProps)
export default class Book extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    //直接获取store中的当前坐标地址 调用图书接口查询 如果搜索地址没有数据直接事哟哦那个当前定位地址
    const {searchPosi,actions} = this.props;
    if(!isOwnEmpty(searchPosi)){
      let point = searchPosi.point;
      actions.fetchBooks(point);
    }
  }

  render() {
    const {books, dispatch, actions, isFetching} = this.props;
    const fetchingStyle = {
      position: 'fixed',
      width: '100%',
      top: '250px',
      zIndex: '999',
      display:isFetching ? 'inherit':'none'
    };
    var booksList = books.map((book, index) => {
      return (
        <li key={index} onClick={() => {
          browserHistory.push(`/book/${book._id}`)
        }}>
          <div className='borrowlist'>
            {book.status === 1
              ? <span className='tag bg-58BD91'>可借</span>
              : <span className='tag bg-FF9E77'>已借出</span>}
            <dl>
              <dt><img src={book.image}/></dt>
              <dd>
                <h4 className='bookname'>{book.title.length < 12
                    ? book.title
                    : book.title.slice(0, 11) + '...'}</h4>
                <div>
                  <p>作者：{book.author}</p>
                  <p>类别：{book.category.name}</p>
                  <p>标签：{book.tags.map(tag => tag.title + ' ')}</p>
                </div>
                <div className='btngroup'>
                  <div className='position'>
                    <img src={pos_img}/>
                    <span>{book.address}</span>
                    <span style={{color:'green'}}>{book.created}</span>
                  </div>
                </div>
              </dd>
            </dl>
          </div>
        </li>
      )
    })
    return (
      <div className='book-list'>
        <div className='fixed-header'>
          <Position/>
        </div>
        <div className='list'>
          <ul className='borrowlistbox'>
            {booksList}
          </ul>
        </div>
        <div style={fetchingStyle}>
          <Loading type='spokes' color='#58BD91'/>
        </div>
        <div className='fixed-footer'>
          <Nav/>
        </div>
      </div>
    )
  }
}
