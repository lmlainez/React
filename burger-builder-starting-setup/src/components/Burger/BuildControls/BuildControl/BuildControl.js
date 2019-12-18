import React from 'react';
import classes from './BuildControl.css';
const buildControl = (props) =>(
	
	<div className={classes.BuildControl}>
		<div className={classes.Label}>{props.label}</div>
		<button classes={classes.Less}
				onClick={props.ingredientRemoved} disabled={props.disabled}>Less</button>
		<button onClick={props.ingredientAdded}
				classes={classes.More}>More</button>
	</div>

)

export default buildControl;