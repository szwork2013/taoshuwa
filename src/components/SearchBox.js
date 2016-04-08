import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions/FriendsActions'

import BookItem from './BookItem';


class Book extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //获取数据
    const { actions } = this.props;
    //actions.fetchBooks();
  }


  render() {
    const { books,dispatch,actions } = this.props;
    var booksList = books.map(book => {
      return <BookItem key={book._id} book={book} />
    });

    return (
      <div>
        <div className="container-fluid main-box">
          {booksList}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    books:state.booklist.books
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
)(Book)
