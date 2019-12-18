import React from 'react';

const ValidationComponent = (props) =>{
	
	let validationMessage = 'Text Long enough';
	if(props.text < 5){
		validationMessage = 'Text not Long enough';
	}
	return(
		<div>
			<p>{validationMessage}</p>
		</div>
	
	)
	
	
	
}

export default ValidationComponent;