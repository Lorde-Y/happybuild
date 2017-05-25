import React, {Component} from 'react';

class Draggable extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { onMouseDown, onDragStart, onDragMove, onDragStop } = { ...this.props };
		return (
			React.cloneElement(React.Children.only(this.props.children), {
				onMouseDown,
				onDragStart,
				onDragMove,
				onDragStop
			})
		)
	}
}

export default Draggable