import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link, browserHistory} from 'react-router'
import {push,goBack} from 'react-router-redux';
import {TButton} from '../components'
import AddressChoose from './AddressChoose.js'
import * as Actions from '../actions'
import icon_array_left from '../assets/images/icon-array-left.png'
import icon_radio_selected from '../assets/images/icon-radio-selected.png'
import icon_radio_nselected from '../assets/images/icon-radio-nselected.png'


function mapStateToProps(state) {
  return {addressList: state.posi.toJS().addressList, userinfo: state.auth.toJS().user}
}
function mapDispatchToProps(dispatch) {
  return {
    dispatch:dispatch,
    actions: bindActionCreators(Actions, dispatch)
  }
}
@connect(mapStateToProps, mapDispatchToProps)
export default class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
      selAddress: '',
      selPonint: {},
      selCity: ''
    }
    this.handleSelAddress = this.handleSelAddress.bind(this);
    this.handleSelOpen = this.handleSelOpen.bind(this);
    this.handleAddAddress = this.handleAddAddress.bind(this);
    this.handleSetDefault = this.handleSetDefault.bind(this);
  }
  componentDidMount() {
    const {actions} = this.props;
    actions.fetchAddressList();
  }
  handleSelAddress(newAddress, newPoint, newCity) {
    this.setState({selAddress: newAddress})
    this.setState({selPonint: newPoint})
    this.setState({selCity: newCity})
  }
  handleSelOpen(newDisplay) {
    this.setState({display: newDisplay})
  }
  handleSetDefault(index) {
    const {actions} = this.props;
    actions.setDefaultAddress(index);
  }

  handleAddAddress() {
    const username = this.refs.username.value;
    const phonenum = this.refs.phonenum.value;
    const addressUnit = this.refs.address_unit.value;
    const selAddress = this.state.selAddress;
    const curPoint = this.state.selPonint;
    if (username === undefined || username.trim() === '') {
      alert('请输入您的名称');
      return;
    }
    if (phonenum === undefined || phonenum.trim() === '') {
      alert('请输入您的手机号码');
      return;
    }
    if (addressUnit === undefined || addressUnit.trim() === '') {
      alert('请选择你的地址信息');
      return;
    }
    if(selAddress === undefined || selAddress.trim() === ''){
      alert('请选择你的地址信息');
      return;
    }

    const addressInfo = {
      address: {
        city: this.state.selCity,
        selAddress:this.state.selAddress,
        address_unit: addressUnit,
        point: this.state.selPonint
      },
      username: username,
      phonenum: phonenum,
      isdefault: true
    }
    const {actions} = this.props;
    actions.addAddress(addressInfo);
  }
  render() {
    const canSee = true;
    const {addressList,userinfo,dispatch} = this.props;
    const address_item = addressList.map((item, index) => (
      <div className='onelist'  key={'onelist-' + index}  >
        <div className='one-info'>
          <span className='address'>{item.address.city + '-' + item.address.selAddress}</span>
          <span className='name'>{item.username}
          </span>
          <span className='name'>{item.phonenum}</span>
        </div>
        <div className='func'>
          <img onClick={() => {
            this.handleSetDefault(index)
          }} src={item.isdefault
            ? icon_radio_selected
            : icon_radio_nselected}/>
          <span>设置为当前地址</span>
          <a>修改</a>
          <a>删除</a>
        </div>
      </div>
    ))
    return (
      <div className='address'>
        <div className='head'>
          <span>新增地址</span>
        </div>
        <div className='detail'>
          <ul>
            <li>
              <span className="title">收货人：</span><input type='text' ref='username' placeholder='请输入你的名字' defaultValue={userinfo.nickname}/></li>
            <li>
              <span className="title">手机号：</span><input type='text' ref="phonenum" placeholder='请输入你的电话号码' defaultValue={userinfo.phone} /></li>
            <li>
              <span className="title">我的地址：</span>
              <input type='text' value={this.state.selAddress} placeholder='区域、街道、小区' onClick={() => {
                this.setState({display: true})
              }}/> {/*<span><img src={icon_array_left} /></span>*/}
            </li>
            <li>
              <span className="title">门牌号：</span><input type='text' ref='address_unit' placeholder='楼栋、单元、门牌号'/></li>
          </ul>
          <TButton canSee={canSee} mtop='40' name='确定' handleClick={this.handleAddAddress}/>
        </div>
        <div className='list'>
          {address_item}
        </div>
        <AddressChoose display={this.state.display} handleSelAddress={this.handleSelAddress} handleSelOpen={this.handleSelOpen}/>
      </div>
    )
  }
}
