import React, { Component, PropTypes } from 'react';

import './sidetool.less';

class SideTool extends Component {
	constructor(props) {
		super(props);
	}

	handleUndoAble = (e, type)=> {
		const { undoLen, redoLen } = { ...this.props.undoAble };
		if (type === 'UN_DO' && !undoLen) {
			return
		}
		if (type === 'RE_DO' && !redoLen) {
			return
		}
		this.props.undoAbleAction(type);
	}

	render() {
		const { undoLen, redoLen } = { ...this.props.undoAble };
		return (
			<div className='canvas-sidetool'>
				<button 
					className={`sidetool-undo ${ undoLen ? '' : 'disabled'}`} 
					onMouseDown={ (e)=> this.handleUndoAble(e, 'UN_DO') }
				>
					撤销
				</button>
				<button 
					className={`sidetool-redo ${ redoLen ? '' : 'disabled'}`}
					onMouseDown={ (e)=> this.handleUndoAble(e, 'RE_DO') }
				>
					重做
				</button>
			</div>
		)
	}
}

SideTool.propTypes = {
	undoCls: PropTypes.string,
	redoCls: PropTypes.string
}

SideTool.defaultProps = {
	undoCls: 'disabled',
	redoCls: 'disabled'
}

export default SideTool