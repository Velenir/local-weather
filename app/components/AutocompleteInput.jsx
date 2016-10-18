import React from 'react';

export default class AutocompleteInput extends React.Component {
	onChange = (e) => {
		this.props.requestSuggestions(e.target.value);
	}

	render() {
		console.log(this.props);

		const suggestions = this.props.suggestions && this.props.suggestions.map((sg, i) => (
			<li className="suggestion" key={i}>{sg}</li>
		));
		return (
			<div className="autocomplete">
				<input className="autocomplete__input" type="text" onChange={this.onChange} {...this.props.input_attrs}/>
				<ul className="autocomplete__suggestions">
					{suggestions}
				</ul>
			</div>
		);
	}
}
