/**
 * Created by Emily on 2017/10/19.
 */
import { combineReducers } from 'redux-immutable'
import { Map, List } from 'immutable'
import * as Actions from './action'

const signPlatform = (state = Map({ //签约列表
  pageNum: 1,
  pageSize: 10,
  total: 0,
  list: List([])
}), action) => {
  switch (action.type) {
    case 'SIGN_PLATFORM':
      return Map(action.data);
    default:
      return state
  }
}
const deductPlatform = (state = Map({ //代扣支付列表
  pageNum: 1,
  pageSize: 10,
  total: 0,
  list: List([])
}), action) => {
  switch (action.type) {
    case 'DEDUCT_PLATFORM':
      return Map(action.data);
    default:
      return state
  }
}
const quickPay = (state = Map({ //快捷支付列表
  pageNum: 1,
  pageSize: 10,
  total: 0,
  list: List([])
}), action) => {
  switch (action.type) {
    case 'QUICK_PAY':
      return Map(action.data);
    default:
      return state
  }
}
const queryPayList = (state = Map({ //支付交易列表
  pageNum: 1,
  pageSize: 10,
  total: 0,
  list: List([])
}), action) => {
  switch (action.type) {
    case 'PAY_LIST':
      return Map(action.data);
    default:
      return state
  }
}
const queryPayDetail = (state = Map({ //支付详情列表
  pageNum: 1,
  pageSize: 10,
  total: 0,
  list: List([])
}), action) => {
  switch (action.type) {
    case 'PAY_DETAIL':
      return Map(action.data);
    default:
      return state
  }
}
const queryPOS = (state = Map({ //POS支付
  pageNum: 1,
  pageSize: 10,
  total: 0,
  list: List([])
}), action) => {
  switch (action.type) {
    case 'POS_PAY':
      return Map(action.data);
    default:
      return state
  }
}
const updateSign = (state = Map({
  checkStatusCode: ''
}), action) => {
  switch (action.type) {
    case 'UPDATE_SIGN':
      return action.data;
    default:
      return ''
  }
}
const updateDeduct = (state = Map({
  withholdStatusCode: ''
}), action) => {
  switch (action.type) {
    case 'UPDATE_DEDUCT':
      return action.data;
    default:
      return ''
  }
}
const updateQuick = (state = Map({
  
}), action) => {
  switch (action.type) {
    case 'UPDATE_QUICK':
      return action.data;
    default:
      return ''
  }
}
const updatePOS = (state = Map({
  
}), action) => {
  switch (action.type) {
    case 'UPDATE_POS':
      return action.data;
    default:
      return ''
  }
}
const payPlatform = (state = Map({ //支付平台
  pageNum: 1,
  pageSize: 10,
  total: 0,
  list: List([])
}), action) => {
  switch (action.type) {
    case 'PAY_PLATFORM':
      return Map(action.data);
    default:
      return state
  }
}

const getChannelList = (state = Map({ //支持通道
  pageNum: 1,
  pageSize: 10,
  total: 0,
  list: List([])
}), action) => {
  switch (action.type) {
    case 'CHANNEL_LIST':
      return Map(action.data);
    default:
      return state
  }
}

const getBankList = (state = Map({ //支持通道
  pageNum: 1,
  pageSize: 10,
  total: 0,
  list: List([])
}), action) => {
  switch (action.type) {
    case 'BANK_LIST':
      return Map(action.data);
    default:
      return state
  }
}

export default combineReducers({
  signPlatform,
  deductPlatform,
  updateSign,
  updateDeduct,
  quickPay,
  updateQuick,
  queryPayList,
  queryPayDetail,
  queryPOS,
  updatePOS,
  getChannelList,
  getBankList
})
