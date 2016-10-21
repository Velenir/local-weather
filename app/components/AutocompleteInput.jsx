import React from 'react';

export default class AutocompleteInput extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedId: -1,
			text: props.defaultText
		};
	}

	static defaultProps = {
		suggestions: [],
		defaultText: ""
	}

	handleChange = ({target, target: {value}}) => {
		console.log("TEXT CHANGED TO", value);
		this.setState({
			text: value,
			selectedId: -1,
			showSuggestion: false
		});

		this.props.updateSuggestions(value);
	}

	handleKeyDown = (e) => {
		// ArrowUp: 38
		// ArrowDown: 40
		// ArrowLeft: 37
		// ArrowRight: 39
		//
		// Enter: 13
		// Tab: 9
		// console.log("KeyPress:");
		// console.log("charCode", e.charCode);
		// console.log("keyCode", e.keyCode);
		console.log("key", e.key);
		// console.log("which", e.which);
		let increment = 0;
		switch (e.key) {
		case "ArrowUp":
			increment -= 2;

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

		case "ArrowLeft":
		case "Enter":
			if(this.state.selectedId !== -1) {
				this.inputSuggestion();
			}

		case "Enter":
			console.log("ENTER PRESSED");
			return;

		case "ArrowRight":
		case "Tab":
			if(this.state.selectedId !== -1) {
				e.preventDefault();
				this.inputSuggestion();
			}
			return;

		default:
			return;
		}

	}

	scrollIntoViewIfNeeded = (li) => {
		// console.log("li:", li);
		this.selected = li;
		if(li === null) return;

		const extra = 2;

		const {parentNode: parent, parentNode: {clientHeight: pHeight, scrollTop: pScrollTop}, offsetTop, offsetHeight} = li;

		if(pHeight + pScrollTop - extra < offsetTop) {
			// pScrollTop + pHeight = offsetTop + offsetHeight;
			parent.scrollTop = offsetTop + offsetHeight - pHeight;
		} else if(offsetTop + offsetHeight - extra < pScrollTop) {
			parent.scrollTop = offsetTop;
		}
	}

	render() {
		// console.log(this.props);

		// if(li.parentNode.clientHeight +li.parentNode.scrollTop < li.offsetTop) li.scrollIntoView(false)
		// if(li.offsetTop +li.offsetHeight < li.parentNode.scrollTop) li.scrollIntoView(false)
		//
		// // WORKS
		// if(li.parentNode.clientHeight +li.parentNode.scrollTop < li.offsetTop || li.offsetTop +li.offsetHeight < li.parentNode.scrollTop) li.scrollIntoViewIfNeeded(false

		const suggestions = this.props.suggestions.map((sg, i) => {
			const props = i === this.state.activeInd ? {
				className: "suggestions__item selected",
				ref: this.scrollIntoViewIfNeeded
			} : {
				className: "suggestions__item"
			};

			return (<li {...props} key={i}>{sg}</li>);
		});
		return (
			<div className="autocomplete">
				<input className="autocomplete__input" type="text" onChange={this.onChange} onKeyDown={this.onKeyDown} {...this.props.input_attrs}/>
				<ul className="autocomplete__suggestions suggestions">
					{suggestions}
				</ul>
			</div>
		);
	}
}
