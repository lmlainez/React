import React, {Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component{
	
  state = {
	purchaseable:false,
	purchasing:false,
	loading:false,
	error:false
  };
  
  //Disable this as we are not goign to handle this in this project yet
  /*
  componentDidMount(){
	axios.get("/ingredients.json")
		.then((response) => {
			this.setState({ingredients:response.data})
  		}).catch((error)=>{
		
		// this.setState({error:true})
		//if there is no netwrok, we'll need to set up the igredients by hand, to keep on working.
			this.setState({ingredients:{
				salad:2,
				meat:1,
				cheese:0,
				bacon:1
			}})
		});
  }
  */
  
  purchaseHandler= ()=>{
	  this.setState({purchasing:true});
  };
  purchaseCancelHandler = (props) =>{
		this.setState({purchasing:false});
  };
  purchaseContinueHandler = (props) => {
	 // this.props.history.push('/checkout');
	  const queryParams= [];
	  for(let i in this.props.ings){
		  queryParams.push(encodeURIComponent(i)+"="+encodeURIComponent(this.props.ings[i]));
	  }
	  queryParams.push('price='+this.props.price)
	  const queryString = queryParams.join('&')
	  this.props.history.push({
		  pathname:'/checkout',
		  search:'?'+queryString
	  });
  };
  updatePurchaseState(updatedIngredients){
	  const ingredients = updatedIngredients;
	  const sum =Object.keys(ingredients)
		  .map(igKey=>{
		  	return ingredients[igKey];
		  })
		  .reduce((sum,el)=>{
			  return sum+el;
		  },0);
	  return sum > 0;
  }

  render(){
	  
	const disabledInfo={
		...this.props.ings
	};
	for(let key in disabledInfo){
		disabledInfo[key] = disabledInfo[key]<=0;
	}
	

    let orderSummary = null;
	  
	
	  let burger = this.state.error ? <p>The ingredients can't be loaded</p> : <Spinner/>
	  if(this.props.ings != null) {
		  burger = (
			  <Aux>
				  <Burger ingredients={this.props.ings}/>
				
				  <BuildControls ingredientAdded={this.props.onIngredientAdded}
								 ingredientRemoved={this.props.onIngredientRemoved}
								 disabled={disabledInfo}
								 price={this.props.price}
								 purchaseable={!this.updatePurchaseState(this.props.ings)}
								 ordered={this.purchaseHandler}/>
			  </Aux>
		  )
		
		  orderSummary =  <OrderSummary ingredients={this.props.ings}
										   purchaseCancelled={this.purchaseCancelHandler}
										   purchaseContinued={this.purchaseContinueHandler}
										   price={this.props.price} />
	  }
	  
	  if(this.state.loading){
		  orderSummary = <Spinner/>
	  }
	  
	
    return (
		<Aux>
			<Modal show={this.state.purchasing}
			  modalClosed={this.purchaseCancelHandler}>
			  {orderSummary}
		 	 </Modal>
			 {burger}
		</Aux>
			
	  );
	}
	
	
}

const mapStateToProps = state => {
	return {
		ings: state.ingredients,
		price : state.totalPrice
	}
}
const mapDispatchToProps = dispatch => {
	return{
		onIngredientAdded: (ingName) => dispatch({type:actionTypes.ADD_INGREDIENT, ingredientName:ingName}),
		onIngredientRemoved: (ingName) => dispatch({type:actionTypes.REMOVE_INGREDIENT, ingredientName:ingName})
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));