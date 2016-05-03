import React, {Component} from 'react'
export default function({tip, name, handleClick, cansee }) {

  let className = ['tmodal'];
  if(cansee){
    className.push('tipshow');
  }else{
    className.push('tiphide')
  }
  className = className.join(' ');
  return (
    <div className={className}>
      <div className='info'>
        <span>{tip}</span>
        <a onClick={handleClick}>{name}</a>
      </div>
    </div>
  )
}
