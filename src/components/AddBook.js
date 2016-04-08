import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as Actions from '../actions/FriendsActions'
import fetch from 'isomorphic-fetch';
import {API_ROOT} from '../config'
import BookItem from  './BookItem';

const validateBook = values => {
  // const errors = {}
  // if (!values.email) {
  //   errors.email = 'Required'
  // } else if (!/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(values.email)) {
  //   errors.email = '无效电子邮件地址'
  // }
  //
  // if (!values.password) {
  //   errors.password = 'Required'
  // } else if (values.password.length > 30) {
  //   errors.password = '密码长度不超过30'
  // }
  // if (!values.captcha) {
  //   errors.captcha = 'Required'
  // } else if (values.captcha.length !== 6) {
  //   errors.captcha = '验证码是6位'
  // }
  return true;
}

class Book extends Component {
  constructor(props) {
    super(props);
    this.handleDelOne = this.handleDelOne.bind(this);
    this.handCheckClick = this.handCheckClick.bind(this);
    this.handleAddOne = this.handleAddOne.bind(this);
  }

  componentDidMount() {
    //获取数据
    const { actions } = this.props;
    actions.fetchBooks();
  }

  handleDelOne(e,id){
    e.preventDefault()
    const { actions } = this.props;
    actions.delBook(id);
  }

  handleAddOne(e){
    e.preventDefault()
    const { actions,onebook } = this.props;
    actions.addBook(onebook);
  }

  handCheckClick(e){
    e.preventDefault();
    const { actions } = this.props;
    let isbn_id = this.refs.isbn_id.value;
    if(validateBook(isbn_id)){
      actions.checkOneBook(isbn_id);
    }
  }

  render() {
    const { onebook,dispatch,actions } = this.props;

    return (
      <div>
        <div className="container-fluid main-box">
          <div>
            请输入ISBN的编号：<input type='text' ref='isbn_id' defaultValue='9787115281609' />
          </div>
          <div>
            <button className='btn btn-primary' onClick={this.handCheckClick}>检 查</button>
          </div>

          <div>
            <h1>{!!onebook ? onebook.title : ''}</h1>
          </div>

          <div>
            <button onClick={this.handleAddOne}>添加进数据库</button>
          </div>

          <div>
            <Link to='/book' className='mark'>主界面</Link>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    onebook:state.booklist.onebook
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Book)
