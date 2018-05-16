import {
  LOAD_BUS_LIST_RECEIVED,
  LOAD_BUS_LIST_REQUEST,
  SET_TIMER,
} from './ActionTypes';

import { BUS_LIST_END_POINT } from '../constants/Map';
import { COUNTER_INTERVAL } from '../constants/Timer';

import * as superagent from 'superagent';
import { ActionType, BusType, DispatchType } from '../constants/types'

/**
 * On call, this function begins to fetch bus data and dispatches LOAD_BUS_LIST_REQUEST
 * On receiving data, this function dispatches LOAD_BUS_LIST_RECEIVED and SET_TIMER
 * @returns {DispatchType}
 */
export function loadBusListRequest(): DispatchType {
  return (dispatch: DispatchType): ActionType<any> => {
    superagent
    .get(BUS_LIST_END_POINT)
    .then((res: superagent.Response): void => {
      dispatch({
          payload: res.body,
          type: LOAD_BUS_LIST_RECEIVED,
        });

      dispatch({
          payload: COUNTER_INTERVAL,
          type: SET_TIMER,
        });
      });

    return dispatch({
     payload: null,
     type: LOAD_BUS_LIST_REQUEST,
    });
  }
}

/**
 * This function dispatches LOAD_BUS_LIST_RECEIVED while passing through the payload
 * @param {BusType[]} payload
 * @returns {DispatchType}
 */
export function loadBusListReceived(payload: BusType[]): DispatchType {
  return (dispatch: DispatchType): ActionType<any> => {
    return dispatch({
      payload: {payload},
      type: LOAD_BUS_LIST_RECEIVED
    });
  };
}
