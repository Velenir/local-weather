import React from 'react';

import Conditions from './Conditions';
import Location from './Location';

export default class App extends React.Component {
	constructor(props) {
		super(props);

		// this.state = {
		// 	current_observation: {}
		// };
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

	render() {
		console.log("STATE:", this.state);
		if (!this.state || !this.state.current_observation) {
			return <div>Loading...</div>;
		}

		return (
			<div>
				App component
				<Location {...this.state.current_observation} />
				<Conditions {...this.state.current_observation} />
			</div>
		);
	}
}
