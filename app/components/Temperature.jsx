import React from 'react';

export default ({temp_c, temp_f}) => (
	<div>
		Temperature Component
		<h3>{temp_c} °C</h3>
		<h3>{temp_f} °F</h3>
	</div>
);
