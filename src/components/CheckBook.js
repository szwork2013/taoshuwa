import React, { Component, PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'
import Nav from './Nav.js';

const validateBook = values => {
  return true;
}

export default class CheckBook extends Component {
  constructor(props) {
    super(props);
    this.handCheckClick = this.handCheckClick.bind(this);
  }

  componentDidMount(){
    console.log('wx:',wx);
    wx.ready(function () {
      alert('wx is ok');
    })
  }

  handCheckClick(e){
    e.preventDefault();
    const { actions } = this.props;
    const isbn_id = this.refs.isbn_id.value;
    if(validateBook(isbn_id)){
      browserHistory.push(`/book/add/${isbn_id}`);
    }else{
      alert('ISBN格式不对');
    }
  }

  render() {
    const { onebook,dispatch,actions } = this.props;

    return (
      <div>
          <div>
            请输入ISBN的编号：<input type='text' ref='isbn_id' defaultValue='9787115281609' />
          </div>
          <div>
            <button className='btn btn-primary' onClick={this.handCheckClick}>查 看</button>
          </div>
          <div>
            <button className='btn btn-primary'>去扫码</button>
          </div>
        <Nav  />
      </div>
    )
  }
}
