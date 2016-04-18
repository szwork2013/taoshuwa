//用户基本信息项组件
import React from 'react'
export default class UserItem extends React.Component {
  render() {
    const {item} = this.props;
    return (
      <div className='item'>
        <div className='cons'>
          <span>{item.name}</span>
          <span></span>
          <select>
            <option value="-1">请选择年龄</option>
            <option value="0">男</option>
            <option value="1">女</option>
          </select>
        </div>
        <div className='line'></div>
      </div>
    )
  }
}
