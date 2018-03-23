import callApi from '../../utils/callApi';
import tool from '../../utils/commonFunc';
import { message } from 'antd'
import React, { Component, } from 'react'

const urlTypeMap = {
  queryPayPlatform: 'PAY_PLATFORM',  //支付平台
  querySignPlatform: 'SIGN_PLATFORM',
  queryDeductPlatform: 'DEDUCT_PLATFORM',
  queryQuickPay: 'QUICK_PAY',
  queryPayList: 'PAY_LIST',
  queryPayDetail: 'PAY_DETAIL',
  queryPOS: 'POS_PAY',
  updateSign: 'UPDATE_SIGN',
  updateDeduct: 'UPDATE_DEDUCT',
  updateQuick: 'UPDATE_QUICK',
  updatePOS: 'UPDATE_POS',
  export4EReport: 'EXPORT_4E_REPORT',
  exportDKReport: 'EXPORT_DK_REPORT',
  exportQPReport: 'EXPORT_DK_REPORT',
  exportPayListReport: 'EXPORT_PAY_LIST',
  exportPayDetail: 'EXPORT_PAY_DETAIL',
  exportPOS: 'EXPORT_POS',

  //通道
  queryChannel: 'CHANNEL_LIST',
  addChannel: 'CHANNEL_ADD',
  deleteChannel: 'CHANNEL_DELETE',

  //银行
  queryBank: 'BANK_LIST',
  addBank: 'BANK_ADD',
  updateBank: 'BANK_UPDATE',
  deleteBank: 'BANK_DELETE'
}

const urlTransferMap = {
  queryPayPlatform: 'web/pay/payPlatform', // 支付平台
  querySignPlatform: 'dkapi/page4e',
  queryDeductPlatform: 'dkapi/pagewithhold',
  queryQuickPay: 'qpapi/pageqp',
  queryPayList: 'odapi/pageod',
  queryPayDetail: '/channelapi/pagechannel',
  queryPOS: '/posapi/pagepos',
  updateSign: 'dkapi/update4e',
  updateDeduct: 'dkapi/updatewithhold',
  updateQuick: 'qpapi/updateqp',
  updatePOS: '/posapi/updatepos',
  export4EReport: 'dkapi/export4e',
  exportDKReport: 'dkapi/exportwithhold',
  exportQPReport: 'qpapi/exportqp',
  exportPayListReport: '/odapi/exportod',
  exportPayDetailReport: '/channelapi/exportchannel',
  exportPOS: '/posapi/exportpos',

  //通道列表
  queryChannel: 'CHANNEL_LIST',
  addChannel: 'cHANNEL_ADD',
  deleteChannel: 'CHANNEL_DELETE',

  //银行
  queryBank: 'BANK_LIST',
  addBank: 'BANK_ADD',
  updateBank: 'BANK_UPDATE',
  deleteBank: 'BANK_DELETE'
}

const getDataByUrl = (formData) => {  //
  return (dispatch) => {
    const { URL } = formData;
    delete formData.URL;
    return callApi.post(urlTransferMap[URL], formData)
      .then(data => {
        if (data.code === '0000') {
          return Promise.resolve(dispatch(queryCb(data.data, urlTypeMap[URL])));
        }
        return Promise.reject(data);
      })
  }
}

const exportReportFun = (formData) => {
  return (dispatch) => {
    const { URL } = formData;
    delete formData.URL;
    console.log(urlTransferMap[URL]);
    return callApi.postForFile(urlTransferMap[URL], formData)
  }
}
const queryCb = (data, type) => {
  return {
    type,
    data
  }
}

export default {
  getDataByUrl,
  exportReportFun
}

