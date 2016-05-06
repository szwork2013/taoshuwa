import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as Actions from '../actions'
import {AddressItem,ChooseCity} from '../components'
import {saveCookie, getCookie, signOut} from '../utils/authService'
@connect(state => ({user: state.auth.toJS().user, curCity: state.posi.toJS().curCity, cityModal:state.other.toJS().cityModal}), dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
}))
export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mk: null,
      map: null,
      local: null,
      myGeo: null,
      addressResults: [],
      curCity: props.curCity,
      chooseCity: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChooseCity = this.handleChooseCity.bind(this);
  }
  componentDidMount() {
    console.log('componentDidMount----:');
    const {actions} = this.props;
    actions.setCityModal(false);
    // if (getCookie('token')) {
    //   actions.borrowList();
    // }
    let detail = this.refs.detail;
    var map = new BMap.Map(this.refs.bmap); // 创建Map实例
    this.setState({map: map})
    // var point = new BMap.Point(116.331398, 39.897445); //处理成历史位置
    // map.centerAndZoom(point, 16);
    // var geolocation = new BMap.Geolocation();
    // geolocation.getCurrentPosition(function(r) {
    //   if (this.getStatus() == BMAP_STATUS_SUCCESS) {
    //     var mk = new BMap.Marker(r.point);
    //     map.addOverlay(mk);
    //     map.panTo(r.point);
    //     console.log('r.point:', r.point);
    //   } else {
    //     alert('failed' + this.getStatus());
    //   }
    // }, {enableHighAccuracy: true})
    var self = this;
    var options = {
      onSearchComplete: function(results) {
        if (local.getStatus() == BMAP_STATUS_SUCCESS) {
          // let addressResults = [];
          // for (var i = 0; i < results.getCurrentNumPois(); i++) {
          //   addressResults[i].street = results.getPoi(i).title
          // }
          // console.log('addressResults---:',addressResults);
          self.setState({addressResults: results.wr});
        }
      }
    };
    var local = new BMap.LocalSearch(map, options);
    var myGeo = new BMap.Geocoder();
    this.setState({local: local});
    this.setState({myGeo: myGeo})
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(r => {
      var mk = new BMap.Marker(r.point);
      this.setState({mk: mk});
      mk.setPosition(r.point)
      map.addOverlay(mk);
      var pos = new BMap.Point(r.point.lng, r.point.lat);
      map.centerAndZoom(pos, 18);
      //local.search(pos);
      myGeo.getLocation(new BMap.Point(pos.lng, pos.lat), (result) => {
        if (result) {
          var address = result.address;
          local.search(address);
        }
      });
      map.addEventListener('dragend', () => {
        var position = map.getCenter();
        this.state.mk.setPosition(position);
        //获取当前标示所在的坐标
        myGeo.getLocation(new BMap.Point(position.lng, position.lat), (result) => {
          if (result) {
            local.search(result.address);
          }
        });
      })
    }, {enableHighAccuracy: true})
  }
  handleChange(e) {
    var searchSpot = e.target.value;
    this.state.local.search(searchSpot);
    this.state.myGeo.getPoint(searchSpot, (point) => {
      if (point) {
        this.state.map.panTo(point);
        this.state.mk.setPosition(point);
      }
    }, this.state.curCity)
  }
  handleChooseCity() {
    const {actions} = this.props;
    actions.setCityModal(true);
  }
  render() {
    const {user, actions} = this.props;

    return (
      <div className='map'>
        <div className='map-head'>
          地区：<label onClick={this.handleChooseCity}>北京市</label>
        </div>
        <div className='map-cons'>
          <div className='map-body' ref='bmap'></div>
          <div className='searchbox'>
            <input type='text' placeholder='请输入小区或大厦名称' onChange={this.handleChange}/>
          </div>
        </div>
        <div className='map-detail'>
          {this.state.addressResults.map((item, index) => <AddressItem key={index} address={item.address} title={item.title} handAddressClick={() => {
            const {actions} = this.props;
            actions.getSearchPosi(item);
          }}/>)}
        </div>
        <ChooseCity actions={this.props.actions} />
      </div>
    )
  }
}
