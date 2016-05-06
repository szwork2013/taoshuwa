//借书组件
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import {browserHistory} from 'react-router'
import {isOwnEmpty} from '../utils'
import classnames from 'classnames';
import * as Actions from '../actions'
import { SCORE_CONFIG } from '../constants/config.js'
import {TButton, TModalIn, TModalTip} from '../components'
import array_down from '../assets/images/icon-array-down.png'
import map_pos from '../assets/images/map-pos.png'


function mapStateToProps(state) {
  return {
    user: state.auth.toJS().user,
    curbook:state.book.toJS().curbook,
    borrowPosi:state.posi.toJS().borrowPosi
  }
}

function mapDispathToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
@connect(mapStateToProps, mapDispathToProps)
export default class Borrow extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      isTipShow:false,
      isCommentShow:false,
      weeks:2
    }
  }
  ComponentWillReceiveProps(nextProps) {}
  ComponentWillUpdate(a, b) {}
  componentDidMount() {}

  render() {
    const user = this.props.user || {}
    const curbook = this.props.curbook || {}
    const borrowPosi = this.props.borrowPosi || {}
    return (
      <div>
        <div className='borrowpart'>
          <ul>
            <li>
              <span className='gr'>借阅时间：</span>
              <select onChange={(e)=>this.setState({ weeks:e.target.value })}>
                <option value='2'>二周</option>
                <option value='3'>三周</option>
                <option value='4'>四周</option>
                <option value='5'>五周</option>
                <option value='6'>六周</option>
                <option value='7'>七周</option>
                <option value='8'>八周</option>
              </select>
              {/*<span className='down'><img src={array_down} /></span>*/}
            </li>
            <li>
              <span className='gr'>我得地址：</span>
              <span className=''>{borrowPosi.address}</span>
              <span className='map'><img src={map_pos} onClick={() =>{alert('choose borrow address')}}  /></span>
            </li>
            <li>
              <span className='gr' >我的电话：</span>{user.phone}
            </li>
            <li>
              <span className='gr'>使用积分：</span>
              <span className='score'>{SCORE_CONFIG.borrowBook}分</span>
            </li>
          </ul>
        </div>
        <TButton name='确定' bgcolor='#F0F0F0' mtop='100'  handleClick={()=>{
            const {actions,curbook,borrowPosi} = this.props;
            const weeks = this.state.weeks;
            if(isOwnEmpty(borrowPosi)){
              alert('请选择借书地址');
              return;
            }
            actions.borrowBook(curbook._id,weeks,borrowPosi);
            {/*actions.borrowBook(curbook._id,weeks,borrowPosi);*/}
            this.setState({isTipShow:true})
          }}/>

        <TModalTip name='知道了' cansee={this.state.isTipShow} tip='您的借阅申请已发出，稍后将与您联系' handleClick={()=> {this.setState({isTipShow:false, isCommentShow:true})}}/>

        <TModalIn  bookid={this.props.params.id} name='发送' holder='评价一下呗' handleClick={()=> {this.setState({isCommentShow:false})}} cansee={this.state.isCommentShow}/>
      </div>
    )
  }
}
