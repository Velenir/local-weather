import React from 'react';

import {bemify} from '../helpers/bemify';

export default ({wind_dir, wind_mph, wind_degrees, cls}) => (
	<div className={bemify(cls, "--wind")}>
		<p className="title">Wind</p>
		<p className="reading">{wind_dir} {wind_mph} mph</p>
	</div>
);
