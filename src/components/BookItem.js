import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router'
import { Button} from 'amazeui-touch';

import pos_img from  '../assets/images/map-pos.png';
import icon_question from '../assets/images/icon-question.png'

export default class BookItem extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const { book,index,handleDelOne,fetchOneBook} = this.props;
    const tags = book.tags;
    const status = book.status;
    const tagsPart = tags.map( (tag,key) =>(<span className='tag' key={key} >{tag.name}</span>));
    const loanStatus = (function(){
      if(status === 1){
        return (
          <div className='book-status book-status-in'>
            <span>可借</span>
          </div>
        )
      }else {
        return (
          <div className='book-status book-status-out'>
            <span>已借出</span>
          </div>
        )
      }
    })();
    const pathname = window.location.pathname;
    const whichShow = pathname==='/book' ?
      ( <div className='position'>
        <img src={pos_img} />
        <span>嘉盛中心</span>
        </div>) :
      (<div className='loaninfo'>
        <div>出借人：淘书娃</div>
        <a><img src={icon_question} /><span>借书规则</span></a>
        </div>);

    return (
      <div className="book-item" onClick={function(){
          //fetchOneBook(book._id);
          browserHistory.push(`/book/${book._id}`)
        }} >

        {loanStatus}
        <div className="item-left">
          <img src={book.image} alt="" />
        </div>
        <div className="item-right">
          <dt>
            {book.title}
          </dt>
          <dd>作者：{book.author}</dd>
          <dd>类别：{book.category && book.category.name}</dd>
          <dd>标签：{tagsPart}</dd>
          {whichShow}
        </div>
        <div className="item-last">
          <button
            className="btn btn-danger btn-sm"
            onClick={ e =>handleDelOne(e,book._id)} >删除</button>
        </div>

      </div>
    )
  }
}
