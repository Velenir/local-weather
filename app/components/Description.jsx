import React from 'react';

export default ({weather, icon, icon_url}) => (
	<div>
		Description Component
		<h2>{weather}</h2>
		<img src={icon_url} alt={icon} />
	</div>
);
