//赚积分
import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import classnames from 'classnames';
export default class EarnPoint extends Component {
  render() {

    const pointsign = '2分';
    const pointcomment = '3分';
    const pointstillbook = '5分';
    const pointperfect = '20分';
    const pointdonate = '50分';
    return (
      <div className='earnpoints'>
        <div className='title'>
          <a onClick={()=>{browserHistory.push('/borrowrules')}}>规则</a>
          <div className='mypoints'>我的积分</div>
        </div>
        <div className='tsw-title'>每日任务</div>
        <div className='navlist'>
          <dl>
            <dt>签到<span className='points'>{pointsign}</span></dt>
            <dd><a>签到</a></dd>
          </dl>
          <ul>
            <li><a >写评书<span className='points'>{pointcomment}</span></a></li>
            {/*<li><a href='#'>还书<span className='points'>{pointstillbook}</span></a></li>*/}
          </ul>
          <div className='tsw-title'>更高积分</div>
          <ul className='tsw-pt-8 tsw-pb-8'>
            <li><a className='tsw-nboder-top'>完善资料<span className='points'>{pointperfect}</span></a></li>
            <li><a>捐书<span className='points'>{pointdonate}</span></a></li>
          </ul>
        </div>
      </div>
    )
  }
}
