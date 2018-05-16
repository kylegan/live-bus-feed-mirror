import * as dotenv from 'dotenv';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Map from './app/containers/Map';

import store from './app/store';
import registerServiceWorker from './registerServiceWorker';

import 'app/css/App.css';

// Load environment variables
dotenv.config()

ReactDOM.render(
  <Provider store={store}>
    <Map />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
