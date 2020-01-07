import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {

	state = {
		ingredients:[],
		price:0
	};
	
	componentWillMount () {
		const query = new URLSearchParams(this.props.location.search);
		let ingredients = {}
		let price = 0
		for (let param of query.entries()) {
			if(param[0] === 'price'){
				price = +param[1];
			}else{
				ingredients[param[0]] = parseInt(param[1]);
			}
		}
		this.setState({ingredients: ingredients});
		this.setState({price: price});
		
	}
	
	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	}
	
	checkoutContinuedHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	}
	
	
	render() {
		return (
			<div>
				<CheckoutSummary
					onCheckoutCancelled={this.checkoutCancelledHandler}
					onCheckoutContinued={this.checkoutContinuedHandler}
					ingredients={this.state.ingredients}
				/>
				<Route path={this.props.match.path+ "/contact-data"}
					   render={(props)=>(<ContactData ingredients={this.state.ingredients} price={this.state.price} {...props}/>) }/>
			</div>
		)
	}
	
}

export default Checkout;