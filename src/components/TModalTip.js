import React, {Component} from 'react'

export default function({tip,name, handleClick}){
  return (
    <div className='tmodal'>
      <div className='info'>
        <span>
          您的借阅申请已发出，稍后将与您联系！
        </span>
        <a onClick={handleClick}>知道了</a>
      </div>
    </div>
  )
}
