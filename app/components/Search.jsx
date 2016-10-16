import React from 'react';

export default class Search extends React.Component {
	autocomplete = (e) => {
		const val = e.target.value;
		if(val === "") return;

		this.props.getSuggestions(e.target.value).then(this.onFullfilled, this.onRejected);
	}

	onFullfilled = ({data}) => {
		console.log("DATA", data);

		const pre = document.getElementById("autodata");
		if(pre) {
			pre.innerHTML = JSON.stringify(data, null, 2);
		} else {
			document.body.insertAdjacentHTML("beforeend", "<pre id='autodata'>" + JSON.stringify(data, null, 2) + "</pre>");
		}
		// this.setState(data);
	}

	onRejected = (err) => {
		console.log("ERROR", err);
	}

	render() {
		return (
			<div>
				<input type="search" onChange={this.autocomplete}/>
			</div>
		);
	}
}
