import {
  LOAD_BUS_LIST_RECEIVED,
  LOAD_BUS_LIST_REQUEST,
} from '../actions/ActionTypes';

import { MapStateType } from '../constants/types';

// Initialize centered on Greater Vancouver Area
const initialState: MapStateType = {
  busList: [],
  viewport: {
    height: 700,
    latitude: 49.246292,
    longitude: -123.116226,
    width: 1000,
    zoom: 11,
  }
};

/**
 * This reducer handles Map actions
 * @param {MapStateType} state
 * @param {any} action
 * @return {MapStateType}
 */
const Map = (state = initialState, action: any): MapStateType => {
  switch (action.type) {
    case LOAD_BUS_LIST_REQUEST:
      state = {
        ...state,
      };
      return state;
    case LOAD_BUS_LIST_RECEIVED:
      state = {
        ...state,
        busList: action.payload
      }
      break;
    default:
      break;
  }

  return state;
};

export default Map;
