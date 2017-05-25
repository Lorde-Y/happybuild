import { 
	addEventsToDocument,
	removeEventsFromDocument,
	getMousePosition,
	pauseEvent 
} from './events';

import store from 'store';

let $currDom = null;
let $proxy = null;

let moveOption = {
	oriX: null, //点击的位置x
	oriY: null,  //点击的位置y
	proxyX: null,
	proxyY: null,
	currDomX: null,
	currDomY: null,
	movingFn: null,
	moveEndFn: null
};

const WindowMove = {
	init(opts) {
		// addEventsToDocument(this.eventsMap());
		// moveOption.movingFn = opts.movingFn;
		// moveOption.moveEndFn = opts.moveEndFn;
	},
	eventsMap() {
		return {
			mousemove: this.handleDocumentMouseMove.bind(this),
			mouseup: this.handleDocumentMouseUp.bind(this)
		}
	},
	initMoveOption(opts, position) {
		const state = store.getState();
		let { currentCmp, cmps } = { ...state.page };
		const idx = cmps.findIndex( cmp => cmp.id === currentCmp[0]);
		if (idx < 0 ){
			return
		}
		const currCmp = cmps[idx];
		const { type, id } = {...currCmp};
		$currDom = document.getElementById(`CMP_${type}_${id}`);

		if ($currDom) {
			addEventsToDocument(this.eventsMap());
			moveOption.movingFn = opts.movingFn;
			moveOption.moveEndFn = opts.moveEndFn;
		}
		$proxy = document.getElementById('proxy');

		moveOption.currDomX = $currDom.style.left.replace('px', '');
		moveOption.currDomY = $currDom.style.top.replace('px', '');

		moveOption.proxyX =  $proxy.style.left.replace('px', '');
		moveOption.proxyY =  $proxy.style.top.replace('px', '');

		moveOption.oriX = position.x;
		moveOption.oriY = position.y;
	},
	handleDocumentMouseMove(e) {
		const position = getMousePosition(e);
		const disX = position.x - moveOption.oriX;
		const disY = position.y - moveOption.oriY;
		if ($currDom) {
			if (moveOption.movingFn) {
				moveOption.movingFn({
					...moveOption,
					disX,
					disY
				});
			}
		}
	},
	handleDocumentMouseUp(e) {
		const position = getMousePosition(e);
		const disX = position.x - moveOption.oriX;
		const disY = position.y - moveOption.oriY;
		if ($currDom) {
			if (moveOption.moveEndFn) {
				moveOption.moveEndFn({
					disX,
					disY
				});
			}
			removeEventsFromDocument(this.eventsMap());
			$currDom = null;
			$proxy = null;
		}
	}
};

// document.addEventsListener('mousemove', (e)=> {
	
// 	WindowMove.handleDocumentMouseMove(e);
// })

// document.addEventsListener('mouseup', (e)=> {
// 	WindowMove.handleDocumentMouseUp(e);
// })

export default WindowMove