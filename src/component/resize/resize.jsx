import React, {Component} from 'react';

import { 
	addEventsToDocument,
	removeEventsFromDocument, 
	getMousePosition, 
	pauseEvent 
} from 'utils/events';
import WindowMove from 'utils/windowmove';


import './resize.less';

class Resize extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {

	}

	handleCmpResize = (origin, e)=> {
		e.stopPropagation();
		console.log('.....start....resize..ing..')
		const position = getMousePosition(e);
		const opts = {
			movingFn: this.handleProxyResizeMove.bind(this),
			moveEndFn: this.handleProxyResizeUp.bind(this)
		}
		WindowMove.initMoveOption(opts, position);
		this.props.handleCmpResize(true);
	};

	handleProxyResizeMove = (position)=> {
		console.log('resize...moving')
		console.log(position)
	};

	handleProxyResizeUp = (position)=> {
		console.log('resize...uping...')
		console.log(position)
		this.props.handleCmpResize(false);
	};

	handleResizeMouseDown = (e)=> {
		// e.stopPropagation();
		// e.preventDefault();
	};

	render() {
		let { type, style } = {...this.props.currCmp};
		const resizeStyle = {
			width: style.width,
			height: style.height !== 'auto' ? style.height : type === 'text' ? style.fontSize : style.height
		};
		return (
			<div 
				id='proxy-resize' 
				className={`proxy-resize ${this.props.active ? 'active' : ''}`} 
				style={resizeStyle}
				onMouseDown={this.handleResizeMouseDown}
			>
				<div className='handle-resize origin-nw' onMouseDown={this.handleCmpResize.bind(this, 'nw')}/>
				<div className='handle-resize origin-n'  onMouseDown={this.handleCmpResize.bind(this, 'n')}/>
				<div className='handle-resize origin-ne' onMouseDown={this.handleCmpResize.bind(this, 'ne')}/>
				<div className='handle-resize origin-e'  onMouseDown={this.handleCmpResize.bind(this, 'e')}/>
				<div className='handle-resize origin-se' onMouseDown={this.handleCmpResize.bind(this, 'se')}/>
				<div className='handle-resize origin-s'  onMouseDown={this.handleCmpResize.bind(this, 's')}/>
				<div className='handle-resize origin-sw' onMouseDown={this.handleCmpResize.bind(this, 'sw')}/>
				<div className='handle-resize origin-w'  onMouseDown={this.handleCmpResize.bind(this, 'w')}/>
			</div>
		)
	}
}

export default Resize