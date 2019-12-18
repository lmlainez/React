import React from 'react'

const userInput =  (props) => {
	
		return(
			<div>
				<input type="text"  onChange={props.changeHandler} value={props.initialValue}/>
			</div>
		)
	
	
}

export default userInput;