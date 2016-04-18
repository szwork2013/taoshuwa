//用户基本信息组件
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import classnames from 'classnames';
import * as Actions from '../actions'
import {UserHead, UserItem, Category, TButton} from '../components'
class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canEdit: true, //默认能够更改
      categories: []
    }
    this.saveUser = this.saveUser.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
  }

  saveUser(e) {
    alert('开始保存用户信息');
  }

  handleCategory(e, index) {
    const {actions} = this.props;
    alert(index);

  }

  componentDidMount(){
    const userinfo = this.props.userinfo || {};
    if (userinfo.nickname) {
      this.setState({canEdit: false})
    }
  }
  render() {
    let name = '保存'; //按钮上的文字
    let canSee = this.state.canEdit? true: false; //按钮是否可见
    const userinfo = this.props.userinfo || {};
    const {categories} = this.props;
    const ages = [18,19,20,21,22,23,24,25,26,27,28,29,20,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50];
    const nicknamePart = this.state.canEdit
      ? (<input type='text' placeholder='请输入你的昵称'/>)
      : (
        <label>淘书哇</label>
      )
    const sexPart = this.state.canEdit
      ? (
        <select>
          <option value="-1">请选择性别</option>
          <option value="m">男</option>
          <option value="1">女</option>
        </select>
      ): (
        <label>男</label>
      )
    const agePart = this.state.canEdit
      ? (
        <select>
          <option value="-1">请选择年龄</option>
          {ages.map( age => <option  value={age}>{age}</option>  )}
        </select>
      )
      : (
        <label>26</label>
      )
    const catePart = categories.map( (item,index) => <a key={index}       onClick={()=>{
      this.props.actions.chooseCategory(index);
    }} className={classnames({'choosed':item.choosed})}>{item.title}</a> )
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
            <label>北京市朝阳区嘉盛中心</label>
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
          <TButton name={name} canSee={canSee} handleClick={this.saveUser}/>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    userinfo: state.auth.toJS().user,
    categories: state.book.toJS().categories
  }
}
function mapDispathToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispathToProps)(UserInfo);
