import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistState } from 'redux-devtools';
import rootReducer from '../reducers';
import promiseMiddleware from '../api/promiseMiddleware'
import DevTools from '../containers/DevTools';

//const middleware = applyMiddleware(thunkMiddleware)
let middleware = [thunkMiddleware,promiseMiddleware];
middleware = applyMiddleware(...middleware);
const enhancer = compose(
  middleware,
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&#]+)\b/
    )
  )
);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    );
  }

  return store;
}
