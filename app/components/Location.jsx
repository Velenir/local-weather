import React from 'react';

const Location = ({location}) => <p className="location__display">{location.full}</p>;

const WStation = ({location, error}) => error ?
	(<p className="location__observation location__observation--error">Error {error.type}: {error.description}</p>) :
	(<p className="location__observation"><small>weather as measured at</small> {location.city}</p>);

export default ({display_location, observation_location, children, response}) => (
	<div className="panel location">
		{children || <Location location={display_location}/>}
		<WStation location={observation_location} error={response.error}/>
	</div>
);
