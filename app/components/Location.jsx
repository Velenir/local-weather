import React from 'react';

const Location = ({location}) => <p className="location__display">{location.full}</p>;

const WStation = ({location}) => <p className="location__observation"><small>measured at</small> {location.city}</p>;

export default ({display_location, observation_location}) => (
	<div className="location">
		Location Component
		<Location location={display_location}/>
		<WStation location={observation_location}/>
	</div>
);
