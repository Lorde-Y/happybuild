import React, { Component } from 'react';

let pastStateArr = [];
let presentState = {};
let futureStateArr = [];

export function undoable(initState, reducer) {
	//初始话数据
	presentState = reducer(undefined, {});
	return function(state=initState, action) {
		presentState = state;
		switch(action.type) {
			case 'UN_DO':
				const pastLen = pastStateArr.length - 1;
				const previous = pastStateArr[pastLen];
				pastStateArr.splice(pastLen, 1);
				futureStateArr.splice(0, 0, {
					...presentState,
					currentCmp: []
				});
				return {
					...previous,
					undoAction: {
						undoLen: pastStateArr.length,
						redoLen: futureStateArr.length
					}
				}
			case 'RE_DO':
				const futureLen = futureStateArr.length - 1;
				const next = futureStateArr[0];	
				pastStateArr.push({ 
					...presentState,
					currentCmp: []
				});
				futureStateArr.splice(0, 1);
				return {
					...next,
					undoAction: {
						undoLen: pastStateArr.length,
						redoLen: futureStateArr.length
					}
				}
			default:
				let newState = reducer(presentState, action);
				if (action.type === 'CREATE_CMP' || action.type === 'UPDATE_CMP') {
					pastStateArr.push({ 
						...presentState, 
						currentCmp: []
					});
				}
				return {
					...newState,
					undoAction: {
						undoLen: pastStateArr.length,
						redoLen: futureStateArr.length
					}
				}
		}
	}
}