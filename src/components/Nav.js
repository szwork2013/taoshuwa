import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
export default class Nav extends Component {
  render(){
    const curpath = window.location.pathname;
    if(curpath === '/'){

    }else if(curpath ==='/book/check'){

    }else if(curpath ==='/center'){

    }

    let indexClass = '';
    if(curpath === '/'){
      indexClass = 'active';
    }

    return (
      <div className='component-nav'>
        <div className='left'>
          <Link onClick={(e)=>{e.stopPropagation()}} activeClassName={indexClass} to='/'>首页</Link>
        </div>
        <div className='middle'>
        {<a onClick={()=>{           window.location.href='http://www.taoshuwa.com/wechat/scanQRCodeAuth'}}>捐书</a>}
          {/*<Link onClick={(e)=>{e.stopPropagation()}} to='/book/check' activeClassName='active'>
            捐书
          </Link>*/}
        </div>
        <div className='right'>
          <Link onClick={(e)=>{e.stopPropagation()}} activeClassName='active' to='/center'>我的</Link>
        </div>
      </div>
    )
  }
}
