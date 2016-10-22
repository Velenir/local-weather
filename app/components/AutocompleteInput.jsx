import React from 'react';

export default class AutocompleteInput extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedId: -1,
			text: props.defaultText,
			// if suggestions given with initial props, display them
			showSuggestion: props.suggestions.length > 0,
			chosenSuggestion: -1
		};
	}

	static defaultProps = {
		suggestions: [],
		defaultText: ""
	}

	handleChange = ({target: {value}}) => {
		this.setState({
			text: value,
			selectedId: -1,
			showSuggestion: false,
			chosenSuggestion: -1
		});

		this.props.updateSuggestions(value);
	}

	handleKeyDown = (e) => {
		let increment = 0;
		switch (e.key) {
		case "ArrowUp":
			increment -= 2;
			// fall through
		case "ArrowDown":
			++increment;
			e.preventDefault();
			{
				let {length} = this.props.suggestions;
				this.setState({
					selectedId: (this.state.selectedId + increment % length + length) % length
				});
			}
			return;

		case "Enter":
			{
				const {selectedId} = this.state;
				let value, suggestionIndex;
				if(selectedId !== -1) {
					value = this.selected.textContent;
					suggestionIndex = selectedId;
					this.inputSuggestion();
				} else {
					({text: value, chosenSuggestion: suggestionIndex} = this.state);
				}
				this.props.submitInput({value, suggestionIndex});
			}
			return;

		case "ArrowLeft":
			if(this.state.selectedId !== -1) {
				this.inputSuggestion();
			}
			return;

		case "ArrowRight":
		case "Tab":
			if(this.state.selectedId !== -1) {
				e.preventDefault();
				this.inputSuggestion();
			}
			return;
		}
	}

	scrollIntoViewIfNeeded = (li) => {
		this.selected = li;
		if(li === null) return;

		const extra = 2;

		const {parentNode: parent, parentNode: {clientHeight: pHeight, scrollTop: pScrollTop}, offsetTop, offsetHeight} = li;

		// if not in viewport, scroll into view
		if(pHeight + pScrollTop - extra < offsetTop) {
			parent.scrollTop = offsetTop + offsetHeight - pHeight;
		} else if(offsetTop + offsetHeight - extra < pScrollTop) {
			parent.scrollTop = offsetTop;
		}
	}

	handleSuggestionClicked = ({target, target: {textContent, dataset}}) => {
		this.inputSuggestion(this.selected = target);
		this.props.submitInput({value: textContent, suggestionIndex: dataset.index});
	}

	inputSuggestion = (li = this.selected) => {
		this.setState({
			text: li.textContent,
			selectedId: -1,
			showSuggestion: false,
			chosenSuggestion: +li.dataset.index
		});

		this.input.focus();
	}

	render() {
		const suggestions = this.state.showSuggestion && (this.props.suggestions || []).map((sg, i) => {
			const props = i === this.state.selectedId ? {
				className: "suggestions__item suggestions__item--selected",
				ref: this.scrollIntoViewIfNeeded
			} : {
				className: "suggestions__item"
			};

			return (<li {...props} key={i} onClick={this.handleSuggestionClicked} data-index={i}>{sg}</li>);
		});

		return (
			<div className="autocomplete">
				<input className="autocomplete__input" type="text" {...this.props.input_attrs} value={this.state.text} onChange={this.handleChange} onKeyDown={this.handleKeyDown} ref={c => this.input = c}/>
				<ul className="autocomplete__suggestions suggestions">
					{suggestions}
				</ul>
			</div>
		);
	}

	componentWillReceiveProps() {
		this.setState({
			showSuggestion: true
		});
	}
}
