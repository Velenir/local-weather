import React from 'react';

import weatherIcon from '../images/weather.min.svg';
import therm from '../images/thermometer.min.svg';
import windsock from '../images/windsock.min.svg';

import {DEGREES} from '../helpers';

const Desc = ({conditions, icon}) => (
	<div className="day__reading day__reading--desc">
		<img src={weatherIcon+"#"+icon} alt={icon} />
		<span>{conditions}</span>
	</div>
);

const Temp = ({high, low, denom}) => {
	const temp = denom === DEGREES.CELSIUS ? {high: high.celsius, low: low.celsius} : {high: high.fahrenheit, low: low.fahrenheit};

	return (
		<div className="day__reading day__reading--temp">
			<img src={therm} alt="thermometer" />
			<div>
				<p className="day__reading--temp__high">Day <span>{temp.high}{denom}</span></p>
				<p className="day__reading--temp__low">Night <span>{temp.low}{denom}</span></p>
			</div>
		</div>
	);
};

const Wind = ({mph, dir, degrees}) => (
	<div className="day__reading day__reading--wind">
		<img src={windsock} alt="windsock" style={{transform: `rotate(${degrees}deg) scale(0.8)`}}/>
		<span>{dir} {mph} mph</span>
	</div>
);

const DayCast = ({date: {weekday_short, monthname_short, day}, high, low, denom, conditions, icon, avewind}) => (
	<div className="forecast__day day">
		<p className="day__date">{weekday_short}, {monthname_short} {day}</p>
		<div className="day__readings">
			<Desc conditions={conditions} icon={icon}/>
			<Temp high={high} low={low} denom={denom}/>
			<Wind {...avewind}/>
		</div>
	</div>
);

export default ({days, denom}) => (
	<div className="forecast">
		{days.map((day) =>(
			<DayCast {...day} denom={denom} key={day.period}/>
		))}
	</div>
);
