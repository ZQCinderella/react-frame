import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

import { Button, Modal, Radio, RadioGroup } from '../../components/';
import './Dashboard.less'

const propTypes = {

}
class Dashboard extends Component {
  constructor(options) {
    super(options)
    this.state = {
      text: 'react',
      showAlert: false,
      modalVisible: false
    }
  }
  handleClick = () => {
    console.log('click');
    this.setState({
      showAlert: !this.state.showAlert
    });
  }
  changeText = (text) => {
    this.setState({
      text
    });
  }
  showModal = () => {
    console.log('show modal');
    this.setState({
      modalVisible: true
    });
  }
  onCancel = (e) => {
    e.stopPropagation();
    this.setState({
      modalVisible: false
    });
  }
  radioChange = () => {
    this.setState({
      checked: true
    });
  }
  getRadioValue = (obj) => {
    console.log(obj);
  }
  render() {
    const { showAlert, text, modalVisible } = this.state;
    return (
      <div className="w-con">
        <h1>Hello world</h1>
        <h3 style={{ color: '#0f0' }}>hello, 我是 {text}</h3>
        <button className="w-button" onClick={this.handleClick}>clike me</button>
        {
          showAlert ? <div>welcome to react</div> : null
        }
        <Button onClick={() => this.changeText('测试1')}>测试1</Button>
        <Button type="primary" onClick={() => this.changeText('测试2')}>测试2</Button>
        <Button size="btn-lg" type="danger" onClick={() => this.changeText('测试3')}>测试3</Button>
        <Button size="btn-lg" type="info" disabled onClick={() => this.changeText('测试4')}>测试4</Button>
        <Button size="btn-sm" href="http://www.baidu.com" onClick={() => this.changeText('测试5')}>测试5</Button>
        <Button type="primary" onClick={this.showModal}>show modal</Button>
        <Modal
          visible={modalVisible}
          title="各位市民注意了"
          content={`北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北
          京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了
          北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨
          了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨
          了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨了北京可能要下雨
          了北京可能要下雨了北京可能要下雨了北京可能要下雨了`}
          maskClosable
          btns={[
            { text: '取消', cls: 'cancel', role: 'close', onClick: this.onCancel },
            { text: '确定', cls: 'confirm', onClick: this.onCancel }
          ]}
        />
        <Radio id="radio-1" text='西瓜' checked={this.state.checked} onChange={this.radioChange} />
        <RadioGroup
          id="r-g-a"
          radios={[{ id: 'a', text: 'a', disabled: true }, { id: 'b', text: 'b' }]}
          checkedId="a"
          getValue={this.getRadioValue}
        />
      </div>
    )
  }
}
Dashboard.propTypes = propTypes;
export default Dashboard
