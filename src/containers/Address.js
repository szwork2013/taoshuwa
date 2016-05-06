import React,{Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link,browserHistory} from 'react-router'
import {TButton} from '../components'
import AddressChoose from './AddressChoose.js'

import icon_array_left from '../assets/images/icon-array-left.png'
import icon_radio_selected from '../assets/images/icon-radio-selected.png'
import icon_radio_nselected from '../assets/images/icon-radio-nselected.png'
export default class Address extends Component{
  render(){
    const canSee = true;
    const name = '确认';
    const phonenum = '15281073820';
    const userinfo = {
      name:'彭建',
      phonenum:'15281073820'
    }
    const display = true;
    return(
      <div className='address'>
        <div className='head'>
          <span>新增地址</span>
        </div>
        <div className='detail'>
          <ul>
            <li><span className="title">收货人：</span><input type='text' placeholder='请输入你的名字' value={userinfo.name}  /></li>
            <li><span className="title">手机号：</span><input type='text' placeholder='请输入你的电话号码' value={userinfo.phonenum} /></li>
            <li>
              <span className="title">我的地址：</span>
              <input type='text' placeholder='区域、街道、小区' />
              {/*<span><img src={icon_array_left} /></span>*/}
            </li>
            <li><span className="title">门牌号：</span><input type='text' placeholder='楼栋、单元、门牌号' /></li>
          </ul>
          <TButton canSee={canSee} mtop='40' name={name} handleClick={()=>{console.log('clicked');}} />
        </div>
        <div className='list'>
          <div className='onelist'>
            <div className='info'>
              <span className='address'>北京市朝阳区嘉盛中心B1-115s</span>
              <span className='name'>小贱    </span>
              <span className='name'>15281037222</span>
            </div>
            <div className='func'>
              <img src={icon_radio_selected} />
              <span>当前收获地址</span>
              <a>修改</a>
              <a>删除</a>
            </div>
          </div>
          <div className='onelist'>
            <div className='info'>
              <span className='address'>北京市朝阳区嘉盛中心B1-115s</span>
              <span className='name'>小贱    </span>
              <span className='name'>15281037222</span>
            </div>
            <div className='func'>
              <img src={icon_radio_nselected} />
              <span>当前收获地址</span>
              <a>修改</a>
              <a>删除</a>
            </div>
          </div>
          <div className='onelist'>
            <span>我的地址列表</span>
          </div>
        </div>

        <AddressChoose display={display} />
      </div>
    )
  }
}
