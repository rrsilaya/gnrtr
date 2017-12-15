import { combineReducers } from 'redux';

import feature1 from './feature1/duck';

const rootReducer = combineReducers({
  // place all reducers here
  feature1,
});

export default rootReducer;