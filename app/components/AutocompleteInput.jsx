import React from 'react';

export default class AutocompleteInput extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeInd: -1
		};
	}

	static defaultProps = {
		suggestions: []
	}

	onChange = (e) => {
		this.props.requestSuggestions(e.target.value);
	}

	onKeyDown = (e) => {
		console.log("KeyPress:");
		console.log("charCode", e.charCode);
		console.log("keyCode", e.keyCode);
		console.log("key", e.key);
		console.log("which", e.which);
		switch (e.key) {
		case "ArrowUp":
		case "ArrowDown":
			e.preventDefault();
			{
				let {length} = this.props.suggestions;
				this.setState({
					activeInd: (this.state.activeInd + (e.key === "ArrowUp" ? -1: 1) % length + length) % length
				});
			}
			return;
		default:
			return;
		}

	}

	scrollIntoViewIfNeeded(li) {
		console.log("li:", li);

		if(li === null) return;

		const extra = 2;

		const {parentNode: parent, offsetTop, offsetHeight} = li;
		const {clientHeight: pHeight, scrollTop: pScrollTop} = parent;

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
