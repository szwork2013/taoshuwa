import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as Actions from '../actions';
class Home extends Component {
  getPosi() {
    console.log(1);
    var map,geolocation;
    //加载地图，调用浏览器定位服务
    map = new AMap.Map(this.refs.amap, {resizeEnable: true});
        console.log(2);
    map.plugin('AMap.Geolocation', function() {
          console.log(3);
      geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, //是否使用高精度定位，默认:true
        timeout: 10000, //超过10秒后停止定位，默认：无穷大
        buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        buttonPosition: 'RB'
      });

      map.addControl(geolocation);
      geolocation.getCurrentPosition();
      AMap.event.addListener(geolocation, 'complete', data=>{
        console.log('4:data',data);
        let lnglatXY = [data.position.lng, data.position.lat];
        console.log('4:data',lnglatXY);
        var geocoder = new AMap.Geocoder({radius: 1000, extensions: "all"});
        geocoder.getAddress(lnglatXY, function(status, result) {
          if (status === 'complete' && result.info === 'OK') {
            console.log('result:', result);
            alert(result.regeocode.formattedAddress);
          }
        });

      }); //返回定位信息
      AMap.event.addListener(geolocation, 'error', ()=>{
        alert('定位失败');
      }); //返回定位出错信息
    });
  }


  componentDidMount() {
    const {actions} = this.props;
    //this.getPosi();

    new BMap.Geolocation().getCurrentPosition(function(r) {
      if (this.getStatus() === BMAP_STATUS_SUCCESS) {
        let point = r.point;
        //point = new BMap.Point(116.21081309,39.1439299);
        new BMap.Geocoder().getLocation(point, function(rs) {
          let address = rs.address;
          let addressComponents = rs.addressComponents;
          let point = rs.point;
          let newPosi = {
            address,
            addressComponents,
            point
          }
          actions.getUserInfo(point);
          actions.getAutoPosi(newPosi);
          actions.fetchBooks(point);
        })
      } else {
        alert('定位失败');
      }
    })
  }
  render() {
    const {friendlist, actions, children, auth} = this.props;
    let phone = 0;
    if (auth.user) {
      phone = auth.user.phone;
    }
    const urlpath = window.location.pathname;
    //alert(urlpath);
    return (
      <div className={urlpath === '/register'
        ? 'bg-white'
        : 'bg-default'}>
        {children}
        <div ref='amap'></div>
      </div>
    );
  }
}
Home.PropTypes = {
  auth: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}
function mapStateToProps(state) {
  return {friendlist: state.friendlist, auth: state.auth}
}
function mapDispathToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispathToProps)(Home)
