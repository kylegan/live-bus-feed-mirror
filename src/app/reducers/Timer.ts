import {
  DECREMENT_TIMER,
  SET_TIMER,
} from '../actions/ActionTypes';

import { TimerStateType } from '../constants/types';

// Initialize counter to 0 so it will trigger a componentWillReceiveProps() lifecycle if timer is set to anything other than 0
const initialState: TimerStateType = {
  counter: 0,
};

/**
 * This reducer handles Timer actions
 * @param {TimerStateType} state
 * @param {any} action
 * @return {TimerStateType}
 */
const Timer = (state = initialState, action: any): TimerStateType => {
  switch (action.type) {
    case SET_TIMER:
      state = {
        ...state,
        counter: action.payload,
      }
      break;
    case DECREMENT_TIMER:
      let newCounter = state.counter -1;
      if (newCounter < 0) {
        newCounter = 0;
      }
      state = {
        ...state,
        counter: newCounter,
      };
      break;
    default:
      break;
  }
  return state;
};

export default Timer;
