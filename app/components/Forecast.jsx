import React from 'react';

import weatherIcon from '../images/weather.min.svg';
import therm from '../images/thermometer.min.svg';
import windsock from '../images/windsock.min.svg';

import {DEGREES, denomController} from '../helpers';

const Desc = ({conditions, icon}) => (
	<div className="day__reading day__reading--desc">
		<img src={weatherIcon+"#"+icon} alt={icon} />
		<span>{conditions}</span>
	</div>
);

class TempDisplay extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			denom: denomController.denom
		};
		denomController.addComponent(this);
	}

	render() {
		const {high, low} = this.props;
		const temp = this.state.denom === DEGREES.CELSIUS ? {high: high.celsius, low: low.celsius} : {high: high.fahrenheit, low: low.fahrenheit};

		return (
			<div>
				<p className="day__reading--temp__high">Day <span>{temp.high}{this.state.denom}</span></p>
				<p className="day__reading--temp__low">Night <span>{temp.low}{this.state.denom}</span></p>
			</div>
		);
	}
}

const Temp = (props) => (
	<div className="day__reading day__reading--temp">
		<img src={therm} alt="thermometer" />
		<TempDisplay {...props}/>
	</div>
);

const Wind = ({mph, dir, degrees}) => (
	<div className="day__reading day__reading--wind">
		<img src={windsock} alt="windsock" style={{transform: `rotate(${degrees}deg) scale(0.8)`}}/>
		<span>{dir} {mph} mph</span>
	</div>
);

const DayCast = ({date: {weekday_short, monthname_short, day}, high, low, conditions, icon, avewind}) => (
	<div className="forecast__day day">
		<p className="day__date">{weekday_short}, {monthname_short} {day}</p>
		<div className="day__readings">
			<Desc conditions={conditions} icon={icon}/>
			<Temp high={high} low={low}/>
			<Wind {...avewind}/>
		</div>
	</div>
);

export default ({days}) => (
	<div className="forecast">
		{days.map((day) =>(
			<DayCast {...day} key={day.period}/>
		))}
	</div>
);
