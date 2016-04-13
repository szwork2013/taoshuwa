import React, {Component} from 'react';

export default class Title extends Component {
  render() {
    const {title} = this.props;
    return(
      <div className='component-title'>
        <span className='decorate'></span>
        <span className='title'>{title}</span>
      </div>
    )
  }
}
