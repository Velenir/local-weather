import React from 'react';
import InlineSVG from 'svg-inline-react';

import therm from '!!svg-inline!../images/thermometer.min.svg';
import {DEGREES, denomController, bemify} from '../helpers';


class TempDisplay extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			denom: denomController.denom
		};
		denomController.addComponent(this);
	}

	render() {
		const temp = this.state.denom === DEGREES.CELSIUS ? this.props.temp_c : this.props.temp_f;

		return (
			<a href="#!" className="reading__value" onClick={denomController.switchDenom}>{temp + this.state.denom}</a>
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
		const {cls, temp_c, temp_f} = this.props;

		return (
			<div className={bemify(cls, "--temperature")}>
				<p className="title">Temperature</p>
				<div className="reading">
					<div className="reading__icon" ref={c => this.icon = c}>
						{<InlineSVG src={therm}/>}
					</div>
					<TempDisplay temp_c={temp_c} temp_f={temp_f} />
				</div>
			</div>
		);
	}
}
