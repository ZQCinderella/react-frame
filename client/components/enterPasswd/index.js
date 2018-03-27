import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import classnames from 'classnames';
import './enterPasswd.less';


//支付的键盘可以自己模拟一个，更为灵活一点

const keyArray = ['one', 'two', 'three', 'four', 'five', 'six'];
const keyObject = { one: '', two: '', three: '', four: '', five: '', six: '' };
class EnterPasswd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render: false
    }
    this.passwd = '';
    this._index = 0;
    this.notClear = true;
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      clear: nextProps.clear
    });
  }
  handleKeyDown = (e) => {
    const { key, keyCode } = e;
    const { keyName, getValue } = this.props;
    if (this._index > 5) return;
    if (/\d/.test(key)) {
      const pwdKey = keyArray[this._index];
      keyObject[pwdKey] = key;
      this.setState({
        render: true
      });
      if (this._index === 5) {
        keyArray.forEach((item, index) => {
          this.passwd += keyObject[item];
        });
        this.notClear = true;
        getValue && getValue(this.passwd);
      }
      this._index++;
    } else if (key === 'Backspace') {
      if (this._index === 0) return;
      this._index--;
      const pwdKey = keyArray[this._index];
      keyObject[pwdKey] = '';
      this.setState({
        render: true
      });
    }
  }
  clearPwd = () => {
    keyArray.forEach(item => {
      keyObject[item] = '';
    });
    this.passwd = '';
    this._index = 0;
    this.notClear = false;
  }
  render() {
    if (this.state.clear && this.notClear) this.clearPwd();
    return (
      <div className="f-passwd-container">
        <input className="pwd-input" type="tel" name="pwd" onKeyDown={this.handleKeyDown} autoFocus />
        {
          keyArray.map(item => {
            return <div className={classnames('input-mask', { show: keyObject[item] !== '' })} key={item}><span></span></div>
          })
        }
      </div>
    );
  }
}
EnterPasswd.propTypes = {
  clear: PropTypes.bool,
  getValue: PropTypes.func       //组件外部用来收集密码的方法
};
export default EnterPasswd;
