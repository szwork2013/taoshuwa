import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import pos_img from  '../assets/images/map-pos-now.png';

export default class Position extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className='posi'>
        <div className='spot'>
          <span><img src={pos_img} /></span>
          <span>团结湖</span>
        </div>
        <div className='search-box'>
          <input type='text' placeholder='请输入书名或者作者名称'></input>
        </div>
      </div>
    )
  }
}
