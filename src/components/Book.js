import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import * as Actions from '../actions/FriendsActions'
import fetch from 'isomorphic-fetch';
import {API_ROOT} from '../config'
import BookItem from './BookItem';
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
    console.log('bools-----dddd-------:', books);
    let coBook = [];
    books.forEach(item => {
      if (item.title) {
        coBook.push({
          _id: item._id,
          image: item.image || "https://img1.doubanio.com/mpic/s28026858.jpg",
          title: item.title,
          category: 'xx',
          tags: []
        });
      }
    })

    console.log('coBook-----:', coBook);
    console.log('type of booklist: ', (typeof books));
    var booksList = coBook.map((book, index) => {
      return <BookItem key={book._id} book={book} index={index} handleDelOne={this.handleDelOne}/>
    });

    console.log('booksList----------:', booksList);

    return (
      <div>
        <div className="container-fluid main-box">
          <div>
            <Link to='/book/add' className='mark'>添加书籍</Link>
          </div>
          {booksList}
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
