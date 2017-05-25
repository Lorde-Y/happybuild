import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Root from 'container/root';

import './styles/app.less';
import { AppContainer } from 'react-hot-loader';

const render = (Component) => {
	ReactDOM.render(
		<Provider store={store}>
			<Component />
		</Provider>,
		document.getElementById('app')
	);
};

render(Root);
// ReactDOM.render(
// 	<Canvas />,
// 	document.getElementById('app')
// );

// Hot Module Replacement API
if (module.hot) {
	module.hot.accept('./container/root', () => {
		const NewApp = require('./container/root').default;
		render(NewApp)
	});
}


// import Routes from './Routes.jsx';

// export default function Root(props) {
//     return (
//         <Provider store={props.store}>
//             <Router history={props.history} routes={Routes} />
//         </Provider>
//     );
// }

// const store = ...
// const history = ...
// const Root = require('./Root.jsx').default;
// const $root = document.getElementById('root');

// ReactDOM.render(
//     <AppContainer>
//         <Root store={store} history={history} />
//     </AppContainer>,
//     $root
// );

// if (module.hot) {
//     module.hot.accept('./Root.jsx', () => {

//         /* [Seems hacky] Running require tiggers hot reload */
//         require('./components/Root.jsx').default;

//         ReactDOM.render(
//             <AppContainer>
//                 <Root store={store} history={history} />
//             </AppContainer>,
//             $root
//         );
//     });
// }
// 
// 
// 
// https://github.com/gaearon/react-hot-boilerplate/pull/61
// 
// import { AppContainer } from 'react-hot-loader';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';

// import App from './app';
// import appReducer from './reducer';

// const store = createStore(appReducer);

// ReactDOM.render(
//   <AppContainer>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </AppContainer>,
//   rootEl
// );

// if (module.hot) {
//   module.hot.accept('./reducer', () => {
//     // redux store has a method replaceReducer
//     store.replaceReducer(appReducer);
//   });

//   module.hot.accept('./app', () => {
//     ReactDOM.render(
//       <AppContainer>
//         <Provider store={store}>
//           <App />
//         </Provider>
//       </AppContainer>,
//       rootEl
//     );
//   });
// }

// edit: if you’re using webpack 1, I believe you’ll need to re-require the module. (I’m using webpack2)

// if (module.hot) {
//   module.hot.accept('./reducer', () => {
//     const nextStore = require('./reducer');

//     store.replaceReducer(nextStore);
//   });
// }