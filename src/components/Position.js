import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import * as Actions from '../actions'
import {isOwnEmpty} from '../utils'
import pos_img from '../assets/images/map-pos-now.png';

@connect(function(state) {
  return {autoPosi: state.posi.toJS().autoPosi, searchPosi:state.posi.toJS().searchPosi}
}, function(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
})
export default class Position extends Component {
  render() {
    const {autoPosi,searchPosi} = this.props;
    const curAddress = !isOwnEmpty(searchPosi) ? searchPosi.title : (!isOwnEmpty(autoPosi) && autoPosi.address.street);
    return (
      <div className='posi'>
        <Link className='spot' to='/map'>
          <span><img src={pos_img}/></span>
          <span>{ curAddress }</span>
        </Link>
        <div className='search-box'>
          <input type='text' placeholder='请输入书名或者作者名称'></input>
        </div>
      </div>
    )
  }
}
