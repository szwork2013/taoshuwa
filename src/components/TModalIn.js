import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router';
export default class TModalIn extends Component {
  constructor(props) {
    super(props);
    this.handleBtnClick = this.handleBtnClick.bind(this);
  }

  static propTypes = {
    holder:PropTypes.string,
    name:PropTypes.string.isRequired,
    handleClick:PropTypes.func.isRequired,//处理按钮事件
    handleTouchClick:PropTypes.func.isRequired,//处理蒙板事件
    cansee:PropTypes.bool
  }

  handleBtnClick(){
    const {handleClick} = this.props;
    const content = this.refs.content.value;
    handleClick(content);
  }

  render() {
    const {holder, name, handleClick,handleTouchClick, valueinfo, cansee} = this.props;
    let className = ['tmodal'];
    let className_info = ['info'];
    if(cansee){
      className.push('modalshow');
      className_info.push('modalshow');
    }else{
      className.push('modalhide');
      className_info.push('modalhide');
    }
    className = className.join(' ');
    className_info = className_info.join(' ');
    return (
      <div>
        <div className={className} onClick={handleTouchClick}></div>
        <div className={className_info} onClick={(e)=>{ e.stopPropagation();}}>
          <textarea rel='comment' value={valueinfo} ref='content'  placeholder={holder}></textarea>
          <a onClick={this.handleBtnClick}>{name}</a>
        </div>
      </div>
    )
  }
}
