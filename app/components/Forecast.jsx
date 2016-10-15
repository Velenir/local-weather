import React from 'react';

import weatherIcon from '../images/weather.min.svg';
import therm from '../images/thermometer.min.svg';
import windsock from '../images/windsock.min.svg';

const Desc = ({conditions, icon}) => (
	<div className="day__reading day__reading--desc">
		<img src={weatherIcon+"#"+icon} alt={icon} />
		<span>{conditions}</span>
	</div>
);

const Temp = ({high, low}) => (
	<div className="day__reading day__reading--temp">
		<img src={therm} alt="thermometer" />
		<div>
			<p className="day__reading--temp__high">Day <span>{high.celsius}°C</span></p>
			<p className="day__reading--temp__low">Night <span>{low.celsius}°C</span></p>
		</div>
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
