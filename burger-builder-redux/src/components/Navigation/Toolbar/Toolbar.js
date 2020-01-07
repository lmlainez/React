import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import classes from './Tooolbar.css';


const toolbar = (props) => (
	
	<header className={classes.Toolbar}>
		<DrawerToggle clicked={props.drawerToggleClicked}/>
		<Logo/>
		<div className={classes.DesktopOnly}>
			<NavigationItems/>
		
		</div>
	</header>
)


export default toolbar;