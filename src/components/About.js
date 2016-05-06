import React, { Component, PropTypes } from 'react';

export default class About extends Component {

  ComponentDidMount() {
    console.log('ComponentDidMountddd---:');
  }

  render () {
    return (
      <li className="demo">
        this is about.
      </li>
    );
  }
}
