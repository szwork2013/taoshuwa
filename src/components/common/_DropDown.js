import {DropDown} from 'react-ui-component';
import React from 'react';
import css from './css/demo.less';
const options = [
  {
    name: '小说',
    value: 1
  }, {
    name: '文学',
    value: 2
  }, {
    name: '经管励志',
    value: 3,
    disabled: true
  }, {
    name: '科技',
    value: 4
  }, {
    name: '科技',
    value: 5
  }
];

export default class TSWDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      value1: 5,
      value2: '',
      value3: [
        2, 4
      ],
      value4: [1, 3]
    };
  }
  displayChange(stat, value) {
    this.setState({
      [String(stat)]: value
    });
  }
  render() {
    const style = {
      height: '39px',
      width: '200px',
      float: 'left',
      display: 'inline-block',
      marginTop: '5px',
      marginLeft: '-1px'
    }
    return (
      <div style={style}>
        <ul>
          <li style={{
            float: 'left'
          }}>
            <div style={{
              'width': '280'
            }}>
              <DropDown options={options} labelName='name' valueName='value' onChange={this.displayChange.bind(this, 'value')}/>
            </div>
          </li>
        </ul>
      </div>
    )
    return (
      <div>
        <ul className="two">
          <li>
            <div style={{
              'width': '280'
            }}>
              <DropDown options={options} labelName='name' valueName='value' onChange={this.displayChange.bind(this, 'value')}/>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
