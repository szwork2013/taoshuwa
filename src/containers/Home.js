import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as Actions from '../actions';
class Home extends Component {
  componentDidMount() {
    const {actions} = this.props;

    // navigator.geolocation.getCurrentPosition(function(posi){
    //   const point = new BMap.Point(posi.coords.longitude,posi.coords.latitude,)
    //   var gc = new BMap.Geocoder(); //初始化，Geocoder类
    //   gc.getLocation(point, function (rs) {
    //
    //   })
    // })

    new BMap.Geolocation().getCurrentPosition(function(r) {
      if (this.getStatus() === BMAP_STATUS_SUCCESS) {
        let point = r.point;
        //point = new BMap.Point(117.21081309,39.1439299);
        new BMap.Geocoder().getLocation(point, function (rs) {
          let address = rs.address;
          let addressComponents = rs.addressComponents;
          let point = rs.point;
          let newPosi = {address, addressComponents,point}

          actions.getAutoPosi(newPosi);
          actions.getUserInfo(point);
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
        {/*{<div className='nav'>
          <Link to='/book' className='elem'>借书</Link>
          <Link to='/book/add' className='elem'>捐书</Link>
        </div>}*/}
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
