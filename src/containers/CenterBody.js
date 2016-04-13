import React, {Component, PropTypes} from 'react';
import {connect} from 'redux';
import {Link} from 'react-router';
import CenterItem from '../components/CenterItem.js';
class CenterBody extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }
  clickHandler(e) {
    e.preventDefault();
    alert('click the handler');
  }
  render() {
    const categorys = [
      {
        title: '我借到的书',
        handler: this.clickHandler
      }, {
        title: '我捐赠的书',
        handler: this.clickHandler
      }, {
        title: '我的心愿单',
        handler: this.clickHandler
      }, {
        title: '我的通知',
        handler: this.clickHandler
      }, {
        title: '借书规则',
        handler: this.clickHandler
      }
    ]
    const {user} = this.props;
    const length = categorys.length;
    const centerBody = categorys.map((item, index) => {
      if (index === length - 1) {
        return <CenterItem key={index} title={item.title} haveline={false} handler={item.handler}/>
      } else {
        return <CenterItem key={index} title={item.title} haveline={true} handler={item.handler}/>
      }
    })
    return (
      <div className='center-body'>
        <ul>
          {centerBody}
        </ul>
      </div>
    )
  }
}
export default CenterBody;
