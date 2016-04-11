import { createStore,compose,applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware, push } from 'react-router-redux'
import { browserHistory } from 'react-router'
import promiseMiddleware from '../api/promiseMiddleware'
import rootReducer from '../reducers';

let middleware = [thunkMiddleware,promiseMiddleware,routerMiddleware(browserHistory)];
middleware = applyMiddleware(...middleware);
const enhancer = compose( middleware );
export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
