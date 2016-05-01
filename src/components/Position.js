import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import * as Actions from '../actions'
import pos_img from '../assets/images/map-pos-now.png';

@connect(function(state) {
  return {address: state.posi.toJS().nowAddress}
}, function(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
})
export default class Position extends Component {
  render() {
    const {address} = this.props;
    return (
      <div className='posi'>
        <Link className='spot' to='/map'>
          <span><img src={pos_img}/></span>
          <span>{address}</span>
        </Link>
        <div className='search-box'>
          <input type='text' placeholder='请输入书名或者作者名称'></input>
        </div>
      </div>
    )
  }
}
