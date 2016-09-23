import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

import {promiseWeather, promiseAutocomplete} from './requests';

// function onFullfilled({data}) {
// 	console.log("DATA", data);
// 	document.body.insertAdjacentHTML("beforeend", "<pre>" + JSON.stringify(data, null, 2) + "</pre>");
// }
//
// function onRejected(err) {
// 	console.log("ERROR", err);
// }

// document.body.appendChild(component());
// promiseWeather().then(onFullfilled, onRejected);

ReactDOM.render(<App getWeather={promiseWeather} getSuggestions={promiseAutocomplete}/>, document.getElementById("app"));
