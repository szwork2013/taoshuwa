import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link,browserHistory} from 'react-router'
import * as Actions from '../actions'
import fetch from 'isomorphic-fetch';
import {API_ROOT} from '../config'
import BookItem from './BookItem';
import Position from './Position.js';
import Nav from './Nav';
import book_img from '../assets/images/book-1.jpg'
import pos_img from '../assets/images/map-pos.png';
import icon_question from '../assets/images/icon-question.png'
class Book extends Component {
  constructor(props) {
    super(props);
    this.handleDelOne = this.handleDelOne.bind(this);
  }
  componentDidMount() {
    //获取数据
    const {actions} = this.props;
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(r => {
      let point = r.point;
      actions.fetchBooks(point);
    })
  }
  handleDelOne(e, id) {
    e.preventDefault()
    const {actions} = this.props;
    actions.delBook(id);
  }
  render() {
    const {books, dispatch, actions} = this.props;
    let coBook = [];
    books.forEach(item => {
      if (item.title) {
        coBook.push({
          _id: item._id,
          author: item.author,
          image: item.image || "https://img1.doubanio.com/mpic/s28026858.jpg",
          title: item.title,
          status: item.status,
          summary: item.summary,
          tags: item.tags && item.tags.slice(0, 2),
          category: item.category,
          address: item.address
        });
      }
    })
    var _booksList = coBook.map((book, index) => {
      return <BookItem key={book._id} book={book} index={index} handleDelOne={this.handleDelOne} fetchOneBook={actions.fetchOneBook}/>
    });
    var booksList = coBook.map((book, index) => {
      return (
        <li key={index} onClick={()=>{browserHistory.push(`/book/${book._id}`)}}>
          <div className='borrowlist'>
            { book.status === 1 ? <span className='tag bg-58BD91'>可借</span> : <span className='tag bg-FF9E77'>已借出</span>}
            <dl>
              <dt><img src={book.image}/></dt>
              <dd>
                <h4 className='bookname'>{book.title}</h4>
                <div>
                  <p>作者：{book.author}</p>
                  <p>类别：{book.category && book.category.name}</p>
                  <p>标签：{book.author}</p>
                </div>
                <div className='btngroup'>
                  <div className='position'>
                    <img src={pos_img}/>
                    <span>{book.address || '嘉盛中心'}</span>
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
        <div className='fixed-footer'>
          <Nav/>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {books: state.book.toJS().list}
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Book)
