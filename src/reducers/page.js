import { CREATE_CMP, UPDATE_CURRENT_CMP, UPDATE_CMP } from '../constants';

import { deepCopy } from 'utils/common';

import { undoable } from 'component/undoable';

const initState = {
	cmpId: 1000,
	currentCmp: [],
	cmps: []
};

function toUpdateCmp(state, action) {
	let newState = deepCopy({}, state);
	let { currentCmp, cmps } = { ...newState };
	const idx = cmps.findIndex(cmp => cmp.id === currentCmp[0]);
	if (idx === -1) {
		return state
	}
	let currCmp = { ...cmps[idx] };
	const updateData = { ...action.data };
	for (let key in updateData) {
		if ({}.hasOwnProperty.call(currCmp, key)) {
			if (typeof updateData[key] === 'object') {
				currCmp[key] = {
					...currCmp[key],
					...updateData[key]
				};
			}else {
				currCmp[key] = updateData[key];
			}
		}
		else {
			currCmp[key] = updateData[key];
		}
	}
	cmps[idx] = {...currCmp};
	return {
		...state,
		cmps
	}
}

function toCreateCmp(state, action) {
	let { cmpId, currentCmp, cmps } = { ...state };
	cmpId++;
	let cmpData = {
		id: cmpId,
		...action.cmpData
	};
	let cmp = [];
	cmp.push(cmpData)
	return {
		...state,
		cmpId,
		currentCmp: [cmpId],
		cmps: state.cmps.concat(cmp)
	}
}

function reducerPage(state=initState, action) {
	let newState = null;
	switch (action.type) {
		case CREATE_CMP:
			newState = toCreateCmp(state, action);
			return newState
		case UPDATE_CMP:
			newState = toUpdateCmp(state, action);
			return newState;
		case UPDATE_CURRENT_CMP:
			newState = {
				...state,
				currentCmp: [...action.cmpId]
			};
			return newState
		default:
			return state
	}
};

const page = undoable(initState, reducerPage);
export { page }