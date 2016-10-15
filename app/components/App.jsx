import React from 'react';

import Conditions from './Conditions';
import Location from './Location';
import Forecast from './Forecast';

import {DEGREES} from '../helpers';

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tempDenom: DEGREES.CELSIUS
		};
	}
	componentDidMount() {
		this.props.getWeather().then(this.onFullfilled, this.onRejected);
	}

	onFullfilled = ({data}) => {
		console.log("DATA", data);
		document.body.insertAdjacentHTML("beforeend", "<pre>" + JSON.stringify(data, null, 2) + "</pre>");
		this.setState(data);
	}

	onRejected = (err) => {
		console.log("ERROR", err);
	}

	switchDenom = () => {
		console.log("switchin degrees");
		this.setState(this.state.tempDenom === DEGREES.CELSIUS ?
			{temp: this.props.temp_f, tempDenom: DEGREES.FAHRENHEIT} :
			{temp: this.props.temp_c, tempDenom: DEGREES.CELSIUS});
	}

	render() {
		console.log("STATE:", this.state);
		if (!this.state || !this.state.current_observation) {
			return <div>Loading...</div>;
		}

		return (
			<div>
				App component
				<Location {...this.state.current_observation} />
				<Conditions {...this.state.current_observation} denom={this.state.tempDenom} switchDenom={this.switchDenom} />
				<Forecast days={this.state.forecast.simpleforecast.forecastday} denom={this.state.tempDenom} />
			</div>
		);
	}
}
