import React from 'react';

import {bemify} from '../helpers/bemify';

export default ({weather, icon, icon_url, cls}) => (
	<div className={bemify(cls, "--description")}>
		<p className="title">{weather}</p>
		<img className="reading" src={icon_url} alt={icon} />
	</div>
);
