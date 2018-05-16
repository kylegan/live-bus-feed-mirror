import {applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import Map from './reducers/Map';
import Timer from './reducers/Timer';

const store = createStore(
  combineReducers({Map, Timer}),
  applyMiddleware(thunk)
);

export default store;
