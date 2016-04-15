import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import * as Actions from '../actions/FriendsActions'
import fetch from 'isomorphic-fetch';
import {API_ROOT} from '../config'
import BookItem from './BookItem';
import Position from './Position.js';
import Nav from './Nav';
class Book extends Component {
  constructor(props) {
    super(props);
    this.handleDelOne = this.handleDelOne.bind(this);
  }
  componentDidMount() {
    //获取数据
    const {actions} = this.props;
    console.log('boookstatet');
    actions.fetchBooks();
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
          author:item.author,
          image: item.image || "https://img1.doubanio.com/mpic/s28026858.jpg",
          title: item.title,
          status: item.status,
          tags:item.tags && item.tags.slice(0, 2),
          category: item.category
        });
      }
    })
    var booksList = coBook.map((book, index) => {
      return <BookItem key={book._id} book={book} index={index} handleDelOne={this.handleDelOne} fetchOneBook={actions.fetchOneBook} />
    });
    return (
      <div className='book-list'>
        <div className='fixed-header'>
          <Position />
        </div>
        <div className='list'>
          {booksList}
        </div>
        <div className='fixed-footer'>
          <Nav />
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {books: state.booklist.books}
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Book)
