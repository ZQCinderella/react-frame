import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radio from './index';

class RadioGroup extends Component {
  componentWillMount() {
    this.setState({
      checkedId: this.props.checkedId
    });
  }
  componentWillReceiveProps(nextProps) {
    const { checkedId } = this.state;
    if (nextProps.checkedId !== checkedId) {
      this.setState({
        checkedId: nextProps.checkedId
      });
    }
  }
  singleRadioClick = (checkedId) => {
    this.setState({
      checkedId
    });
    const { id, getValue } = this.props;
    if (getValue) getValue({ [id]: checkedId });
  }
  render() {
    const { checkedId } = this.state;
    console.log(checkedId);
    const { radios, style, cls } = this.props;
    return (
      <div className={cls} style={style}>
        {
          radios && radios.length > 0 ? (radios.map((item, index) => {
            return <Radio key={item.id} checked={String(checkedId) === String(item.id)} onChange={this.singleRadioClick} {...item} />
          })) : null
        }
      </div>
    );
  }
}
RadioGroup.propTypes = {
  id: PropTypes.string,    //可能有很多个radioGroup组， 所以每个组需要一个id
  checkedId: PropTypes.string,
  radios: PropTypes.array,
  getValue: PropTypes.func,
  style: PropTypes.object,
  cls: PropTypes.string
}
export default RadioGroup;
