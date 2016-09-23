import React from 'react';

import Description from './Description';
import Temperature from './Temperature';
import Wind from './Wind';

export default class Conditions extends React.Component {
	render() {
		const {temp_c, temp_f, weather, icon, icon_url, wind_dir, wind_mph, wind_degrees} = this.props;

		return (
			<ul>
				<li><Description weather={weather} icon={icon} icon_url={icon_url}/></li>
				<li><Temperature temp_c={temp_c} temp_f={temp_f} /></li>
				<li><Wind wind_dir={wind_dir} wind_mph={wind_mph} wind_degrees={wind_degrees} /></li>
			</ul>
		);
	}
}
