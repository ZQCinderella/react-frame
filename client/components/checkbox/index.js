import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import classnames from 'classnames';
import './checkbox.less';

class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      cls: '',
      style: null,
      list: [null, null]
    }
  }
  componentWillMount() {
    this.setState({
      ...this.props
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({
      ...nextProps
    });
  }
  clickCheckbox = (item, index) => {
    return () => {
      const { getValue, id } = this.state;
      if (item.disabled) return;
      const list = this.state.list;
      list[index].checked = !list[index].checked;
      this.setState({
        list
      }, () => {
        if (getValue) getValue({ [id]: list });
      });
    }
  }
  listCheckBox = () => {
    const { list, style, cls, id } = this.state;
    return list.map((item, index) => {
      return (<div className={`f-checkbox-item ${cls}`} style={style} onClick={this.clickCheckbox(item, index)} key={item.id}>
        <label className={classnames('f-checkbox-outer', { checked: item.checked, disabled: item.disabled })}>
          <span className="f-checkbox-inner"></span>
        </label>
        <div className="f-checkbox-text">{item.text}</div>
      </div>);
    });
  }
  render() {
    const { list } = this.state;
    return (<div className="f-checkbox-list">
      {
        list && list.length > 0 ? this.listCheckBox() : null
      }
    </div>)
  }
}
Checkbox.propTypes = {
  id: PropTypes.string,
  cls: PropTypes.string,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  list: PropTypes.array,
  getValue: PropTypes.func
}
export default Checkbox;
