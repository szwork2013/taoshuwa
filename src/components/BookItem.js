import React, { Component, PropTypes } from 'react';
import { Button} from 'amazeui-touch';

import pos_img from  '../assets/images/map-pos.png';

export default class BookItem extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const { book,index,handleDelOne} = this.props;
    return (
      <div className="book-item" >
        <div className='book-status book-status-out'>
          <span>可借</span>
        </div>
        <div className="item-left">
          <img src={book.image} alt="" />
        </div>
        <div className="item-right">
          <dt>{book.title}--{index}</dt>
          <dd>作者:{book._id}</dd>
          <dd>类别:{book.category}</dd>
          <dd>标签:{book.tags}</dd>
           <div className='position'>
             <img src={pos_img} />
             <span>嘉盛中心</span>
           </div>
        </div>
        <div className='item-last'>
          {<div className="item-last">
            <button className="btn btn-danger btn-sm" onClick={ e =>handleDelOne(e,book._id)} >删除</button>
            <Button amStyle="warning">Hello World</Button>
          </div>}
        </div>
      </div>
    )
  }
}
