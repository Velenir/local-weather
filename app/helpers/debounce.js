export default function debounce(func, wait, immediate, token) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (token) token.cancel = clearTimeout.bind(null, timeout);
		if (callNow) func.apply(context, args);
	};
}
