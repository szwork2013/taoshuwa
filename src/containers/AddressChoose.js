import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import classnames from 'classnames'
export default class AddressChoose extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {display} = this.props;
    let class_name = ['address-choose'];
    if(display){
      class_name.push('address-choose-visible')
    }else{
      class_name.push('address-choose-hide')
    }
    class_name = class_name.join(' ');
    return (
      <div className={class_name}>
        <div className='searchBar'>
          <input type='text' placeholder='输入地址地点搜索'/>
          <button>搜索</button>
        </div>
        <div className='list-item'>
          <ul>
            <li>
              <span className='district'>朝阳区</span>
              <span className='address'>嘉盛中心</span>
            </li>
            <li>
              <span className='district'>朝阳区</span>
              <span className='address'>嘉盛中心</span>
            </li>
            <li>
              <span className='district'>朝阳区</span>
              <span className='address'>嘉盛中心</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
