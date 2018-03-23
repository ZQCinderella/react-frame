import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './button.less'

class Button extends Component {
  clickHandle = (e) => {
    const { href, disabled, onClick } = this.props;
    if (!disabled) {
      onClick && onClick(event);
    }
  }
  render() {
    const { style, classes, onClick, children,  size, type, disabled, htmlType, href, target } = this.props;
    const className = classnames('f-btn', classes, size, type, { 'btn-disabled': disabled});
    const elem = href ? 'a' : 'button';
    const props = {
      style,
      className,
      href,
      target,
      disabled,
      onClick: onClick ? this.clickHandle : null
    }
    return React.createElement(elem, props, children);
  } 
}

Button.propTypes = {
  style: PropTypes.object,
  classes: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['btn-sm', 'btn-md', 'btn-lg']),
  type: PropTypes.oneOf(['default', 'primary', 'info', 'danger']),
  disabled: PropTypes.bool,
  href: PropTypes.string,       //如果存在则把button转为a标签
  htmlType: PropTypes.string,
  target: PropTypes.string,    //href存在时生效
}

Button.defaultProps = {
  type: 'default',
  size: 'btn-md',
  disabled: false
}
export default Button;

