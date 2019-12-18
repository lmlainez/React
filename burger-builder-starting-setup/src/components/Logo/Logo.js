import React from 'react';
import classes from './Logo.css';

import burgerLogo from '../../assets/images/burger-logo.png';

const logo = (props) => (
	
	<div>
		<img className={classes.Logo} src={burgerLogo} alt="MyBurger"/>
	</div>
	
);


export default logo;