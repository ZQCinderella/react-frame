import 'isomorphic-fetch';
import 'fetch-ie8';
import {context, moduleName} from '../../Config';
import perfect from './perfect';
// 定义 fetch 默认选项， 看 https://github.com/github/fetch
const defaultOptions = {
  credentials: 'include', //设置该属性可以把 cookie 信息传到后台
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
  }
};

// 检查请求是否成功
function checkStatus(response) {
  const {status} = response;
  if (status >= 200 && status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.errorCode = status;
  throw error;
}

/**
 * 封装 fetch
 * 根据业务需求，还可以在出错的地方处理相应的功能
 * @param url
 * @param body //往后台传递的 json 参数
 * @param method // 请求 type  get post delete header put
 * @param options // 可选参数项
 * @returns {Promise.<TResult>}
 */
function post(url, body = {}, method = 'post', options = {}) {
  if (!url) {
    const error = new Error('请传入 url');
    error.errorCode = 0;
    return Promise.reject(error);
  }

  const fullUrl = '/query';
  const _options = {method: 'post', ...defaultOptions, ...options};
  Object.keys(body).forEach((item) => {
    if (body[item] === null || body[item] === '') {
      delete body[item];
    }
  });
  const obj = {
    module: moduleName,
    path: url,
    filter: body
  }
  _options.body = perfect.stringifyJSON(obj);

  return fetch(fullUrl, _options)
    .then(checkStatus)
    .then(response =>
      response.json().then(json => ({json, response}))
    ).then(({json, response}) => {
      //错误代码需根据项目实际情况进行定义
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    }).catch((error) => {
      console.error('请求错误');
      return Promise.reject(error);
    });
}

function postForFile(url = '', body = {} ) {
  const form = document.createElement('form');
  const iframe = document.createElement('iframe');
  const iframeName = 'pageHolder';
  const fullUrl = '/file';
  form.method = 'post';
  form.action = fullUrl;
  
  //form提交后会自动跳转打开新页面，但是页面的闪现体验不好，所以把form提交到一个隐藏的iframe中，浏览器中不会看到这这个行为，但是正常下载
  form.target = iframeName;
  iframe.name = iframeName;
  iframe.style.display = 'none';
  form.style.display = 'none';
  body.path = url;
  body.module = moduleName;
  for ( const i in body) {
    if (i) {
      if (body[i] !== '' && body[i] !== null) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = i;
        input.value = body[i];
        form.appendChild(input)
      }
    }
  }
  document.body.appendChild(form);
  document.body.appendChild(iframe);
  form.submit();
  setTimeout(() => {
    document.body.removeChild(form);
    document.body.removeChild(iframe)
  }, 1000)
}

const callApi = {
  post,
  postForFile
}

export default callApi;
