import promiseGeolocation from './geolocation';
import {getWeather} from './wunderground';

export function promiseWeather() {
	return promiseGeolocation().then(
		({coords:{latitude, longitude}}) => latitude + "," + longitude,
		err => {
			console.log(err);
			return "autoip";
		}
	).then(query => getWeather(WUND_API_KEY,query, "conditions"));
}

export {autocomplete as promiseAutocomplete} from './wunderground';
