// utils 函数
import isNil from 'lodash/isNil';
import get from 'lodash/get';
import head from 'lodash/head';

/**
 * 获得地址栏传递参数
 * @returns {null}
 */
export const getLocationParams = () => {
  let { search } = location;
  if (search.length > 1) {
    const params = {};
    search = search.substring(1);
    search.split('&').forEach((item) => {
      const tempParam = item.split('=');
      params[tempParam[0]] = tempParam.slice(1) === '' ? null : decodeURIComponent(tempParam.slice(1).join('='));
    });
    return params;
  }
  return null;
};

export const generateQueryByObj = (obj) => {
  const queryArr = [];
  Object.keys(obj).forEach(item => {
    queryArr.push(`${item}=${obj[item]}`)
  })
  return queryArr.join('&');
}

/**
 * 返回 location.origin, 例如： http://www.example.com:9090
 * @returns {string}
 */
export const getLocationOrigin = () => {
  if (location.origin) {
    return location.origin;
  }
  return `${location.protocol}//${location.host}`;
};

/**
 * 返回根路径，例如 http://www.example.com:9090/context/
 * @returns {*}
 */
export const getLocationRoot = () => {
  const { pathname, origin } = location;
  const [root] = pathname.match(/\/[\w\d-]+\//);
  return origin + root;
};

/**
 * 返回上下文路径，例如 /context/
 * @returns {*}
 */
export const getLocationContext = () => {
  return location.pathname.match(/\/[\w\d-]+\//)[0];
};

// 格式化 json 数据
export const parseJSON = (str) => {
  if (!str) {
    return null;
  }
  let json = null;
  try {
    json = JSON.parse(str);
  } catch (e) {
    json = null;
    console.warn(`JSON 格式不正确：${e.message}`);
  }
  return json;
};

// 把 json 数据转换为字符串
export const stringifyJSON = (json) => {
  let str = null;
  try {
    str = JSON.stringify(json);
  } catch (e) {
    str = null;
    console.warn(`JSON 格式不正确：${e.message}`);
  }
  return str;
};

/**
 * 时间格式转换 time ms
 * @param time
 * @param showMs 是否显示毫秒
 * @param showYear 是否显示年
 * @returns {*}
 */
/*eslint-disable prefer-template*/
export const formatDate = ({ time, showMs = false, showYear = false, showTms = true }) => {
  if (!time) {
    return '';
  }
  let date = new Date(Number(time));
  // 在 ios 下需要显式的转换为字符串
  if (date.toString() === 'Invalid Date') {
    date = this.createDate(time);
    if (date.toString() === 'Invalid Date') {
      return '';
    }
  }
  const H = date.getHours() <= 9 ? '0' + date.getHours() : date.getHours();
  const M = date.getMinutes() <= 9 ? '0' + date.getMinutes() : date.getMinutes();
  const S = date.getSeconds() <= 9 ? '0' + date.getSeconds() : date.getSeconds();

  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month <= 9 ? '0' + month : month;

  let day = date.getDate();
  day = day <= 9 ? '0' + day : day;

  if (showTms) {
    let MS = date.getMilliseconds();
    if (MS <= 9) {
      MS = '00' + MS;
    } else if (MS <= 99) {
      MS = '0' + MS;
    }
    const hms = showMs ? ` ${H}:${M}:${S}.${MS}` : ` ${H}:${M}:${S}`;
    return (showYear ? year + '-' : '') + month + '-' + day + hms;
  }
  return (showYear ? year + '-' : '') + month + '-' + day;
};

/**
 * 标准创建时间格式 new Date(y, m, d, h, M, s, ms)
 * 如果对于时间格式比较复杂的情况，可参考 Moment 库 http://momentjs.com/
 *
 * @param input 支持 yyyy-MM-dd HH:mm:ss.SSS 或 yyyy-MM-dd HH:mm:ss:SSS 或 yyyy/MM/dd HH:mm:ss.SSS
 * 2016-06-02 13:01:50.333  2016-06-02 13:01:50:333 2016/06/02 13:01:50:333
 * 标准写法为 2016-06-02T05:01:50.333Z
 * @returns {Date}
 */
export const createDate = (input) => {
  //android可能不支持 new Date('2012-12-12 12:12:12')这种用法
  if (!input || typeof input !== 'string') {
    return null;
  }
  let y = 0, m = 0, d = 0, h = 0, M = 0, s = 0, ms = 0;
  const inputs = input.replace(/\//g, '-').split(' ');
  if (inputs.length > 0) {
    const ymd = inputs[0].split('-');
    y = Number(ymd[0]);
    m = Number(ymd[1]) - 1;
    d = Number(ymd[2]);
  }
  if (inputs.length === 2) {
    const hms = inputs[1].split(':');
    h = Number(hms[0]);
    M = Number(hms[1]);
    //格式 2016-06-02 13:01:50.333
    const sms = hms[2].split('.');
    if (sms.length === 2) {
      s = Number(sms[0]);
      ms = Number(sms[1]);
    } else {
      s = Number(hms[2]);
    }
    // 格式 2016-06-02 13:01:50:333
    if (hms[3]) {
      ms = hms[3];
    }
  }
  return new Date(y, m, d, h, M, s, ms);
};

/**
 * 判断样式在浏览器中是否支持
 * @param styleProp
 * @returns {boolean}
 */
export const styleSupport = (styleProp) => {
  const prefix = ['webkit', 'moz', 'ms', 'o'];
  const $el = document.createElement('div');
  const styleText = $el.style;
  if (styleText[styleProp] !== undefined) {
    return true;
  }

  for (let i = 0; i < prefix.length; i++) {
    const _styleProp = prefix[i] + styleProp[0].toUpperCase() + styleProp.substring(1);
    if (styleText[_styleProp] !== undefined) {
      return true;
    }
  }
  return false;
};

//小数转换为百分比数
export const toPercent = (num) => {
  num = Number(num);
  if (isNaN(num)) {
    return '%';
  }
  return (num * 100).toFixed(2) + '%';
};

/**
 * 把金额转换为千分位表示
 * @param num 数值
 * @param hundredThousand 是否格式为万元
 * @param fixed 小数点保留位数
 * @returns {*}
 */
export const thousands = (num, fixed = 2, hundredThousand) => {
  num = Number(num);
  if (isNaN(num) || !isFinite(num)) { //如果 NaN或者不是Finite 返回 ''
    return '';
  }
  if (typeof fixed === 'boolean') {
    hundredThousand = fixed;
    fixed = 2;
  }
  //如果单位是万元，则除以 10000
  if (hundredThousand) {
    num /= 10000;
  }

  const n = num.toFixed(fixed || 2);
  const re = /(\d{1,3})(?=(\d{3})+(?:\.))/g;

  if (fixed === 0) {
    const a = n.replace(re, '$1,').split('.');
    return a[0];
  }
  return n.replace(re, '$1,');
};


/**
 * 字符串或数字比较比较
 * 返回-1 正序，返回 1 倒序，a 小于 b 是正序
 * @param a
 * @param b
 * @param comparer 比较器，首先处理值
 * @returns {number}
 */
export const compare = (a, b, comparer) => {
  if (a === b) {
    return 0;
  }
  if (comparer && typeof comparer === 'function') {
    a = comparer(a);
    b = comparer(b);
  }
  const aType = typeof a;
  const bType = typeof b;
  if (aType === 'number' && bType === 'number') {
    return a - b;
  }
  if (aType === 'string' && bType === 'string') {
    const arr1 = [a, b];
    const arr2 = [a, b].sort();
    return arr1[0] === arr2[0] ? -1 : 1
  }
  if (aType === 'number') { //如果 a 是数字，则返回 -1
    return -1;
  }
  return 1;
};

/**
 * 将银行卡显示为 2222 2222 2222 2222形式
 * @param arg input框中的值
 */
export const getStandardCardNo = (arg) => {
  const value = arg.trim();
  if (/[a-z]+/g.test(arg)) return false;
  if (value.length < 4) return { neatValue: value, unifiedValue: value };
  //去空格, 用来查询和存储的值
  const neatValue = value.replace(/\s+/g, '');
  //加空格, 用来显示
  const unifiedValue = neatValue.replace(/(\d{4}\B)/g, '$1 ');
  return {
    neatValue,   //222222222222
    unifiedValue                          //2222 2222 2222
  }
}

/**
 * 将手机号显示为 xxx xxxx xxxx
 * @param phone 输入的手机号
 */
export const getStandardPhone = (phone, splitChar = ' ') => {
  const neatValue = phone.replace(/\s+/g, '');
  if (/[\w-]+/g.test(phone)) {
    throw new Error('手机号包含非数字字符');
  }
  if (phone.length > 3) {
    const splitValue = neatValue.replace(/^(\d{3}\B)(\d{4}\B)+/g, `$1${splitChar}$2${splitChar}`);
    return {
      neatValue,
      splitValue
    }
  }
  return {
    neatValue,
    splitValue: neatValue
  }
}

/**
 * 得到一串数字或者字母的后四位
 * @param args 
 */
export const getLastFourNum = (args) => {
  return args.replace(/\s+/g, '').match(/([0-9a-zA-Z]{4})$/)[0]
}

/**
 * cardNo为银行卡号，  返回结果 633333********2232
 * 不考虑参数不合法的情况
 */
export const getStarCardNo = (cardNo) => {
  const splitArr = (cardNo + '').match(/(\d{6})(\d+)(\d{4})/);  //match如果加了g 全局匹配只有一个结果即匹配到的内容，但是非全局会携带 $1....$n
  const result = splitArr[2].replace(/(\d)/g, '*');
  return splitArr[1] + result + splitArr[3];
}
/**
 * 得到隐藏后的银行卡号 **** **** **** 2133
 * @param {*} cardNo 
 */
export const getProtectCardNo = (cardNo) => {
  return cardNo.replace(/\s+/g, '').replace(/(\d+)(?=\d{4}\b)/g, (item, $1) => {
    return $1.replace(/(\d{4})+(?=\d{1,4}\b)/g, m => {
      return m.replace(/(\d{4})/g, '$1 ')
    }).replace(/\d/g, '*') + ' ';
  });
}
/**
 * 隐藏身份证号 120126**********1234
 */
export const getProtectCertdNo = (certNo) => {
  //不对身份证号再做校验
  const splitArr = certNo.match(/(\d{6})(\d+)(\d{3}[0-9a-zA-Z])/);  //match如果加了g 全局匹配只有一个结果即匹配到的内容，但是非全局会携带 $1....$n
  const result = splitArr[2].replace(/(\d)/g, '*');
  return splitArr[1] + result + splitArr[3];
}
/**
 * 隐藏手机号
 */
export const getProtectPhone = (mobile) => {
  const splitArr = mobile.match(/(\d{3})(\d+)(\d{4})/);
  const result = splitArr[2].replace(/(\d)/g, '*');
  return splitArr[1] + result + splitArr[3];
}
/**
 * 隐藏姓名  张三 ->  *三
 */
export const getProtectName = (name) => {
  name = name.split('');
  return (name.map((item, index) => {
    if (index === 0) {
      item = '*';
    }
    return item;
  })).join('');
}
export const isMobile = () => {
  const ua = navigator.userAgent;
  if (ua.indexOf('Mobile') !== -1) {
    return true;
  } else if (/Android|iPhone|Windows Phone|Nexus|MiuiBrowser/.test(ua)) {
    return true;
  }
  return false;
}
const getOS = () => {
  let result = '';
  const ua = navigator.userAgent;
  if (/windows\s+nt\s+([\d.]+)/i.test(ua)) {
    if (parseFloat(RegExp.$1) < 6) {
      result = 'xp';
    }
  } else if (/macintosh|darwin/i.test(ua)) {
    result = 'mac';
  }
  return result;
}
export const isWx = () => {
  return (/micromessenger/).test(navigator.userAgent);
}
export const getPosition = (event) => {
  if (!isNil(get(event, 'touches'))) {
    const { pageX, pageY } = head(event.touches);
    return {
      x: pageX,
      y: pageY,
    };
  }
}
export default {
  getLocationParams,
  getLocationOrigin,
  getLocationRoot,
  getLocationContext,
  parseJSON,
  stringifyJSON,
  formatDate,
  createDate,
  styleSupport,
  thousands,
  toPercent,
  compare,
  generateQueryByObj,
  getStandardCardNo,
  getStarCardNo,
  getProtectCardNo,
  getProtectCertdNo,
  getProtectName,
  getProtectPhone,
  isMobile,
  getOS,
  isWx,
  getPosition
};

