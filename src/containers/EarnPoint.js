//赚积分
import React, {Component} from 'react';
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
          <a href='#'>规则</a>
          <div className='mypoints'>我的积分</div>
        </div>
        <div className='tsw-title'>每日任务</div>
        <div className='navlist'>
          <dl>
            <dt>签到<span className='points'>{pointsign}</span></dt>
            <dd><span className='pointbtn'>签到</span></dd>
          </dl>
          <ul>
            <li><a href='#'>写评书<span className='points'>{pointcomment}</span></a></li>
            <li><a href='#'>还书<span className='points'>{pointstillbook}</span></a></li>
          </ul>
          <div className='tsw-title'>更高积分</div>
          <ul className='tsw-pt-8 tsw-pb-8'>
            <li><a href='#' className='tsw-nboder-top'>完善资料<span className='points'>{pointperfect}</span></a></li>
            <li><a href='#'>捐书<span className='points'>{pointdonate}</span></a></li>
          </ul>
        </div>
      </div>
    )
  }
}
