//心愿单列表
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux'
import moment from 'moment';
import {connect} from 'react-redux';
import * as Actions from '../actions'
import {saveCookie, getCookie, signOut} from '../utils/authService'

class DesireList extends Component {

  componentDidMount(){
    const {actions} = this.props;
    if(getCookie('token')){
      actions.desireList();
    }
  }

  render() {
    const {desirelist} = this.props;

    return (
      <div>
        <h1>这里是心愿单列表</h1>
        <ul>
          {desirelist.map((item,index) =>(
            <li key={index}>
              <span>书名：{item.title}</span> <br />
              <span>作者：{item.author}</span> <br />
              <span>状态：{item.status === 1?'可借':'已借出'}</span> <br />
              <span>书名：{item.category.name}</span> <br />
              <br />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {desirelist: state.drift.toJS().desirelist}
}
function mapDispathToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(mapStateToProps,mapDispathToProps)(DesireList);
