import React from 'react';

import Description from './Description';
import Temperature from './Temperature';
import Wind from './Wind';


export default class Conditions extends React.Component {
	render() {
		const {temp_c, temp_f, denom, switchDenom, weather, icon, wind_dir, wind_mph, wind_degrees} = this.props;

		return (
			<div className="conditions">
				<Description weather={weather} icon={icon} cls="conditions__item" />
				<Temperature temp_c={temp_c} temp_f={temp_f} cls="conditions__item" denom={denom} switchDenom={switchDenom} />
				<Wind wind_dir={wind_dir} wind_mph={wind_mph} wind_degrees={wind_degrees} cls="conditions__item" />
			</div>
		);
	}
}
