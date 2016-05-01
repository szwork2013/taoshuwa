import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
export default class Nav extends Component {
  render(){
    return (
      <div className='component-nav'>
        <div className='left'>
          <Link activeClassName='active' to='/book'>借书</Link>
        </div>
        <div className='middle'>
          <a onClick={()=>{return window.location.href='http://www.taoshuwa.com/wechat/scanQRCodeAuth'}}>捐书</a>
        </div>
        <div className='right'>
          <Link activeClassName='active' to='/center'>我的</Link>
        </div>
      </div>
    )
  }
}
