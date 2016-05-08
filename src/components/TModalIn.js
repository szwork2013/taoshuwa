import React, {Component} from 'react'
import {Link} from 'react-router';
export default class TModalIn extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {holder, name, handleClick, bookid, valueinfo, cansee} = this.props;
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
        <div className={className} onClick={handleClick}></div>
        <div className={className_info} onClick={(e)=>{ e.stopPropagation();}}>
          <textarea rel='comment' value={valueinfo}  placeholder={holder}></textarea>
          <Link to={`/book/${bookid}`} onClick={handleClick}>{name}</Link>
        </div>
      </div>
    )
  }
}
