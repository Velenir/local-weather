import React from 'react';
import axios, {CancelToken} from 'axios';

import {debounce} from '../helpers';

import AutocompleteInput from './AutocompleteInput';

export default class Search extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			results: [],
			suggestions: []
		};

		this.promised = {
			source: null,
			lastIndex: 0
		};

		this.debouncedSendRequest = debounce(this.sendRequest, 400);
	}

	requestSuggestions = (partial) => {
		if(this.promised.source) {
			this.promised.source.cancel("Override with a New Request");
			this.promised.source = null;
		}

		if(partial === "") {
			this.setState({
				results: [],
				suggestions: []
			});

			return;
		}

		// console.log("DEBOUNCING for", partial.toUpperCase());
		this.debouncedSendRequest(partial);
	}

	sendRequest = (query) => {
		// console.log("AUTOCOMPLETE", query.toUpperCase());
		this.promised.source = CancelToken.source();
		this.props.getSuggestions(query, {cancelToken: this.promised.source.token, ind: ++this.promised.lastIndex}).then(this.onFullfilled, this.onRejected);
	}

	onFullfilled = (res) => {

		const data = res.data;
		console.log(res.config.ind, this.promised.lastIndex);
		// discard late responses
		if(res.config.ind  < this.promised.lastIndex) {
			// console.log("NOT THE LAST REQUEST, IGNORING");
			return;
		}
		console.log(data, typeof data);
		console.log("DATA", data.RESULTS, typeof data.RESULTS);

		const results = data.RESULTS ? data.RESULTS.filter(({type}) => type === "city") : [];

		this.promised.source = null;

		const pre = document.getElementById("autodata");
		if(pre) {
			pre.innerHTML = JSON.stringify(data, null, 2);
		} else {
			document.body.insertAdjacentHTML("beforeend", "<pre id='autodata'>" + JSON.stringify(data, null, 2) + "</pre>");
		}
		this.setState({
			results,
			suggestions: results.map(({name}) => name)
		});
	}

	onRejected = (err) => {
		this.promised.source = null;

		if (axios.isCancel(err)) {
			console.log("Request canceled", err.message);
		} else {
			console.log("ERROR", err);
		}
	}

	inputSubmitted = ({value, suggestionIndex}) => {
		console.log("RECEIVED", {value, suggestionIndex});

		value = value.trim();

		if(value) {
			if(suggestionIndex !== -1) {
				// suggestion from results
				({l: value} = this.state.results[suggestionIndex]);
			}

			this.setState({
				results: [],
				suggestions: []
			});
			this.props.getWeatherAt(value);
		}
	}

	render() {
		return (
			<AutocompleteInput suggestions={this.state.suggestions} updateSuggestions={this.requestSuggestions} submitInput={this.inputSubmitted} input_attrs={{type: "search"}}/>
		);
	}
}
