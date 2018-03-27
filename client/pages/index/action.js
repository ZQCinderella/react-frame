/* eslint-disable no-alert */
import callApi from '../../utils/callApi';
import AppApi from '../../utils/appApi';
import { browserHistory } from 'react-router';

const routerOuter = (url) => {
  browserHistory.push(url);
}
/**
 * @param {*} dispatch 
 * @param {*} requestUrl 
 * @param {*} data 
 * @param {*} type 
 * @param {*} module 
 */
const commonCallApi =  (dispatch, requestUrl, data, type) => {
  return callApi.post(requestUrl, data).then(res => {
    if (res && (res.code === 1 || res.code === '0000')) {
      if (type) {
        return Promise.resolve(dispatch({
          type,
          data: res
        }))
      }
      return Promise.resolve(res)
    }
    return Promise.reject(res)
  });
};

const handleParams = (commonParams, data, isApp) => {
  const ct = String(new Date().getTime());
  return isApp ? Object.assign({ct}, commonParams, {busParams: data}) : Object.assign({ct}, commonParams, data);
}
/**
 * 公共action
 * @param requestUrl
 * @param data
 * @param isApp 是否是调用的app
 * @param type  设置action的type
 * @returns {function(*)}
 */
const commonAction = (requestUrl, data = {}, isApp, type) => {
  requestUrl = isApp ? `/app${requestUrl}` : `${requestUrl}`;
  return (dispatch) => {
    /*return AppApi.getCommonParams().then(commonParams => {
      data = handleParams(commonParams, data, isApp);
      return commonCallApi(dispatch, requestUrl, data, type);
    }, (err) => {
      console.log(err);
    })*/
    return commonCallApi(dispatch, requestUrl, data, type);
  }
};
const bindCard = (data = {}) => {
  return commonAction('后台提供的url', data, false, 'bindCardResult');
}
/**
 * 使用store缓存一些数据
 * @param {*} smsData 
 */
const sendSmsStore = (smsData) => {
  return (dispatch) => {
    return Promise.resolve(dispatch({
      type: 'sendSmsStore',
      data: smsData
    }));
  }
} 
export default {
  bindCard,
  sendSmsStore
}
