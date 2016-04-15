import React, {Component, PropTypes} from 'react';
import book_img from '../assets/images/book-1.jpg'

export default class BookItemSim extends Component {
  render() {
    //const { book,index,handleDelOne} = this.props;
    const {title,status} = this.props;
    const loanStatus = (function() {
      if (status === '1') {
        return (
          <div className='book-status book-status-in'>
            <span>可借</span>
          </div>
        )
      } else {
        return (
          <div className='book-status book-status-out'>
            <span>已借出</span>
          </div>
        )
      }
    })();
    return (
      <div className="component-bookitem-sim">
        {loanStatus}
        <div className='title'>
          <img src={book_img} />
        </div>
        <div className='title'>
          <span>{title}</span>
        </div>
      </div>
    )
  }
}
