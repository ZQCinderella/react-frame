import React, { Component } from 'react'
import { Map } from 'immutable'
import moment from 'moment'
import { Form, Input, Col, Select, Checkbox, DatePicker, InputNumber, Switch, Icon, Radio, Modal, Button } from 'antd'
const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
// import locale and change the Component language to Chinese
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 18 },
};

const FormItem = Form.Item;
class SForm extends Component {
  constructor(props) {
    super(props);
    const { colSpan, ...params } = this.props.params;
    this.state = {
      colSpan: colSpan || 7,
      ...params
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      array: nextProps.params.array
    });
  }
  sortFormItem = () => {
    const { colSpan, offset, getFieldDecorator, formValues, array } = this.state;
    const children = [];
    let offsetInner = offset || 0;

    //居中
    if (colSpan === 12) offsetInner = 6;
    array.forEach((item, index) => {
      let innerDom = '';   //真正要渲染的组件
      const { cnName, enName, comType, required, ...rest } = item;
      let initialValue = this.state.formValues[enName];
      switch (comType) {
        case 'input':
          //initialValue = initialValue ? (parseFloat(initialValue) * 100).toFixed(2) : initialValue;
          innerDom = <Input placeholder={`请输入${cnName}`} autoComplete="off" {...rest} />;
          break;
        case 'radio':
          innerDom = (
            //传一个options参数进来 options = [{ label: '', value: '', disabled: ''}, {}, {}] size, defaultValue, name, onChange等选填
            <RadioGroup {...rest} />
          );
          break;
        case 'checkbox':
          innerDom = (
            //和radio一样，可以从数组生成 checkbox组
            <CheckboxGroup {...rest} />
          )
          break;
        case 'select':
          initialValue = initialValue ? initialValue.toString() : '';
          innerDom = (
            /* eslint-disable */
            <Select placeholder={`请选择${cnName}`} getPopupContainer={triggerNode => triggerNode.parentNode} dropdownStyle={{top: '0px'}}  {...rest}>
              {
                (() => {
                  const _enum = [];
                  for (const p in rest.options) {
                    if (rest.options[p]) {
                      if ( Number(p) === 0) {
                        _enum.push(<Option key={p} value=''>{rest.options[p]}</Option>);                        
                      } else {
                        if (isNaN(p)) _enum.push(<Option key={p} value={p}>{rest.options[p]}</Option>);
                        else _enum.push(<Option key={p} value={rest.options[p]}>{rest.options[p]}</Option>);
                      }
                    }
                  }
                  return _enum;
                })()
              }
            </Select>
          );
          break;
        case 'switch':
          //默认指定了选中和未选中时的内容
          innerDom = <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} {...rest} />;
          break;
        case 'inputNumber':
          /*
          千分位数字   1,000,000     formatter是输入内容的自动转换格式， parser是指定从formatter中转换回数字的方式
          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/\$\s?|(,*)/g, '')}
          */
          innerDom = <InputNumber formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/\$\s?|(,*)/g, '')} {...rest} />;
          break;
        case 'datePicker':
          innerDom = <DatePicker placeholder={['开始时间', '结束时间']} format='YYYY-MM-DD' style={{ width: '100%' }} {...rest} />;
          break;
        case 'rangePicker':
          innerDom = <RangePicker placeholder={['开始时间', '结束时间']} format='YYYY-MM-DD' style={{ width: '100%' }} {...rest}/>;
          break;
        default:
          innerDom = <span {...rest}>{this.state.formValues[item[cnName]]}</span>;
      }
      //初始值
      //将key和 innerDom 进行双向绑定
      children.push((
        <Col span={colSpan} offset={offset} key={enName}>
          <FormItem
            {...formItemLayout}
            label={cnName}
          >
            {
              getFieldDecorator(enName, {
                initialValue,
                rules: [{required: required || false, message: `请输入${cnName}`}]
              })(
                innerDom
                )}
          </FormItem>
        </Col>
      ));
    });
    return <div>{children}</div>;
  }
  render() {
    return (
      <div>{this.sortFormItem()}</div>
    );
  }
}

const generatorColums = (columsMap) => {
  const array = [];
  for (const key in columsMap) {
    if (key && columsMap[key]) {
      array.push(
        {
          title: columsMap[key].title,
          dataIndex: key,
          key,
          render: columsMap[key].render || null,
          sorter: columsMap[key].sorter || null,
          sortOrder: columsMap[key].sortOrder || 'descend',
          width: columsMap[key].width || null,
          children: columsMap[key].children || null
        }
      );
    }
  }
  return array;
};

