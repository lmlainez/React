import *  as actionTypes from '../../store/actions/actionTypes';



export const saveResult = (res) => {
	return {
		type: actionTypes.STORE_RESULT,
		result: res
	};
}

export const storeResult= (res) => {
	return function (dispatch, getState){
		setTimeout(()=> {
			const oldCounter = getState().ctr.counter;
			console.log(oldCounter)
			dispatch(saveResult(res));
		
		}, 2000);
	}
}


export const deleteResult= (elementId) => {
	return {
		type:actionTypes.DELETE_RESULT,
		resultElementId:elementId
	};
}