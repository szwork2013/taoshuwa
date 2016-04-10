import { createStore,compose,applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from '../api/promiseMiddleware'
import rootReducer from '../reducers';

let middleware = [thunkMiddleware,promiseMiddleware];
middleware = applyMiddleware(...middleware);
const enhancer = compose( middleware );
export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
