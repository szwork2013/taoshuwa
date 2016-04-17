import React,{Component} from 'react';
export default class LoginOut extends Component {
  render(){
    return (
      <div style={{width:'50%', height:'30px',textAlign:'center'}}>
        <button onClick={this.props.logout}>注 销</button>
      </div>
    )
  }
}
