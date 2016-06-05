//用户基本信息组件
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import {browserHistory} from 'react-router'
import classnames from 'classnames';
import * as Actions from '../actions'
import {UserHead, UserItem, Category, TButton} from '../components'
import {saveCookie, getCookie, signOut} from '../utils/authService'
import api from '../api'
import icon_modify from '../assets/images/icon-modify.png'
import icon_array_left from '../assets/images/icon-array-left.png';
import icon_head_sm  from  '../assets/images/icon-head-sm.png'
function mapStateToProps(state) {
  return {
    userinfo: state.auth.toJS().user,
    categories: state.category.toJS().categories,
    addressList: state.posi.toJS().addressList
  }
}
function mapDispathToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
@connect(mapStateToProps, mapDispathToProps)
export default class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canEdit: true, //默认能够更改
      categories: [],
      age: '-1',
      sex: '-1'
    }
    this.saveUser = this.saveUser.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handleSetAddress = this.handleSetAddress.bind(this);
  }
  saveUser(e) {
    const {actions,addressList} = this.props;
    //需要更新的数据包括 nickname age sex address position category
    const nickname = this.refs.nickname.value;
    const age = this.state.age;
    const sex = this.state.sex;
    const categories = this.props.categories;
    const address = this.refs.address.value;
    if (age === '-1') {
      alert('请选择年龄');
      return;
    }
    if (sex === '-1') {
      alert('请选择性别');
      return;
    }
    if(!nickname){
      alert('请输入用户昵称');
      return;
    }

    var defaultAddress = addressList.filter(item => item.isdefault === true)
    if(defaultAddress.length > 0){
      const userinfo = {
        nickname,
        age,
        sex,
        categories
      }
      actions.updateUser(userinfo);
      this.setState({canEdit: false})
    }else{
      alert('请选择地址')
    }
  }
  handleCategory(e, index) {
    const {actions} = this.props;
    alert(index);
  }
  ComponentWillReceiveProps(nextProps) {
    console.log('nextProps-------', nextProps);
  }
  ComponentWillUpdate(a, b) {
    console.log('xsssss');
  }
  handleSetAddress() {
    browserHistory.push('/address');
  }
  componentDidMount() {
    //获取图书类别列表
    const {actions, userinfo} = this.props;
    actions.fetchAddressList();
    actions.fetchCategoryWithUser();
    if (userinfo) {
      //当用户按正常路径进来，用户信息是能够获取
      this.setState({canEdit: true, age: userinfo.age, sex: userinfo.sex})
    } else {
      //当用户直接通过链接地址进来，用户信息的获取慢于组件的渲染，所以需要直接获取信息，设置state
      const token = getCookie('token');
      api.getMe({
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(data => {
        if (data.status === 200) {
          let user = data.data;
          if (user.nickname) {
            this.setState({canEdit: false, age: user.age, sex: user.sex})
          }
        }
      })
    }
  }
  render() {
    let name = '保存'; //按钮上的文字
    const userinfo = this.props.userinfo || {};
    const {categories,addressList} = this.props;
    const ages = (function(){
      let ageArr = [];
      for(let i=18;i<60;i++){
        ageArr.push(i);
      }
      return ageArr;
    })();
    //昵称
    const nicknamePart = !!userinfo.nickname ?  (
      <label>{userinfo.nickname}</label>
    ) : (<input type='text' ref='nickname' defaultValue={userinfo.nickname} placeholder='请输入你的昵称'/>)

    //性别
    const sexPart = this.state.canEdit
      ? (
        <select value={this.state.sex} defaultValue={userinfo.sex} onChange={(e) => {
          this.setState({sex: e.target.value})
        }}>
          <option value="-1">请选择性别</option>
          <option value="m">男</option>
          <option value="f">女</option>
        </select>
      )
      : (
        <label>{userinfo.sex === 'm'
            ? '男'
            : '女'}</label>
      )
    //年龄
    const agePart = this.state.canEdit
      ? (
        <select value={this.state.age} onChange={(e) => {
          this.setState({age: e.target.value})
        }}>
          <option value="-1">请选择年龄</option>
          {ages.map(age => <option value={age}>{age}</option>)}
        </select>
      )
      : (
        <label>{userinfo.age}</label>
      )
    //类别
    const catePart = categories.map((item, index) => (
      <a key={index} onClick={() => {
        this.props.actions.chooseCategory(index);
      }} className={classnames({'choosed': item.choosed})}>{item.name}</a>
    ))

    //地址
    let lastAddr = '';
    const defaultAddress = addressList.filter(item => item.isdefault === true)
    if(defaultAddress.length > 0){
      lastAddr = defaultAddress[0].address.selAddress.length>20 ? '...'+defaultAddress[0].address.selAddress.slice(-18):defaultAddress[0].address.selAddress;
    }

    return (
      <div>
        <div className='userinfo'>
          <ul className='userinfo-ul'>
            {/*<li className='item'>
              <div className='cons top'>
                <span>头像:</span>
                <img src={icon_head_sm} />
              </div>
            </li>*/}
            <li className='item'>
              <div className='cons'>
                <span>昵称:</span>
                {nicknamePart}
              </div>
            </li>
            <li className='item'>
              <div className='cons'>
                <span>性别:</span>
                {sexPart}
              </div>
            </li>
            <li className='item'>
              <div className='cons'>
                <span>年龄:</span>
                {agePart}
              </div>
            </li>
            <li className='item'>
              <div className='cons'>
                <span>手机号:</span>
                <label>{userinfo.phone}</label>
              </div>
            </li>
            <li className='item'>
              <div className='cons addr'>
                <span>地址:</span>
                <label ref='address'>{lastAddr}</label>
                {this.state.canEdit ? <img src={icon_array_left} onClick={()=>{browserHistory.push('/address')}} /> : null}
              </div>
            </li>
            <li className='catogary'>
              <div className='cons'>
                <span>关注类别:</span>
              </div>
              <div className='types'>
                {catePart}
              </div>
            </li>
          </ul>
        </div>
        <div style={{
          marginTop: '20'
        }}>
          <TButton name={name}
            bgcolor="#F0F0F0"
            canSee={this.state.canEdit}
            handleClick={this.saveUser}/>
        </div>
        <div className={classnames({'nosee': this.state.canEdit, 'user-modify': true})}>
          <img src={icon_modify}/>
          <a onClick={() => {
            this.setState({canEdit: true});
          }}>修改资料</a>
        </div>
      </div>
    )
  }
}
