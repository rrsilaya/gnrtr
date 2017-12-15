import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { middleware as reduxpack } from 'redux-pack';

import reducers from '../features';

const store = createStore(
  reducers,
  {},
  applyMiddleware(thunk, logger, reduxpack)
);

export default store;