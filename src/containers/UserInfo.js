//用户基本信息组件
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import classnames from 'classnames';
import * as Actions from '../actions'
import {UserHead, UserItem, Category, TButton} from '../components'

import {saveCookie, getCookie, signOut} from '../utils/authService'
import api from '../api'


class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canEdit: true, //默认能够更改
      categories: [],
      age:'-1',
      sex:'-1'
    }
    this.saveUser = this.saveUser.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
  }



  saveUser(e) {
    const {actions} = this.props;
    //需要更新的数据包括 nickname age sex address position category

    const nickname = this.refs.nickname.value;
    const age = this.state.age;
    const sex = this.state.sex;
    const categories = this.props.categories;
    if(age === '-1'){alert('请选择年龄');return;}
    if(sex === '-1'){alert('请选择性别');return;}
    const userinfo = {nickname,age,sex,categories}
    actions.updateUser(userinfo);
    this.setState({canEdit:false})
  }

  handleCategory(e, index) {
    const {actions} = this.props;
    alert(index);

  }

  componentDidMount(){
    //获取图书类别列表
    const {actions,userinfo} = this.props;
    actions.fetchCategoryWithUser();
    if(userinfo){
      //当用户按正常路径进来，用户信息是能够获取
      this.setState({canEdit:false,age:userinfo.age, sex:userinfo.sex})
    }else{
      //当用户直接通过链接地址进来，用户信息的获取慢于组件的渲染，所以需要直接获取信息，设置state
      const token = getCookie('token');
      api.getMe({headers: { 'Authorization': `Bearer ${token}`}})
        .then(data => {
          if(data.status === 200){
            let user = data.data;
            if(user.nickname){
              this.setState({canEdit:false,age:user.age, sex:user.sex})
            }
          }
        })
    }
  }

  render() {
    let name = '保存'; //按钮上的文字
    const userinfo = this.props.userinfo || {};
    const {categories} = this.props;
    const ages = [18,19,20,21,22,23,24,25,26,27,28,29,20,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50];
    const nicknamePart = this.state.canEdit
      ? (<input type='text' ref='nickname' defaultValue={userinfo.nickname} placeholder='请输入你的昵称'/>)
      : (
        <label>{userinfo.nickname}</label>
      )
    const sexPart = this.state.canEdit
      ? (
        <select  value={this.state.sex} defaultValue={userinfo.sex} onChange={ (e)=>{this.setState({sex: e.target.value})} }>
          <option value="-1">请选择性别</option>
          <option value="m">男</option>
          <option value="f">女</option>
        </select>
      ): (
        <label>{userinfo.sex === 'm' ? '男':'女'}</label>
      )
    const agePart = this.state.canEdit
      ? (
        <select value={this.state.age}  onChange={(e)=>{this.setState({age:e.target.value})}}>
          <option value="-1">请选择年龄</option>
          {ages.map( age => <option  value={age}>{age}</option>  )}
        </select>
      )
      : (
        <label>{userinfo.age}</label>
      )
    const catePart = categories.map( (item,index) => <a key={index}       onClick={()=>{
      this.props.actions.chooseCategory(index);
    }} className={classnames({'choosed':item.choosed})}>{item.name}</a> )

    return (
      <div className='userinfo'>
        <UserHead/>
        <div className='item'>
          <div className='cons'>
            <span>昵称:</span>
            {nicknamePart}
          </div>
          <div className='line'></div>
        </div>
        <div className='item'>
          <div className='cons'>
            <span>性别:</span>
            {sexPart}
          </div>
          <div className='line'></div>
        </div>
        <div className='item'>
          <div className='cons'>
            <span>年龄:</span>
            {agePart}
          </div>
          <div className='line'></div>
        </div>
        <div className='item'>
          <div className='cons'>
            <span>手机号:</span>
            <label>{userinfo.phone}</label>
          </div>
          <div className='line'></div>
        </div>
        <div className='item'>
          <div className='cons'>
            <span>地址:</span>
            <label ref='address'>北京市朝阳区嘉盛中心</label>
          </div>
          <div className='line'></div>
        </div>
        <div className='catogary'>
          <div className='cons'>
            <span>关注类别:</span>
          </div>
          <div className='types'>
            {catePart}
          </div>
        </div>
        <div style={{marginTop: '20' }}>
          <TButton name={name} canSee={this.state.canEdit} handleClick={this.saveUser}/>
        </div>
        <div className={ classnames({'nosee':this.state.canEdit})}>
          <a onClick={()=>{this.setState({canEdit:true});}}>修改资料</a>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userinfo: state.auth.toJS().user,
    categories: state.category.toJS().categories
  }
}
function mapDispathToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispathToProps)(UserInfo);
