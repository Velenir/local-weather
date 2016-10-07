import React from 'react';

import {bemify} from '../helpers/bemify';

const DEGREES = {CELSIUS: "°C", FAHRENHEIT: "°F"};

const TempDisplay = ({temp, denom, switchDenom}) => <a href="#!" className="reading" onClick={switchDenom}>{temp + denom}</a>;


export default class Temperature extends React.Component {
	constructor(props) {
		super(props);

		this.state ={
			temp: props.temp_c,
			denom: DEGREES.CELSIUS
		};
	}

	switchDenom = () => {
		console.log("switchin degrees");
		this.setState(this.state.denom === DEGREES.CELSIUS ?
			{temp: this.props.temp_f, denom: DEGREES.FAHRENHEIT} :
			{temp: this.props.temp_c, denom: DEGREES.CELSIUS});
	}

	render() {
		return (
			<div className={bemify(this.props.cls, "--temperature")}>
				<p className="title">Temperature</p> <TempDisplay temp={this.state.temp} denom={this.state.denom} switchDenom={this.switchDenom} />
			</div>
		);
	}
}
