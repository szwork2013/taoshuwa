import React, {Component} from 'react'
import {Link} from 'react-router';
export default class TModalIn extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {holder, name, handleClick, bookid, valueinfo, cansee} = this.props;
    let className = ['tmodal'];
    if(cansee){
      className.push('modalshow');
    }else{
      className.push('modalhide');
    }
    className = className.join(' ');
    return (
      <div className={className} onClick={handleClick}>
        <div className='info' onClick={(e)=>{ e.stopPropagation();}}>
          <textarea rel='comment' value={valueinfo}  placeholder={holder}></textarea>
          <Link to={`/book/${bookid}`} onClick={handleClick}>{name}</Link>
        </div>
      </div>
    )
  }
}
