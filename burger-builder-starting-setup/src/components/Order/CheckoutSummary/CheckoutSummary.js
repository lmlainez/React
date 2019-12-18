import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
	
	return (
		<div className={classes.CheckoutSummary}>
			<h1>We hope it tastes well! </h1>
			<div style={{width:'100%',  margin:'auto'}}>
				<Burger ingredients={props.ingredients} />
			</div>
			<div>
				<Button clicked={props.onCheckoutCancel} btnType="Danger" >CANCEL</Button>
				<Button clicked={props.onCheckoutContinued}  btnType="Success" >CONTINUE</Button>
			</div>
		</div>
		
	)
}
export default checkoutSummary;