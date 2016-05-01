import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../actions'
import Nav from './Nav.js';
import fetch from 'isomorphic-fetch';
const validateBook = values => {
  return true;
}
function mapStateToProps(state) {
  return {scanconfig: state.wx.toJS().scanconfig}
}
function mapDispathToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
@connect(mapStateToProps, mapDispathToProps)
export default class CheckBook extends Component {
  constructor(props) {
    super(props);
    this.handCheckClick = this.handCheckClick.bind(this);
    this.scanQR = this.scanQR.bind(this);
  }
  componentDidMount() {
    const {actions} = this.props;
    const code = this.props.location.query.code
    actions.setScanQR(code);
  }
  handCheckClick(e) {
    e.preventDefault();
    const {actions} = this.props;
    const isbn_id = this.refs.isbn_id.value;
    if (validateBook(isbn_id)) {
      browserHistory.push(`/book/add/${isbn_id}`);
    } else {
      alert('ISBN格式不对');
    }
  }
  scanQR() {
    const {scanconfig} = this.props;
    const query = this.props.location.query;
    wx.config({
      debug: false,
      appId: scanconfig.appId,
      timestamp: scanconfig.timestamp,
      nonceStr: scanconfig.nonceStr,
      signature: scanconfig.signature,
      jsApiList: scanconfig.jsApiList
    });

    wx.error(function(res) {
      console.log('验证失败:',res);
      alert('验证失败');
    });

    wx.scanQRCode({
      needResult: 1,
      desc: 'scanQRCode desc',
      scanType: [ "qrCode", "barCode" ],
      success: function(res) {
        alert(JSON.stringify(res));
        var obj = res.resultStr;
        var arr = obj.split(",");
        var isbn_id = arr[1];
        browserHistory.push(`/book/add/${isbn_id}`)
        //var url = "http://api.douban.com/v2/book/isbn/" + isbn;
        alert(isbn_id)
      }
    });
  }
  render() {
    const {onebook, dispatch, actions} = this.props;
    return (
      <div>
        <div>
          请输入ISBN的编号：<input type='text' ref='isbn_id' defaultValue='9787115281609'/>
        </div>
        <div>
          <button className='btn btn-primary' onClick={this.handCheckClick}>查 看</button>
        </div>
        <div>
          <button className='btn btn-primary' onClick={this.scanQR}>去扫码</button>
        </div>
        <Nav/>
      </div>
    )
  }
}
