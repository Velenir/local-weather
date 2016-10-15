import React from 'react';

import {bemify} from '../helpers';
import weatherIcon from '../images/weather.min.svg';

export default ({weather, icon, cls}) => (
	<div className={bemify(cls, "--description")}>
		<p className="title">{weather}</p>
		<img src={weatherIcon+"#"+icon} alt={icon} />
	</div>
);
