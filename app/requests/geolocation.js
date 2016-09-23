export default function() {
	return new Promise(function(resolve, reject) {
		if("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(resolve, reject);
		} else {
			reject(new Error("geolocation isn't supported"));
		}
	});
}
