//This is Node, not React. It is so to proof that redux is independent to react.
//In order to run this, go to the file  folder and run redux-basics.js

const redux = require('redux');
const createStore = redux.createStore;

//
const initialState = {
	counter : 0
}
// Reducer
const rootReducer = (state = initialState, action) =>{
	if(action.type==='INC_COUNTER'){
		return{
			...state,
			counter:state.counter+1
		}
	}
	if(action.type==='ADD_COUNTER'){
		return{
			...state,
			counter: state.counter+ action.value
		}
	}
	return state;
};
// Store
const store = createStore(rootReducer);
console.log(store.getState());

// Subscription
store.subscribe( () =>{
		console.log('[Subscription]', store.getState());
	}
)

//Dispatching Action
store.dispatch({type:'INC_COUNTER'});
store.dispatch({type:'ADD_COUNTER', value:10});
console.log(store.getState());

