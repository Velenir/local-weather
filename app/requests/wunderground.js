import axios from 'axios';

export function getWeather(apiKey, query, ...features) {
	// console.log("REQUESTING:", `https://api.wunderground.com/api/${apiKey}/${features.join("/")}/q/${query}.json`);
	return axios.get(`https://api.wunderground.com/api/${apiKey}/${features.join("/")}/q/${query}.json`);
}

export function autocomplete(query, options = {}) {
	// console.log("REQUESTING:", `https://autocomplete.wunderground.com/aq?query=${query.toLowerCase()}`);
	return axios.get(`https://crossorigin.me/https://autocomplete.wunderground.com/aq?query=${query.toLowerCase()}`, options);
}
