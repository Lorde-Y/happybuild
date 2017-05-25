import { CREATE_CMP, UPDATE_CURRENT_CMP, UPDATE_CMP } from '../constants';

export function createCmp(cmpData) {
	return {
		type: CREATE_CMP,
		cmpData
	}
}

export function updateCurrentCmp(cmpId) { 
	return {
		type: UPDATE_CURRENT_CMP,
		cmpId
	}
}

export function updateCmp(data) {
	return {
		type: UPDATE_CMP,
		data
	}
}

export function undoAbleAction(type) {
	return {
		type: type
	}
}