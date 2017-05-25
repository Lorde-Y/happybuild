import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import * as allReducers from '../reducers';

const rootReducer = combineReducers({
	...allReducers
});

// https://github.com/zalmoxisus/redux-devtools-extension
// if env is development, then browser needs to bug, set redux-devtools.
const composeEnhancer = process.env.NODE_ENV === 'development' && typeof window === 'object' && 
						window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? 
						window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const enhacer = composeEnhancer(
	applyMiddleware(thunk)
);

const store = createStore(
	rootReducer,
	enhacer
);

export default store



