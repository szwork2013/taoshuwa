import React, {Component} from 'react'
import {Link} from 'react-router';

export default class TModalIn extends Component{

  constructor(props){
    super(props);
  }

  render(){
    const {holder,name,handleClick,bookid,valueinfo} = this.props;
    return (
      <div className='tmodal' >
        <div className='info'>
          <textarea rel='comment' value={valueinfo} placeholder={holder}></textarea>
          <Link to={`/book/${bookid}`} onClick={()=>{React.unmountComponentAtNode(this)}}>{name}</Link>
        </div>
      </div>
    )
  }
}
