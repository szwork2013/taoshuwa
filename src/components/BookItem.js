import React, { Component, PropTypes } from 'react';


export default class BookItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { book,handelDelOne} = this.props;
    return (
      <div className="book-item">
        <div className="item-left">
          <img src={book.image} alt="" />
        </div>
        <div className="item-right">
          <h4>{book.title}</h4>
          <p>作者:{book._id}</p>
          <p>类别:{book.category}</p>
          <p>标签:{book.tags}</p>
        </div>
        <div className="item-last">
          <button className="btn btn-danger btn-sm" onClick={handelDelOne}>删除</button>
        </div>
      </div>
    )
  }
}
