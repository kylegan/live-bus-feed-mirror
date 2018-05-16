import { Dispatch as ReduxDispatch } from 'redux';

// Map Types
export interface IMapState {
  busList: BusType[];
  viewport: ViewportType;
}
export type MapStateType = IMapState;

export interface IMapProps {
    onViewportChangeHandler?: (payload: ViewportType) => void;
    loadBusListRequest?: () => void;
    busList?: BusType[];
    viewport?: ViewportType;
}
export type MapPropsType = IMapProps;

export interface IViewport {
  height: number;
  latitude: number;
  longitude: number;
  width: number;
  zoom: number;
}
export type ViewportType = IViewport;

export interface IBus {
  name: string|number;
  coordinates: [number, number];
}
export type BusType = IBus;

// Timer types
interface ITimerState {
  counter: number;
}
export type TimerStateType = ITimerState;

interface ITimerProps {
  counter?: number;
  decrement?: () => void;
}
export type TimerPropsType = ITimerProps;

// Redux
export interface IAction<T> {
  type: string;
  payload?: T;
}
export type ActionType<T> = IAction<T>;

interface IRootState {
  Map: MapStateType;
  Timer: TimerStateType;
}
export type RootStateType = IRootState;

export type DispatchType = ReduxDispatch<IRootState>;
