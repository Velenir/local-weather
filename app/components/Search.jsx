import React from 'react';
import axios, {CancelToken} from 'axios';

import {debounce} from '../helpers';

import AutocompleteInput from './AutocompleteInput';

export default class Search extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			resultsMap: new Map(),
			suggestions: []
		};

		this.promised = {
			source: null,
			lastIndex: 0
		};

		this.debouncedSendRequest = debounce(this.sendRequest, 400, false, this.promised);
	}

	requestSuggestions = (partial) => {
		if(this.promised.source) {
			this.promised.source.cancel("Override with a New Request");
			this.promised.source = null;
		}

		if(partial === "") {
			this.setState({
				resultsMap: new Map(),
				suggestions: []
			});

			return;
		}

		console.log("DEBOUNCING for", partial.toUpperCase());
		this.debouncedSendRequest(partial);
	}

	sendRequest = (query) => {
		// console.log("AUTOCOMPLETE", query.toUpperCase());
		this.promised.source = CancelToken.source();
		console.log("SENDING REQUEST FOR", query);
		this.props.getSuggestions(query, {cancelToken: this.promised.source.token, ind: ++this.promised.lastIndex}).then(this.onFullfilled, this.onRejected);
	}

	onFullfilled = (res) => {

		const data = res.data;
		// discard late responses
		if(res.config.ind  < this.promised.lastIndex) {
			console.log("NOT THE LAST REQUEST, IGNORING");
			return;
		}
		// console.log("DATA", data.RESULTS, typeof data.RESULTS);

		const results = data.RESULTS ? data.RESULTS.filter(({type}) => type === "city") : [];

		this.promised.source = null;

		// const pre = document.getElementById("autodata");
		// if(pre) {
		// 	pre.innerHTML = JSON.stringify(data, null, 2);
		// } else {
		// 	document.body.insertAdjacentHTML("beforeend", "<pre id='autodata'>" + JSON.stringify(data, null, 2) + "</pre>");
		// }
		this.setState({
			resultsMap: new Map(results.map(res => [res.name.toLowerCase(), res])),
			suggestions: results.map(({name}) => name)
		});

		return results;
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

		value = value.trim().toLowerCase();

		if(value) {
			const location = this.state.resultsMap.get(value);
			// location was in the resultsMap
			if(location) {
				value = location.l.replace("/q", "");
				console.log("location from results", value);
				this.props.getWeatherAt(value);

				this.setState({
					suggestions: []
				});
			}
			else {
				// cancel any pending requests
				if(this.promised.source) {
					this.promised.source.cancel("Override with a New Request");
					this.promised.source = null;
				}
				// cancel debounce
				if(this.promised.cancel) {
					this.promised.cancel();
				}

				// make an immediate request for autocompletion
				this.props.getSuggestions(value, {timeout: 1500}).then(this.onFullfilled, this.onRejected).then(results => {
					console.log("from resuts", results);
					// if last request errored
					if(results == undefined) {
						this.props.getWeatherAt(value).then(({response, current_observation, forecast}) => {
							if(!current_observation && !forecast && response && response.results && response.results.length) {
								const {l} = response.results[0];
								this.props.getWeatherAt(l.replace("/q", ""));
							}
							this.setState({
								suggestions: []
							});
						});
					}
					// if only one possible result
					else if(results.length === 1) {
						console.log("One result", results[0].name);
						const {l} = results[0];
						this.props.getWeatherAt(l.replace("/q", ""));
						this.setState({
							suggestions: []
						});
					} else console.log("more results");
					// otherwise don't do anything, user will choose from the newly delivered suggestions
				});
			}
		}
	}

	render() {
		return (
			<AutocompleteInput suggestions={this.state.suggestions} updateSuggestions={this.requestSuggestions} submitInput={this.inputSubmitted} defaultValue={this.props.initialLocation} input_attrs={{type: "search"}}/>
		);
	}
}
