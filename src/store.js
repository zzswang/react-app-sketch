import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { apiMiddleware } from 'redux-api-middleware';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers';
import wrapperHeader from './middlewares/wrapperHeader';
import apiError from './middlewares/apiError';


export default function configureStore(initialState) {
  const logger = createLogger();
  const store = applyMiddleware(thunk, wrapperHeader, apiMiddleware, apiError, logger)(createStore)(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      /* eslint-disable global-require */
      const nextRootReducer = require('./reducers/index').default;
      /* eslint-enable global-require */

      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
