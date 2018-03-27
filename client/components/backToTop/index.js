import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { createPortal } from 'react-dom';
import classnames from 'classnames';
import './backToTop.less';

//注意使用该组件时，body，html,layout等容器的高度不能设置为height: 100%; 不然监听会失效。
class BackToTop extends Component {
  state = {
    showBtn: false,
    scrollY: 0
  }
  componentDidMount() {
    this.listenWinScroll();
  }
  listenWinScroll = () => {
    let ry = 0; // 参考标准
    let showBtn = false;
    const { topBoundary } = this.props;
    window.addEventListener('scroll', () => {
      const sy = this.getTheScrollY();
      if (!ry) ry = sy;
      // if (ry - sy > 0) console.log('向上滑')
      // else console.log('向下滑');
      ry = sy;
      try {
        if (sy > Number(topBoundary)) showBtn = true;
        else showBtn = false;
      } catch (e) {
        console.log(e);
      }
      this.setState({
        showBtn,
        scrollY: sy
      });
    });
  }
  componentWillUnMount() {
    window.removeEventListener('scroll');
  }
  getTheScrollY = () => {
    return document.documentElement.scrollTop || document.body.scrollTop;
  }
  clickBackToTopBtn = () => {
    const backTimeNeeded = Number(this.props.backTimeNeeded) * 1000;
    const startSy = this.getTheScrollY(),
      startTime = new Date().getTime(),
      speed = startSy / backTimeNeeded;
    const fn = () => {
      const sy = this.getTheScrollY();
      if (sy > 0) {
        window.requestAnimationFrame(fn);
        const moveDistance = (new Date().getTime() - startTime) * speed;
        window.scrollTo(0, sy - moveDistance);
      }
    }
    fn();
  }
  render() {
    const { showBtn } = this.state;
    const classes = classnames('back-to-top', { show: showBtn });
    // return (
    //   <div className={classes} onClick={this.clickBackToTopBtn}></div>
    // );
    if (showBtn) return createPortal(<div className={classes} onClick={this.clickBackToTopBtn}></div>, document.body)
    return null;
  }
}

BackToTop.propTypes = {
  triggerBoundary: PropTypes.string,     //scrollY超过多少出现回到顶部的按钮
  backTimeNeeded: PropTypes.string,  //返回顶部需要的时间
  onCallback: PropTypes.func
}
BackToTop.defaultProps = {
  topBoundary: 100,
  backTimeNeeded: 1
}
export default BackToTop;
