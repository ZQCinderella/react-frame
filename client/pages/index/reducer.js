/* eslint-disable no-alert */
import { Map, List, fromJS } from 'immutable';

const initialState = fromJS({
  loading: false,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case 'bindCardResult':
      return state.set('bindCardResult', Map(action.data));
    case 'smsStore':
      return state.set('smsStore', Map(action.data));
    default:
      return state;
  }
};
