import React, { Component, PropTypes } from 'react';
import icon_array_left from '../assets/images/icon-array-left.png'

export default class CenterItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, haveline, handler } = this.props;
    return (
      <li className="center-item"  onClick={handler} >
        <div className='category'>
          <span>{ title }</span>
          <div><img src={icon_array_left} /></div>
        </div>
        {haveline && <div className='one-line'></div>}
      </li>
    )
  }
}
