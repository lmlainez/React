
const initialState = {
	persons : []
}

const personReducer = (state = initialState, action) => {
	console.log(action)
	if (action.type === 'ADD_PERSON') {
		const newPerson = {
			id: Math.random(), // not really unique but good enough here!
			name: 'Luismi',
			age: Math.floor( Math.random() * 40 )
		}
		
		return {
			...state,
			persons: state.persons.concat(newPerson)
		}
	}
	if (action.type === 'DELETE_PERSON') {
		
		return {
			...state,
			persons: state.persons.filter(person => person.id !== action.id)
			
		}
	}
	return state;
};

export default personReducer;