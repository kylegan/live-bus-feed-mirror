import * as React from 'react';
import { connect } from 'react-redux';

import { decrement } from '../actions/Timer';
import { DispatchType, RootStateType, TimerPropsType, TimerStateType } from '../constants/types';

import 'app/css/Timer.css';

/**
 * A Stateful Component for the countdown Timer
 * @param {TimerPropsType}
 * @param {TimerStateType}
 */
class Timer extends React.Component<TimerPropsType, TimerStateType> {

  /**
   * Whenever the component receives props (ie: the timer value changes)
   * This function will set a timeout for the next call to decrease the counter
   * This essentially creates an endless loop of updates until 0
   * Once the counter reaches 0, a SET_TIMER action must be called to reset the cycle
   * @param {any} nextProps
   */
  public componentWillReceiveProps(nextProps: any) {
    if (nextProps.counter !== this.props.counter && nextProps.counter !== 0) {
      setTimeout(() => {
        this._decrement()
      }, 1000);
    }
  }

  /**
   * This function renders the Timer
   * @return {JSX.Element}
   */
  public render() {
    return (
       <div className="timer">
         {this.props.counter} seconds until next update
       </div>
    );
  }

  /**
   * This funcion calls the decrement dispatcher if it is available
   */
  private _decrement(): void {
    if (typeof this.props.decrement !== 'undefined') {
      this.props.decrement();
    }
  }
}

/**
 * This funcion maps state variables to the component's props
 * @param {RootStateType} state
 * @return {TimerStateType}
 */
const mapStateToProps = (state: RootStateType): TimerStateType => {
  return {
    counter: state.Timer.counter,
  };
};

/**
 * This funcion maps dispatch actions to the component's props
 * @param {DispatchType} dispatch
 * @return {any}
 */
const mapDispatchToProps = (dispatch: DispatchType): any => {
  return {
    decrement: (): any => dispatch(decrement()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
