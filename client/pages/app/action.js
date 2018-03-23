/**
 * 修改loading状态
 * @param status
 * @returns {function()}
 */
const loading = (status) => {
  return (dispatch) => {
    return Promise.resolve(dispatch({
      type: 'app_loading',
      status
    }));
  }
}


export default {
  loading
}
