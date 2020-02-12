
import * as actionTypes from '../actions/actionTypes';

const initialState = {
	results: [],
}

const reducer = (state = initialState, action) => {
	if (action.type === actionTypes.STORE_RESULT) {
		return {
			...state,
			results: state.results.concat({id:new Date(), value: action.result}) //Concat Returns a new Array, so it is immutable
		}
	}
	if (action.type === actionTypes.DELETE_RESULT) {
		//We'll return an array with all elements that are not the one we are passing
		const updatedArray = state.results.filter( (result,index) => result.id !== action.resultElementId);
		return {
			...state,
			results: updatedArray
		}
	}
	return state;
};

export default reducer;