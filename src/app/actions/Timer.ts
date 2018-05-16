import {
  DECREMENT_TIMER,
  SET_TIMER,
} from './ActionTypes';

import { ActionType, DispatchType } from '../constants/types'

/**
 * This function dispatches DECREMENT_TIMER
 * @returns {DispatchType}
 */
export function decrement(): DispatchType {
  return (dispatch: DispatchType): ActionType<any> => {
    return dispatch({
      payload: null,
      type: DECREMENT_TIMER
    });
  };
}

/**
 * This function dispatches SET_TIMER while passing through the payload
 * @param {number} payload
 * @returns {DispatchType}
 */
export function setTimer(payload: number): DispatchType {
  return (dispatch: DispatchType): ActionType<any> => {
    return dispatch({
      payload: {payload},
      type: SET_TIMER
    });
  }
}
