import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import classnames from 'classnames'
export default class AddressChoose extends Component {
  constructor(props) {
    super(props);
    this.state = {
      local: null,
      addressResults:[]
    }
    this.handleSearch = this.handleSearch.bind(this);
  }
  static defaultProps = {}
  static propTypes = {
    display: PropTypes.bool.isRequired,
    handleSelAddress: PropTypes.func.isRequired,
    handleSelOpen: PropTypes.func.isRequired
  }
  componentDidMount() {
    var map = new BMap.Map(this.refs.addmap);
    let self = this;
    var options = {
      onSearchComplete: (results) => {
        if (local.getStatus() == BMAP_STATUS_SUCCESS) {
          self.setState({addressResults: results.wr});
          console.log('results.wr:',results.wr);
        }
      }
    };
    var local = new BMap.LocalSearch(map, options);
    this.setState({local: local});
  }
  handleSearch() {
    let searchSpot = this.refs.insearch.value;
    if(searchSpot === undefined || searchSpot.trim()==='') return;
    this.state.local.search(searchSpot);
  }
  render() {
    const {display, handleSelAddress, handleSelOpen} = this.props;
    let class_name = ['address-choose'];
    if (display) {
      class_name.push('address-choose-visible')
    } else {
      class_name.push('address-choose-hide')
    }
    class_name = class_name.join(' ');
    const options = this.state.addressResults;
    return (
      <div className={class_name} onClick={() => {
        handleSelOpen(false)
      }}>
        <div className='searchBar' onClick={(e) => {
          e.stopPropagation()
        }}>
          <input type='text' ref='insearch' placeholder='输入地址地点搜索'/>
          <button onClick={this.handleSearch}>搜索</button>
        </div>
        <div className='list-item'>
          <ul>
            {options.map((item, index) => (
              <li key={index} onClick={(e) => {
                e.stopPropagation();
                handleSelAddress(item.address,item.point,item.city);
                handleSelOpen(false);
              }}>
                <span className='district'>{item.city}</span>
                <span className='address'>{item.address.length > 20 ? item.address.slice(0, 20):item.address}</span>
              </li>
            ))}
          </ul>
        </div>
        <div ref='addmap'></div>
      </div>
    )
  }
}
