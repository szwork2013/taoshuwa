import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as Actions from '../actions'
import {AddressItem, ChooseCity} from '../components'
import {saveCookie, getCookie, signOut} from '../utils/authService'
@connect(state => ({
  user: state.auth.toJS().user,
  curCity: state.posi.toJS().curCity,
  cityModal: state.other.toJS().cityModal
}),
  dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
}))
export default class Demo extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log('componentDidMount-------------:', this.props.open);
  }
  ComponentWillUpdate(nextProps, nextState) {
    console.log('nextProps--:', nextProps);
    console.log('nextState--:', nextState);
  }
  ComponentWillReceiveProps(nextProps) {
    console.log(12355666);
    this.setState({state: nextProps.open})
  }
  render() {
    const style = {
      width: '100%',
      height: '1000px',
      position: 'fixed',
      top: '0',
      left: '0',
      backgroundColor: '#fff',
      visibility: 'visible',
      zIndex: '9999'
    }
    const cityArray = ['成都市','广州市','上海市'];
    return (
      <div>
        {this.props.cityModal
          ? (
            <div style={style} >
              <label>当前城市：</label> <br /> 北京市<br />
              <label>可选城市：</label> <br />
              <ul>
                {cityArray.map( (city,index) =>{
                  return <li key={index} onClick={() => {
                    const {actions} = this.props;
                    actions.setCityModal(false);
                  }}>{city}</li>
                })}
              </ul>
            </div>
          )
          : null}
      </div>
    )
  }
}
