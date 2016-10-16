import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

import {promiseWeather, promiseAutocomplete} from './requests';

ReactDOM.render(<App getWeather={promiseWeather} getSuggestions={promiseAutocomplete}/>, document.getElementById("app"));
