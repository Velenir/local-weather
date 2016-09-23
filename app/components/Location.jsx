import React from 'react';

const Location = ({location}) => <p>{location.full}</p>;

const WStation = ({location}) => <p>{location.city}</p>;

export default ({display_location, observation_location}) => (
	<div>
		Location Component
		<Location location={display_location} />
		<WStation location={observation_location} />
	</div>
);
