import React, { Component, PropTypes } from 'react';
var Loading = require('react-loading');


export default class Contact extends Component {

  handleClick(stat){
    console.log('stat:',stat);
  }

  ComponentDidMount() {
    console.log('ComponentDidMountddd---:');
  }

  render () {
    return (
     <div>
       u  s ss
       <Loading type='spokes' color='#ff0000' />
       i ama  a a
     </div>
    );
  }
}
