import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import axios from '../../../axios-orders';
import classes from './ContactData.css';

class ContactData extends Component{
	state = {
		name:'',
		email: '',
		address: {
			street:'',
			postalCode: ''
		},
		loading:false
	}
	
	orderHandler =  (event) => {
		event.preventDefault();
		console.log(this.props.ingredients);
		this.setState({loading:true})
		
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {name:'Luismi',
				address:{
					street:'Test Street1',
					zipCode:'2010',
					country:'Australia'
				},
				email:'luisTest@mail.com'
			}
		}
		
		axios.post("/orders.json",order)
			.then((response) =>{
				this.setState({loading:false});
				this.props.history.push("/")
			})
			.catch((error)=>{
					this.setState({loading:false});
				}
			);
	}
	
	
	render() {
		let form = (
			<form>
				<input className = {classes.Input} type="text" name="name" placeholder="Your Name"/>
				<input className = {classes.Input} type="email" name="email" placeholder="Your Email"/>
				<input className = {classes.Input} type="text" name="street" placeholder="Street"/>
				<input className = {classes.Input} type="text" name="postal" placeholder="Postal Code"/>
				<Button clicked= {this.orderHandler} btnType="Success" >Order</Button>
			</form>
		)
		if(this.state.loading){
			form = <Spinner/>
		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter your contact data</h4>
				{form}
			</div>
		)
	}
}
export default ContactData;