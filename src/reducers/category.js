import {CHOOSE_CATEGORY,USER_CATEGORY} from '../constants/ActionTypes.js'
import {createReducer} from 'redux-immutablejs'
import {fromJS, Map, List} from 'immutable'

const initialState = fromJS({
  categories: []
});

export default createReducer(initialState, {
  [CHOOSE_CATEGORY]:(state,{index}) =>{
    return state.merge({
      categories:state.get('categories').updateIn([index,'choosed'], nowstate => !state.getIn(['categories',index,'choosed']))
    })
  },
  [USER_CATEGORY]:(state,action) => {
    return state.merge({categories: action.categories})
  }
})
