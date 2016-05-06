import React, { Component, PropTypes } from 'react';

export default class Contact extends Component {

  handleClick(stat){
    console.log('stat:',stat);
  }

  ComponentDidMount() {
    console.log('ComponentDidMountddd---:');
  }

  render () {
    return (
      <li>
        this is contact page.
        <button onClick={this.handleClick.bind(this,'display')}>测试bind使用</button>
      </li>
    );
  }
}
