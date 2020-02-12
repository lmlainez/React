import React from 'react';
import ReactDOM from 'react-dom';
import { createStore , combineReducers, applyMiddleware, compose} from 'redux';
import { Provider } from 'react-redux';
//We import thunk as middleware as it'll allow us to return promises as result from redux.
//We will then be able to use redux + async methods to get and pass data
import thunk from 'redux-thunk';


import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';

const rootReducer = combineReducers({
	ctr:counterReducer,
	res:resultReducer
})

const logger = (store) =>{
		return (next)=> {
					return action => {
						console.log("[Middleware] Dispatching ", action);
						const result = next(action);
						console.log("[Middleware] next state ", store.getState());
			
						return result;
					}
				}
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer,composeEnhancers(applyMiddleware(logger,thunk)));


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
