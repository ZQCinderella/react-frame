import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import classnames from 'classnames';
import './radio.less';

class Radio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false
    }
  }
  componentWillMount() {
    this.setState({
      checked: this.props.checked
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.state.checked) {
      this.setState({
        checked: nextProps.checked
      });
    }
  }
  clickRadio = () => {
    const { disabled, id, onChange } = this.props;
    if (disabled) return;
    this.setState({
      checked: true
    });
    if (onChange) onChange(id); 
  }
  render() {
    const { checked } = this.state;
    const { disabled, text, onChange } = this.props;
    return (
      <div className="f-radio-outer" onClick={this.clickRadio}>
        <div className={classnames('f-radio-circle', { checked, disabled })}>
          <span className="f-radio-dot"></span>
        </div>
        <span>{text}</span>
      </div>
    );
  }
}
Radio.propTypes = {
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  id: PropTypes.string,           // 这个组件的唯一key, 因为可能批量生成好几个
  text: PropTypes.string,
  onChange: PropTypes.func
}
Radio.defaultProps = {
  disabled: false
}
export default Radio;
