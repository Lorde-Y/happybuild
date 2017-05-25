import React, {Component} from 'react';
import { createCmp, updateCurrentCmp, updateCmp, undoAbleAction } from 'action/page';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SideTool from 'component/sidetool';

import { addEventsToDocument } from 'utils/events';

import Enhancer from 'component/enhancer';
import TextCmp from 'component/textcmp';
import BtnCmp from 'component/btncmp';

import './canvas.less';

const canvasCmps = {
	text: Enhancer(TextCmp),
	image: Enhancer(TextCmp),
	btn: Enhancer(BtnCmp)
};

class Canvas extends Component {
	constructor(props) {
		super(props);
	}

	eventsMap() {
		return {
			mousedown: this.handleCanvasMouseDown,
			click: this.handleDocumentClick
		}
	}

	handleCanvasMouseDown = (e)=> {
		
	};

	renderCmps() {
		let { currentCmp, cmps } = { ...this.props.data };
		cmps = cmps ? cmps : [];
		return cmps.map((item, id)=> {
			const Cmp = canvasCmps[item.type];
			const active = currentCmp[0] === item.id ? true : false;
			return (
				<Cmp
					key={id}
					type={item.type}
					cmpData={item}
					active={active}
				/>
			)
		})
	}

	render() {
		console.log('....');
		console.log('.hellwo..')
		return (
			<div className='canvas-container' onMouseDown={this.handleCanvasMouseDown}>
				<div className='canvas' id='canvas'>
					{ this.renderCmps() }
				</div>
				<SideTool
					undoAble={this.props.data.undoAction}
					undoAbleAction={this.props.undoAbleAction}
				/>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		data: state.page
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		createCmp,
		updateCurrentCmp,
		updateCmp,
		undoAbleAction
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas)