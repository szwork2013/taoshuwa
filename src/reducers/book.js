import * as types from '../constants/ActionTypes';
import {
  LOAN_BOOK_LIST,
  CHECK_BOOK,
  FETCH_ONE_BOOK,
  BOOK_LIST,
  ADD_BOOK,
  CHOOSE_CATEGORY,
  DELETE_BOOK
} from '../constants/ActionTypes.js'
import {createReducer} from 'redux-immutablejs'
import {fromJS, Map, List} from 'immutable'
import {omit, assign, mapValues} from 'lodash'

const initialState = fromJS({
  list: [], //首页书籍列表
  loanlist: [], //捐书列表
  onebook: {}, //根据ISBN返回的书籍详情
  curbook: {}, //查看书的详情
  categories: [
    {
      title: '信息技术',
      choosed: true
    }, {
      title: '信息技术',
      choosed: false
    }, {
      title: '信息技术',
      choosed: true
    }, {
      title: '信息技术',
      choosed: false
    }, {
      title: '信息技术',
      choosed: false
    }, {
      title: '信息技术',
      choosed: false
    }
  ]
});

export default createReducer(initialState, {
  [BOOK_LIST]: (state, {books}) => {
    const count = state.get('list').count();
    if (count === 0) {
      //直接替换
      return state.merge({list: books})
    } else {
      //在已有的数组之后追加数据,点击加载更多会出现问题
      return state.mergeDeep({
        list: state.get('list').push({list: books})
      })
    }

  },
  [LOAN_BOOK_LIST]: (state, {loanlist}) => {
    return state.merge({loanlist: loanlist})
  },
  [FETCH_ONE_BOOK]: (state, {curbook}) => {
    return state.merge({curbook: curbook})
  },
  [CHECK_BOOK]: (state, {book}) => {
    return state.merge({onebook: book})
  },
  [ADD_BOOK]: (state, {loanlist}) => {
    return state.merge({loanlist: loanlist})
  },
  [CHOOSE_CATEGORY]:(state,{index}) =>{
    return state.merge({
      categories:state.get('categories').updateIn([index,'choosed'], nowstate => !state.getIn(['categories',index,'choosed']))
    })
  },
  [DELETE_BOOK]: (state, {id}) => {
    return state.merge({
      list: state.get('list')
        .filter((item) => {
          return item.get('_id') != id;
        })
    })
  }
})
