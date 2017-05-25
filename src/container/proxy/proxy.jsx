import React, {Component} from 'react';
import ReactDom from 'react-dom';

import { createCmp, updateCurrentCmp, updateCmp } from 'action/page';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Resize from 'component/resize';
import ProxyText from 'component/proxytext';

import { 
	addEventsToDocument,
	removeEventsFromDocument,
	getMousePosition,
	pauseEvent 
} from 'utils/events';
import WindowMove from 'utils/windowmove';

import './proxy.less';

class Proxy extends Component {
	constructor(props) {
		super(props);
		this.state = {
			startDoubleText: false,
			isEditing: false
		}
	}

	componentDidMount() {
		addEventsToDocument(this.eventsDocumentMap())		
	}

	eventsDocumentMap() {
		return {
			mousedown: this.handleDocumentMouseDown
		}
	}

	/**
	 * [handleDocumentMouseDown description]
	 * @param  {[event]}
	 * @description [点击文档区域，判断所点击的dom对象是否为组件]
	 */
	handleDocumentMouseDown = (e)=> {		
		if (this.state.isResizing) {
			return
		}
		const $target = e.target;
		//点击当前代理(覆盖在当前cmp之上)
		if ($target.parentNode === ReactDom.findDOMNode(this) || $target.parentNode.parentNode === ReactDom.findDOMNode(this)){
			return
		}
		const cmpId = parseInt($target.getAttribute('data-id'));
		//点击的区域不是组件
		if (!cmpId) {
			let { type, style, id } = {...this.props.currCmp};
			//当该组件是 text组件，并且，是在编辑时，点击其他区域
			if ( type === 'text' && this.state.startDoubleText) {
				return this.setState({
					startDoubleText: false,
					isEditing: false
				}, ()=> {
					//如果是文字组件，之前隐藏的要显示出来
					const currDom = document.getElementById(`CMP_text_${id}`);
					if (currDom) {
						currDom.style.display = 'block';
					}
					this.props.updateCurrentCmp([]);
				});
			}
			//如果一直点击其它区域，不能一直更新currentcmp.
			const { currentCmp } = { ...this.props.data };
			if (currentCmp.length === 0) {
				return
			}
			return this.props.updateCurrentCmp([]);
		}
		//点击其他cmp组件
		this.props.updateCurrentCmp([cmpId]);
		this.setDragInit(e);
	};

	setDragInit(e) {
		const position = getMousePosition(e);
		const opts = {
			movingFn: this.handleProxyMove.bind(this),
			moveEndFn: this.handleProxyUp.bind(this)
		};
		WindowMove.initMoveOption(opts, position);
	}

	handleTextEdit = (data)=> {
		this.setState({
			isEditing: true
		}, ()=> {
			this.props.updateCmp(data);
		})
	};

	//当点击当前代理的时候重新去init,把刚新建的cmp加上move事件
	handleProxyMouseDown = (e) => {
		this.setDragInit(e);
	};

	handleProxyMove = (position)=> {
		const { id, type } = { ...this.props.currCmp };

		const $currDom = document.getElementById(`CMP_${type}_${id}`);
		const $proxy = document.getElementById('proxy');

		const { disX, disY, currDomX, currDomY, proxyX, proxyY } = { ...position };

		$currDom.style.left = `${parseInt(currDomX) + disX}px`;
		$currDom.style.top = `${parseInt(currDomY) + disY}px`;
		
		$proxy.style.left = `${parseInt(proxyX) + disX}px`;
		$proxy.style.top = `${parseInt(proxyY) + disY}px`;
	};

	handleProxyUp = (position)=> {
		this.updateCmpPosition(position);
	};

	updateCmpPosition = (position)=> {
		const { disX, disY } = { ...position };
		//点击后，但是没有移动，不更新状态
		if (disX === 0 && disY === 0) {
			return;
		}
		let { style } = {...this.props.currCmp};
		const updateStyle = {
			style: {
				left: style.left + disX,
				top: style.top + disY
			}
		};
		this.props.updateCmp(updateStyle);
	};

	handleProxyDoubleClick = (e)=> {
		const { type, id } = { ...this.props.currCmp };
		if (type !== 'text') {
			return
		}
		//双击之后，当前的文字组件设置为隐藏状态
		const currDom = document.getElementById(`CMP_${type}_${id}`);
		currDom.style.display = 'none';

		this.setState({startDoubleText: true});
	};

	getCanvasArea() {
		const { type, id, style } = { ...this.props.currCmp };
		const canvasDom = document.getElementById('canvas');
		let offsetLeft = null;
		let offsetTop = null;
		if (canvasDom) {
			let { left, top } = canvasDom.getBoundingClientRect();
			offsetLeft = left;
			offsetTop = top;
		}
		return {
			position: style.position,
			left: offsetLeft ? offsetLeft + style.left : 0,
			top: offsetTop ? offsetTop + style.top : 0,
			width: style.width,
			height: style.height !== 'auto' ? style.height : type === 'text' ? style.fontSize : style.height
		}
	}

	handleCmpResize = (flag)=> {
		this.setState({
			isResizing: flag
		})
	};

	render() {
		const proxyStyle = this.getCanvasArea();
		return (
			<div 
				className='proxy'  
				style={proxyStyle}
				id='proxy' 
				onMouseDown={this.handleProxyMouseDown}
				onDoubleClick={this.handleProxyDoubleClick}
			>
				<Resize
					active={this.props.showResize}
					currCmp={this.props.currCmp}
					handleCmpResize={this.handleCmpResize}
				/>
				<ProxyText
					startDoubleText={this.state.startDoubleText}
					isEditing={this.state.isEditing}
					handleTextEdit={this.handleTextEdit}
					currCmp={this.props.currCmp}
				/>
			</div>
		)
	}
}

function mapStateToProps(state) {
	let { currentCmp, cmps } = {...state.page};
	cmps = cmps ? cmps : [];
	const idx = cmps.findIndex( cmp => cmp.id === currentCmp[0]);
	const showResize = idx !== -1 ? true : false;
	const defaultCmp = {
		type: null,
		style: {
			position: 'absolute',
			left: 0,
			top: 0,
			width: 0,
			height: 0
		}
	};
	return {
		data: state.page,
		currCmp: showResize ? cmps[idx] : defaultCmp,
		showResize: showResize
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		updateCmp,
		updateCurrentCmp
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Proxy)