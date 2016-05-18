import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../actions'
import Nav from './Nav.js';
import {TButton} from '../components';
import {isOwnEmpty,isISBN} from '../utils'

const validateBook = values => {
  return isISBN(values);
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
    console.log('code:',code);
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
  checkSys() {
    let ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
      return 'iphone';
    } else if (/android/.test(ua)) {
      return 'android';
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
      res = JSON.stringify(res);
      alert(`验证失败:${res}`);
    });
    wx.scanQRCode({
      needResult: 1,
      desc: 'scanQRCode desc',
      scanType: [
        "qrCode", "barCode"
      ],
      success: function(res) {
        console.log(JSON.stringify(res));
        var obj = res.resultStr;
        var arr = obj.split(",");
        var isbn_id = arr[1];
        browserHistory.push(`/book/add/${isbn_id}`)
      }
    });
  }
  render() {
    const {onebook, dispatch, actions, scanconfig} = this.props;
    return (
      <div className='checkbook'>
        <div className='add-content'>
          <div className='word'>
            <label>
              <span>我知道，我想要的书就在这里，</span> <br/>
              <span>关注三余，口袋里的私人图书馆；</span>
            </label>
            <label>
              <span>我知道，懂我的人也在这里，</span> <br/>
              <span>关注三余，遇见更好的他和她；</span>
            </label>
            <label>打开三余，感受有温度的人、书和世界。</label>
          </div>
        </div>
        <TButton mtop='40' bgcolor="#f0f0f0" name='捐出这本书' handleClick={this.scanQR}/>
        <Nav/>
      </div>
    )
  }
}
