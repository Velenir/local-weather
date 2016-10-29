const DEGREES = {CELSIUS: "°C", FAHRENHEIT: "°F"};

class DenomController {
	constructor() {
		this.denom = DEGREES.CELSIUS;
		this.components = new Set();
	}

	switchDenom = () => {
		this.denom = this.denom === DEGREES.CELSIUS ? DEGREES.FAHRENHEIT : DEGREES.CELSIUS;

		this.components.forEach(c => c.setState({
			denom: this.denom
		}));
	}

	addComponent(c) {
		this.components.add(c);
	}

	removeComponent(c) {
		this.components.delete(c);
	}

	clearComponents() {
		this.components.clear();
	}
}

const denomController = new DenomController();

export {DEGREES, denomController};
