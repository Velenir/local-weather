const DEGREES = {CELSIUS: "°C", FAHRENHEIT: "°F"};

class DenomController {
	constructor() {
		this.denom = DEGREES.CELSIUS;
		this.components = [];
	}

	switchDenom = () => {
		console.log("switching degrees");
		this.denom = this.denom === DEGREES.CELSIUS ? DEGREES.FAHRENHEIT : DEGREES.CELSIUS;

		for (let c of this.components) {
			c.setState({
				denom: this.denom
			});
		}
	}

	addComponent(c) {
		this.components.push(c);
	}

	removeComponent(c) {
		const ind = this.components.indexOf(c);
		if(ind === -1) return;

		this.components.splice(ind, 1);
	}

	clearComponents() {
		this.components = [];
	}
}

const denomController = new DenomController;

export {DEGREES, denomController};
