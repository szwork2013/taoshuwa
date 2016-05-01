import React, {Component, PropTypes} from 'react';
export default class AddressItem extends Component {
  render() {
    const { title, address, handAddressClick} = this.props;
    return (
      <a onClick={handAddressClick}>
        <div>{title}</div>
        <div>{address}</div>
      </a>
    )
  }
}
AddressItem.PropTypes = {
  title: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  handAddressClick: PropTypes.func.isRequired
}
