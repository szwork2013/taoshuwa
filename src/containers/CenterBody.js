import React, {Component, PropTypes} from 'react';
import {connect} from 'redux';
import {Link,browserHistory} from 'react-router';
import {LoginOut,CenterItem} from '../components'
import {isOwnEmpty} from '../utils';
class CenterBody extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }
  clickHandler(e) {
    e.preventDefault();
    browserHistory.push('messagelist');
  }

  render() {
    const {user,logout} = this.props;

    const categorys = isOwnEmpty(user) ? [
      {
        title: '我借到的书',
        handler: ()=>{return browserHistory.push('messagelist');}
      }, {
        title: '我捐赠的书',
        handler: ()=>{return browserHistory.push('loanlist');}
      }, {
        title: '我的心愿单',
        handler: ()=>{return browserHistory.push('desirelist');}
      }, {
        title: '我的通知',
        handler: ()=>{return browserHistory.push('messageList');}
      }, {
        title: '借书规则',
        handler: ()=>{return browserHistory.push('borrowrules');}
      }
    ]:[{
        title: '赚积分',
        handler: ()=>{return browserHistory.push('earnpoints');}
      },{
        title: '我借到的书',
        handler: ()=>{return browserHistory.push('borrowlist');}
      }, {
        title: '我捐赠的书',
        handler: ()=>{return browserHistory.push('loanlist');}
      }, {
        title: '我的心愿单',
        handler: ()=>{return browserHistory.push('desirelist');}
      }, {
        title: '我的通知',
        handler: ()=>{return browserHistory.push('messageList');}
      }, {
        title: '借书规则',
        handler: ()=>{return browserHistory.push('borrowrules');}
      }, {
        title: '注销',
        handler: ()=>{logout()}
      }
    ]

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
