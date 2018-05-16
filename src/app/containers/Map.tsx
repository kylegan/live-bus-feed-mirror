import * as React from 'react';
import * as ReactMapGL from 'react-map-gl';
import { connect } from 'react-redux';

import { loadBusListReceived, loadBusListRequest } from '../actions/Map';
import { MAPBOX_TOKEN } from '../constants/Map';
import { COUNTER_INTERVAL } from '../constants/Timer';
import { BusType, DispatchType, MapPropsType, MapStateType, RootStateType, ViewportType } from '../constants/types';
import Timer from './Timer';

import 'app/css/Map.css';
import 'mapbox-gl/dist/mapbox-gl.css';

/**
 * A Stateful Component for the Map and Bus markers
 * @param {MapPropsType}
 * @param {MapStateType}
 */
class Map extends React.Component<MapPropsType, MapStateType> {
  private token: string = String(MAPBOX_TOKEN);

  /**
   * Set initial viewport
   * Make initial call to load the list of active busses
   */
  public componentWillMount(): void {
    const viewport = {
      height: 700,
      latitude: 49.246292,
      longitude: -123.116226,
      width: 1000,
      zoom: 11,
    }

    this.setState({viewport});
    this._loadBuslist();
  }

  /**
   * Whenever the component receives props (ie: gets a list of busses)
   * This function will set a timeout for the next call to refresh the bus busList
   * This essentially creates an endless loop of updates
   * @param {MapPropsType} nextProps
   */
  public componentWillReceiveProps(nextProps: MapPropsType) {
    setTimeout(() => {
      this._loadBuslist()
    }, COUNTER_INTERVAL*1000);
  }

  /**
   * Render the Map
   * @return {JSX.Element}
   */
  public render(): JSX.Element {

    // Render the bus markers if the bus list is not empty
    let busListJSX;
    if (typeof this.props.busList !== "undefined") {
      busListJSX = this.props.busList.map(this._renderMarker);
    }

    return (
      <div className="mapview">
        <Timer />
        <ReactMapGL.InteractiveMap
          {...this.state.viewport}
          onViewportChange={this.onViewportChangeHandler}
          mapboxApiAccessToken={this.token}
          mapStyle='mapbox://styles/blakegan/cjg456s8400122sszofmwlpcn'>
          {busListJSX}
        </ReactMapGL.InteractiveMap>
      </div>
    );
  }

  // Map viewport change handler
  private onViewportChangeHandler = (viewport: ViewportType) => {
    this.setState({viewport});
  }

  /**
   * This funcion creates JSX for bus markers
   * @param {any} point
   * @param {any} i
   * @return {JSX.Element}
   */
  private _renderMarker(point: any, i: any): JSX.Element {
    const {name, coordinates} = point;
    return (
      <ReactMapGL.Marker key={i} longitude={coordinates[0]} latitude={coordinates[1]} >
        <div className="bus"><span>{name}</span></div>
      </ReactMapGL.Marker>
    );
  }

  /**
   * This funcion calls loadBusListRequest if it is available
   * @param {any} point
   * @param {any} i
   * @return {JSX}
   */
  private _loadBuslist() {
    if (typeof this.props.loadBusListRequest !== 'undefined') {
      this.props.loadBusListRequest();
    }
  }
}

/**
 * This funcion maps state variables to the component's props
 * @param {RootStateType} state
 * @return {MapStateType}
 */
const mapStateToProps = (state: RootStateType): MapStateType => {
  return {
    busList: state.Map.busList,
    viewport: state.Map.viewport,
  };
};

/**
 * This funcion maps dispatch actions to the component's props
 * @param {DispatchType} dispatch
 * @return {any}
 */
const mapDispatchToProps = (dispatch: DispatchType): any => {
  return {
    loadBusListReceived: (payload: BusType[]): any => dispatch(loadBusListReceived(payload)),
    loadBusListRequest: (): any => dispatch(loadBusListRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
