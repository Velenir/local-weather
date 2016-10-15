import React from 'react';

import {bemify} from '../helpers/bemify';
import windsock from '../images/windsock.min.svg';

export default class Wind extends React.Component {
	componentDidMount() {
		// do a lesser arc
		const degree = this.props.wind_degrees > 180 ? 360 - this.props.wind_degrees : this.props.wind_degrees;

		setTimeout(() => this.icon.style.transform = `rotate(${degree}deg)`, 0);
	}

	render() {
		const {wind_dir, wind_mph, cls} = this.props;

		return (
			<div className={bemify(cls, "--wind")}>
				<p className="title">Wind</p>
				<div className="reading">
					<img src={windsock} alt="windsock" className="reading__icon" ref={c => this.icon = c} style={{transition: "transform 2s cubic-bezier(0.28, 0.07, 0.44, 1.9)"}}/>
					<span className="reading__value"> {wind_dir} {wind_mph} mph</span>
				</div>
			</div>
		);
	}
}
