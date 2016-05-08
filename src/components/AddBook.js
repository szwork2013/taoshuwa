import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import * as Actions from '../actions'
import {isOwnEmpty} from '../utils/index.js';
import map_pos from '../assets/images/map-pos.png';
import {DropDown} from './common';
import {Address} from '../containers'

@connect(state => {
  return {
    onebook : state.book.toJS().onebook,
    posi: state.posi.toJS(),
    userinfo:state.auth.toJS().user
  }
}, dispatch => ({
  actions : bindActionCreators(Actions, dispatch)
}))
export default class AddBook extends Component {
  constructor(props) {
    super(props);
    this.handleAddOne = this.handleAddOne.bind(this);
    this.state = {
      value: -1 //图书种类
    };
  }
  displayChange(stat, value) {
    this.setState({
      [String(stat)]: value
    });
  }
  componentDidMount() {
    //获取数据
    const id = this.props.params.id;
    const {actions} = this.props;
    actions.checkOneBook(id);

  }
  handleAddOne(e) {
    e.preventDefault()
    const {actions, onebook,bookPosi,userinfo} = this.props;
    const choosedIndex = this.state.value;
    if (choosedIndex === -1 || choosedIndex === '-1' ) {
      alert('请选择图书种类');
      return;
    }
    let saying = this.refs.saying.value;
    if (saying != '' && saying != undefined) {
      onebook.saying = saying;
    }

    let curAddress = userinfo.address_list.filter(item => item.isdefault===true)
    let defaultAddress = curAddress[0].address.selAddress + curAddress[0].address.address_unit;
    onebook.address = defaultAddress;
    onebook.position = [curAddress[0].address.point.lng, curAddress[0].address.point.lat];
    onebook.category = choosedIndex;
    actions.addBook(onebook);
  }
  render() {
    const {onebook, dispatch, actions,bookPosi, posi,userinfo} = this.props;
    onebook.category = onebook.category || [];
    onebook.category.map((item, index) => item.value = index);

    let defaultAddress = '';
    let curAddress = [];
    if(userinfo){
      curAddress = userinfo.address_list.filter(item => item.isdefault===true)
      defaultAddress = curAddress[0].address.selAddress + curAddress[0].address.address_unit;
    }
    const options = onebook.category;
    return (
      <div className='donate'>
        <div className='donate-book'>
          <div className='face'>
            <img src={onebook.image}/>
          </div>
          <div className='detail'>
            <ul>
              <li>
                <span className='name'>书名：</span>
                <span className='cons'>{onebook.title && onebook.title.length > 12 ? onebook.title.slice(0,11)+'...':onebook.title}</span>
              </li>
              <li>
                <span className='name'>作者：</span>
                <span>{onebook.author}</span>
              </li>
              <li>
                <span className='name'>发布到：</span>
                <span>借书</span>
              </li>
            </ul>
          </div>
        </div>

        <div className='book-posi'>
          <div className='cont'>
            <span className='posi-title'>位置:</span>
            <span>{defaultAddress}</span>
            <img src={map_pos} onClick={() =>{ browserHistory.push('/address')}}/>
          </div>
          <div className='line'></div>
        </div>

        <div className='catogary'>
          <div className='cont'>
            <span>类别:</span>
            <div>
              <select onChange={(e)=>{this.setState({value:e.target.value})}}>
                <option value='-1'>请选择图书的类别</option>
                {options.map((one,index)=><option value={one._id}>{one.name}</option>)}
              </select>
            </div>
          </div>
          <div className='line'></div>
        </div>

        <div className='saying'>
          <div className='title'>说点什么</div>
          <textarea ref='saying' placeholder='淘书娃，随时为你效劳。'></textarea>
        </div>
        <div className='donate-ok'>
          <button onClick={this.handleAddOne}>捐出这本书</button>
        </div>
      </div>
    )
  }
}
