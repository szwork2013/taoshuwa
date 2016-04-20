//借书组件
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import classnames from 'classnames';
import * as Actions from '../actions'
import { TButton, TModalIn, TModalTip} from '../components'

class Borrow extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      isTipShow:false,
      isCommentShow:false
    }
    this.handleChangeTime = this.handleChangeTime.bind.this;
    this.handleBorrow = this.handleBorrow.bind.this;
  }
  ComponentWillReceiveProps(nextProps) {}
  ComponentWillUpdate(a, b) {}
  componentDidMount() {}


  handleChangeTime(){

  }

  handleBorrow(e){
    e.preventDefault();
    alert('1234');
    const {actions,curbook} = this.props;
    actions.borrowBook(curbook._id);
    this.setState({isTipShow:true})
  }

  render() {
    const user = this.props.user || {}
    const curbook = this.props.curbook || {}

    return (
      <div>
        <div>
          <span>借阅时间：</span>
          <select onChange={this.handleChangeTime}>
            <option value='2'>二周</option>
            <option value='3'>三周</option>
            <option value='4'>四周</option>
          </select>
        </div>
        <div>
          我得地址：
        </div>
        <div>
          我的电话：{user.phone}
        </div>
        <div>
          使用积分：5
        </div>
        <TButton name='确定' handleClick={()=>{
            const {actions,curbook} = this.props;
            console.log('curbook-------------:',curbook);
            actions.borrowBook(curbook._id);
            this.setState({isTipShow:true})
          }}/>
        <div className={classnames({'hidden':!this.state.isTipShow})}>
          <TModalTip name='知道了' tip='您的借阅申请已发出，稍后将与您联系' handleClick={()=> {this.setState({isTipShow:false, isCommentShow:true})}}/>
        </div>
        <div className={classnames({'hidden':!this.state.isCommentShow})}>
          <TModalIn  bookid={this.props.params.id} name='发送' holder='评价一下呗' handleClick={()=> {alert('Send')}}/>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.toJS().user,
    curbook:state.book.toJS().curbook
  }
}

function mapDispathToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispathToProps)(Borrow);
