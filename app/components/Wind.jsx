import React from 'react';

export default ({wind_dir, wind_mph, wind_degrees}) => (
	<div>
		Wind Component
		<p>{wind_dir} {wind_mph} mph</p>
	</div>
);
