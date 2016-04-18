//用户头像修改组件
import React from 'react'

import icon_head_sm  from  '../assets/images/icon-head-sm.png'
export default class UserHead extends React.Component {
  render() {
    return (
      <div className='head'>
        <div className='info'>
          <span>头像:</span>
          <img src={icon_head_sm} />
        </div>
        <div className='line'></div>
      </div>
    )
  }
}
