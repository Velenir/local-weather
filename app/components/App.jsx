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
		this.setState(data);
		return data;
	}

	onRejected = (err) => {
		console.log("ERROR", err);
	}

	getWeatherAt = (location) => {
		return this.props.getWeatherAt(location).then(this.onFullfilled, this.onRejected);
	}

	render() {
		if(!this.state || !this.state.current_observation) {
			return <div className="loading spinner">Loading</div>;
		}

		const {response, current_observation, current_observation: {display_location}, forecast} = this.state;

		return (
			<div>
				<Location {...current_observation} response={response} >
					<Search getSuggestions={this.props.getSuggestions} getWeatherAtCurrentLocation={this.props.getWeather} getWeatherAt={this.getWeatherAt} initialLocation={display_location.full}/>
				</Location>
				<Conditions {...current_observation} />
				<Forecast days={forecast.simpleforecast.forecastday} />
			</div>
		);
	}
}
