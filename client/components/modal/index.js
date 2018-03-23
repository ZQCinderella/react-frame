import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './modal.less';

class Modal extends Component {
  generateBtns = (btns) => {
    //btns按钮组中，始终有一个要提供一个属性role: 'close', 用于 maskClick去关闭弹框
    return btns.map((elem, index) => {
      const { cls, text, ...rest } = elem;
      const classes = classnames('m-btn', cls);  //cancel, confirm
      return <button className={classes} {...rest} key={index.toString()}>{text}</button>
    });
  }
  maskClick = (e) => {

    if (!this.props.maskClosable) return;
    const { btns } = this.props;
    const item = btns.filter(elem => elem.role === 'close')[0];
    const fn = item.onClick;
    fn && fn(e);
  }
  renderModalHtml = () => {
    const { children, cls, style, title, content, btns } = this.props;
    return (
      <div className="f-modal-dom">
        <div className="f-modal-mask" onClick={this.maskClick}></div>
        <div className="f-modal-container">
          {
            children ? children : (
              <div>
                {
                  title ? (
                    <p className="f-modal-title">{title}</p>
                  ) : null
                }
                {
                  content ? (
                    <div className="f-modal-content">{content}</div>
                  ) : null
                }
              </div>
            )
          }
          <div className="footer-seat"></div>
          <div className="f-modal-footer">
            {
              this.generateBtns(btns)
            }
          </div>
        </div>
      </div>
    )
  }
  render() {
    const { visible } = this.props;
    // createPortal创造的组件是可以独立于body的直接子元素的
    if (visible) {
      return createPortal(this.renderModalHtml(), document.body);
    }
    return null;
  }
}
Modal.propTypes = {
  visible: PropTypes.bool,
  maskClosable: PropTypes.bool,
  cls: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.string,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  btns: PropTypes.array.isRequired,
  children: PropTypes.element
}
Modal.defaultProps = {
  visible: false,
  maskClosable: true
}
export default Modal;

