import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as Actions from '../actions'
import {AddressItem, ChooseCity} from '../components'
import {saveCookie, getCookie, signOut} from '../utils/authService'
@connect(state => ({user: state.auth.toJS().user, curCity: state.posi.toJS().curCity, cityModal: state.other.toJS().cityModal}), dispatch => ({
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
    const cityArray = ['北京市','成都市', '广州市', '上海市'];
    const {cityModal,handleOnChoosed,autoCity} = this.props;
    const rhtml = cityModal
      ? (
        <div className='choose-city' onClick={()=>{
          const {actions} = this.props;
          actions.setCityModal(false);
            }}>
          <div className='auto-title'>当前城市：</div>
          <div className='auto-city' onClick={() => {
            const {actions} = this.props;
            actions.setCityModal(false);
            handleOnChoosed('北京市')
          }} >{autoCity}</div>
          <div className='choose-title'>可选城市：</div>
          <div className='choose-items'>
            <ul>
              {cityArray.map((city, index) => {
                return <li key={index} onClick={() => {
                  const {actions} = this.props;
                  actions.setCityModal(false);
                  handleOnChoosed(city)
                }}>{city}</li>
              })}
            </ul>
          </div>
        </div>
      )
      : (null)
    return (
      <div>
        {rhtml}
      </div>
    )
  }
}
