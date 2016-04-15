import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions/FriendsActions'
import {isOwnEmpty} from '../utils/index.js';
import map_pos from '../assets/images/map-pos.png';

import {DropDown} from './common';
import './common/css/demo.less';

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.handleAddOne = this.handleAddOne.bind(this);
    this.state = {
      value: -1,
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

  handleAddOne(e){
    e.preventDefault()
    const { actions,onebook } = this.props;
    const choosedIndex = this.state.value;
    if(choosedIndex === -1){
      alert('请选择图书种类');
      return;
    }

    let saying = this.refs.saying.value;
    if(saying != '' && saying != undefined){
      onebook.saying = saying;
    }
    onebook.category = onebook.category[choosedIndex]._id;
    actions.addBook(onebook);
  }

  render() {
    const { onebook,dispatch,actions } = this.props;
    onebook.category = onebook.category || [];
    onebook.category.map((item,index) => item.value=index);
    const options = onebook.category;

    const style = {
      height: '39px',
      width: '200px',
      float: 'left',
      display: 'inline-block',
      marginTop: '5px',
      marginLeft: '-1px'
    }
    return (
      <div className='donate'>
        <div className='donate-book'>
          <div className='face'>
            <img src={onebook.image} />
          </div>
          <div className='detail'>
            <ul>
              <li><span className='name'>书名：</span><span className='cons'>{onebook.title}</span></li>
              <li><span className='name'>作者：</span><span>{onebook.author}</span></li>
              <li><span className='name'>发布到：</span><span>借书</span></li>
            </ul>
          </div>
        </div>

        <div className='catogary'>
          <div className='cont'>
            <span>类别:</span>
            <div style={style}>
              <DropDown style={{'width': '280px'}} options={options} labelName='name' valueName='value'
              placeHolder='请选择图书类别' onChange={this.displayChange.bind(this, 'value')}/>
            </div>
          </div>
          <div className='line'></div>
        </div>
        <div className='book-posi'>
          <div className='cont'>
            <span className='posi-title'>位置:</span>
            <span>东三环北路，嘉盛中心</span>
            <img src={map_pos} />
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

function mapStateToProps(state) {
  return {

    onebook: state.booklist.onebook
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
)(AddBook)
