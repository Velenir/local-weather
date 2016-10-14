import React from 'react';
import InlineSVG from 'svg-inline-react';

import {bemify} from '../helpers/bemify';
import therm from '!!svg-inline!../images/thermometer.min.svg';


const DEGREES = {CELSIUS: "°C", FAHRENHEIT: "°F"};

class TempDisplay extends React.Component {
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
			<a href="#!" className="reading__value" onClick={this.switchDenom}>{this.state.temp + this.state.denom}</a>
		);
	}
}


export default class Temperature extends React.Component {
	componentDidMount() {
		// stroke-dashoffset from 0 to 60; consider middle as 0 °C
		let dashoffset = 30 + this.props.temp_c;
		if(dashoffset > 60) dashoffset = 60;
		else if(dashoffset < 0) dashoffset = 0;

		setTimeout(() => this.icon.querySelector("#merc").style.strokeDashoffset = dashoffset, 0);
	}

	render() {
		return (
			<div className={bemify(this.props.cls, "--temperature")}>
				<p className="title">Temperature</p>
				<div className="reading">
					<div className="reading__icon" ref={c => this.icon = c}>
						{<InlineSVG src={therm}/>}
					</div>
					<TempDisplay temp_c={this.props.temp_c} temp_f={this.props.temp_f} />
				</div>
			</div>
		);
	}
}
