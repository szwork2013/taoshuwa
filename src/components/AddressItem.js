import React, {Component, PropTypes} from 'react';
export default class AddressItem extends Component {
  render() {
    const { title, address, handAddressClick} = this.props;
    return (
      <a onClick={handAddressClick} className='address-item'>
        <div className='item-title'>{title}</div>
        <div className='item-where'>{address}</div>
      </a>
    )
  }
}
AddressItem.PropTypes = {
  title: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  handAddressClick: PropTypes.func.isRequired
}
