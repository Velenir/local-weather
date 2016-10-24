import React from 'react';

import Conditions from './Conditions';
import Location from './Location';
import Forecast from './Forecast';
import Search from './Search';


export default class App extends React.Component {
	componentDidMount() {
		this.props.getWeather().then(this.onFullfilled, this.onRejected);
	}

	onFullfilled = ({data}) => {
		// console.log("DATA", data);

		const pre = document.getElementById("autodata");
		if(pre) {
			pre.innerHTML = JSON.stringify(data, null, 2);
		} else {
			document.body.insertAdjacentHTML("beforeend", "<pre id='autodata'>" + JSON.stringify(data, null, 2) + "</pre>");
		}

		this.setState(data);
	}

	onRejected = (err) => {
		console.log("ERROR", err);
	}

	getWeatherAt = (location) => {
		this.props.getWeatherAt(location).then(this.onFullfilled, this.onRejected);
	}

	render() {
		// console.log("STATE:", this.state);
		if (!this.state || !this.state.current_observation) {
			return <div>Loading...</div>;
		}

		const {current_observation, current_observation: {display_location}, forecast} = this.state;

		return (
			<div>
				<Location {...current_observation} >
					<Search getSuggestions={this.props.getSuggestions} getWeatherAtCurrentLocation={this.props.getWeather} getWeatherAt={this.getWeatherAt} initialLocation={display_location.full}/>
				</Location>
				<Conditions {...current_observation} />
				<Forecast days={forecast.simpleforecast.forecastday} />
			</div>
		);
	}
}
