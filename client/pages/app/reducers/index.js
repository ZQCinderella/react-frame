import {Map, List, fromJS} from 'immutable';

const initialState = fromJS({
  loading: false
});

export default (state = initialState, action) => {

  if (action.type === 'app_loading') {
    return state.set('loading', action.status);
  }
  return state;
};
