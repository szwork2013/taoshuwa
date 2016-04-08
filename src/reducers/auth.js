import * as types from '../constants/ActionTypes';
const initialState = {
  user: {}
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case 'GET_USERINFO_SUCCESS':
      const user = action.user;
      console.log('user---------:',user);
      return {
        user: user
      }
    default:
      return state;
  }
}
