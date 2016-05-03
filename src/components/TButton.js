//封装最大的按钮
import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
export default class TButton extends Component {
  static propTypes = {
    handleClick: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    canSee: PropTypes.bool.isRequired
  };
  static defaultProps = {
    canSee: true
  };
  state = {
    canSee: this.props.canSee
  }; //学习，此处无用
  //bgcolor='#F0F0F0' mtop='140'
  render() {
    const btnClass = classnames({
      'component-btn': true,
      'nosee': !this.props.canSee
    })
    const {bgcolor, mtop} = this.props;
    return (
      <div className={btnClass} style={{backgroundColor:bgcolor,marginTop:mtop}}>
        <div className='btn'>
          <a onClick={this.props.handleClick}>{this.props.name}</a>
        </div>
      </div>
    )
  }
}
