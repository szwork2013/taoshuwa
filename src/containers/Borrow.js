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
      isCommentShow:false,
      weeks:0
    }
  }
  ComponentWillReceiveProps(nextProps) {}
  ComponentWillUpdate(a, b) {}
  componentDidMount() {}

  render() {
    const user = this.props.user || {}
    const curbook = this.props.curbook || {}

    return (
      <div>
        <div>
          <span>借阅时间：</span>
          <select onChange={(e)=>this.setState({ weeks:e.target.value })}>
            <option value='2'>二周</option>
            <option value='3'>三周</option>
            <option value='4'>四周</option>
            <option value='5'>五周</option>
            <option value='6'>六周</option>
            <option value='7'>七周</option>
            <option value='8'>八周</option>
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
            const weeks = this.state.weeks;
            actions.borrowBook(curbook._id,weeks);
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
