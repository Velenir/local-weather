import axios from 'axios';

export function getWeather(apiKey, query, ...features) {
	// console.log("REQUESTING:", `https://api.wunderground.com/api/${apiKey}/${features.join("/")}/q/${query}.json`);
	return axios.get(`//api.wunderground.com/api/${apiKey}/${features.join("/")}/q/${query}.json`);
}

export function autocomplete(query, options = {}) {
	// console.log("REQUESTING:", `https://autocomplete.wunderground.com/aq?query=${query.toLowerCase()}`);
	/* eslint-disable no-undef */
	if(CROSSORIGIN_PREFIX) {
		return axios.get(`${CROSSORIGIN_PREFIX}https://autocomplete.wunderground.com/aq?query=${query.toLowerCase()}`, options);
	}
	/* eslint-enable no-undef */

	return axios.get(`https://autocomplete.wunderground.com/aq?query=${query.toLowerCase()}`, options);
}