const setActiveMenu = (router) => {
  const moduleName = 'finance';
  //改变左侧菜单栏的选中状态
  if (window.siderAction && window.siderAction.setSiderState) {
    window.siderAction.setSiderState({
      initData: window.INIT_DATA,
      selectedKeys: [`$${moduleName}$${router}`]
    })
  }
}

const enumFields = {
  orderChannelMap: {
    0: '全部',
    1: '装修贷',
    2: '租赁贷'
  },
  channelTypeMap: {
    0: '全部',
    'SXY': '首信易',
    'LFT': '理房通'
  },
  payStatusMap: {
    0: '全部',
    'SUCCESS': '支付成功',
    'PROCESSING': '支付中',
    'UNPAID': '未支付',
    'FAILURE': '支付失败',
  },
  payWayMap: {
    0: '全部',
    'DK': '认证支付',
    'QP': '快捷支付'
  }
}

class ModelButton extends Component { // 能够触发带form的弹窗的按钮, 需要参数包括: 
  // {colSpan, getFieldDecorator, formValues, array}：form表单所需信息，直接传入组件PjForm
  // innerThis：包含该组件的父组件的this；
  // title：Model的title；
  // mainButtonName：需要显示在页面的按钮的文字
  // mainButtonStyle：需要显示在页面的按钮的样式
  // confirmButtonName：确认按钮现实的字符，如果缺省，将现实确认；
  // url：提交表单需要触发的action的url；
  // funcName：提交表单需要触发的action的方法；
  // addon:需要附加提交的信息
  // handleClick:点击按钮触发的方法
  constructor(option) {
    super(option);

    this.state = {
      modelVisible: false,
    }
  }

  handleModelCancel = () => {
    this.setState({
      modelVisible: false
    })
  };

  handleModelSubmit = (evt) => {
    evt.preventDefault();
    const { form, action } = this.props.innerThis.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        //console.error(values);
        let queryObj = Object.assign({
          URL: this.props.URL
        }, values, this.props.addon ? this.props.addon : {});
        // special step for risk control
        if (queryObj.memo1 || queryObj.memo2) {
          queryObj.memo = queryObj.memo1 || queryObj.memo2;
        }
        if (queryObj.rejectReason0) {
          queryObj.rejectReason = queryObj.rejectReason0
        }
        if (this.props.limitKey) {
          const queryObjNew = {};
          this.props.limitKey.forEach((theKey) => {
            queryObjNew[theKey] = queryObj[theKey]
          });
          queryObj = queryObjNew;
        }
        console.error('handleModelSubmit', queryObj);
        action[this.props.funcName](queryObj, () => {
          this.setState({
            modelVisible: false
          })
        })
      }
    });
  };

  showModel = (e) => {
    this.setState({
      modelVisible: true
    })
    const { handleClick } = this.props;
    if (handleClick) {
      handleClick();
    }
  }

  render() {

    const modelParams = {
      colSpan: 20,
      getFieldDecorator: this.props.getFieldDecorator,
      formValues: this.props.formValues,
      array: this.props.array,
    };

    // 如果希望组件重新渲染，只需要改变props的theKey属性即可
    const key = this.props.theKey ? this.props.theKey : 'modelKey'

    return (
      <span>
        <Button type="primary" style={this.props.mainButtonStyle} size="default" onClick={this.showModel}>{this.props.mainButtonName}</Button>
        {this.state.modelVisible ? (<Modal
          title={this.props.title}
          visible={this.state.modelVisible}
          onCancel={this.handleModelCancel}
          maskClosable={false}
          footer={null}
        >
          <Form
            onSubmit={this.handleModelSubmit}
          >
            <PjForm params={modelParams} key={key}></PjForm>
            <Button type="primary" style={{ marginLeft: '27.8%' }} htmlType="submit" size="default">{this.props.confirmButtonName ? this.props.confirmButtonName : '确认'}</Button>
            <Button type="default" style={{ marginLeft: 15 }} size="default" onClick={this.handleModelCancel}>取消</Button>
          </Form>
        </Modal>) : <span></span>}
      </span>
    )
  }
}

export default {
  SForm,
  ModelButton,
  generatorColums,
  enumFields,
  setActiveMenu
}
