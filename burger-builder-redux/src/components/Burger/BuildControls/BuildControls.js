import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
	{label:'salad' , type:'salad'},
	{label:'Bacon' , type:'bacon'},
	{label:'Cheese' , type:'cheese'},
	{label:'Meat' , type:'meat'},


]
const buildControls = (props)=>(
	<div className={classes.BuildControls}>
		<p>Price : <strong>{props.price.toFixed(2)}</strong></p>
		{controls.map(ctrl =>(
		 	<BuildControl
				ingredientAdded={()=>props.ingredientAdded(ctrl.type)}
				ingredientRemoved={()=>props.ingredientRemoved(ctrl.type)}
				label={ctrl.label}
				key={ctrl.type}
			    disabled={props.disabled[ctrl.type]}
				
			/>
		))}
		<button disabled={props.purchaseable}
				className={classes.OrderButton}
				onClick={props.ordered}>ORDER NOW</button>
	</div>
);
   

export default buildControls;