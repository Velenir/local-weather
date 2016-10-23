import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

import {promiseWeather, getWeatherAtLocation, promiseAutocomplete} from './requests';

ReactDOM.render(<App getWeather={promiseWeather} getWeatherAt={getWeatherAtLocation} getSuggestions={promiseAutocomplete}/>, document.getElementById("app"));
