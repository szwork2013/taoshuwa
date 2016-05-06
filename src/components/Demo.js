import React from 'react'
import ChooseCity from './ChooseCity.js'

export default class D extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      open:false
    }
  }
  render(){
    return(
      <div>
        <button onClick={()=>{this.setState({open:true})}}>test</button>
        <ChooseCity open={this.state.open}/>
      </div>
    )

  }
}
