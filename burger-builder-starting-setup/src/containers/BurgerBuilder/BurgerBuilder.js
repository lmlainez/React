import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';

const INGREDIENT_PRICES = {
	salad:0.5,
	cheese:0.4,
	meat:1.3,
	bacon:0.7
};
class BurgerBuilder extends Component{
	
  state = {
	ingredients:null,
	totalPrice:4,
	purchaseable:false,
	purchasing:false,
	loading:false,
	error:false
  };
  
  componentDidMount(){
	axios.get("/ingredients.json")
		.then((response) => {
			this.setState({ingredients:response.data})
  		}).catch((error)=>{
		this.setState({error:true})
		});
  }
  
  purchaseHandler= ()=>{
	  this.setState({purchasing:true});
  };
  purchaseCancelHandler = (props) =>{
		this.setState({purchasing:false});
  };
  purchaseContinueHandler = (props) => {
	 // this.props.history.push('/checkout');
	  const queryParams= [];
	  for(let i in this.state.ingredients){
		  queryParams.push(encodeURIComponent(i)+"="+encodeURIComponent(this.state.ingredients[i]));
	  }
	  queryParams.push('price='+this.state.totalPrice)
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
	  this.setState({purchaseable: sum>0});
  }
  addIngredientHandler = (type)=>{
	  const oldCount = this.state.ingredients[type];
	  const updatedCounted = oldCount +1;
	  const updatedIngredients ={
		  ...this.state.ingredients
	  };
	  updatedIngredients[type]= updatedCounted;
	  const oldPrice = this.state.totalPrice;
	  const newPrice = oldPrice +INGREDIENT_PRICES[type];
	  this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
	  this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
	  this.updatePurchaseState(updatedIngredients);
  };
  removeIngredientHandler = (type)=>{
	  const oldCount = this.state.ingredients[type];
	  if(oldCount <=0 ) return;
	  const updatedCounted = oldCount -1;
		const updatedIngredients ={
			...this.state.ingredients
		};
		updatedIngredients[type]= updatedCounted;
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice -INGREDIENT_PRICES[type];
		this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
	  this.updatePurchaseState(updatedIngredients);
  };
  
  render(){
	  
	const disabledInfo={
		...this.state.ingredients
	};
	for(let key in disabledInfo){
		disabledInfo[key] = disabledInfo[key]<=0;
	}
	

    let orderSummary = null;
	  
	
	  let burger = this.state.error ? <p>The ingredients can't be loaded</p> : <Spinner/>
	  if(this.state.ingredients != null) {
		  burger = (
			  <Aux>
				  <Burger ingredients={this.state.ingredients}/>
				
				  <BuildControls ingredientAdded={this.addIngredientHandler}
								 ingredientRemoved={this.removeIngredientHandler}
								 disabled={disabledInfo}
								 price={this.state.totalPrice}
								 purchaseable={!this.state.purchaseable}
								 ordered={this.purchaseHandler}/>
			  </Aux>
		  )
		
		  orderSummary =  <OrderSummary ingredients={this.state.ingredients}
										   purchaseCancelled={this.purchaseCancelHandler}
										   purchaseContinued={this.purchaseContinueHandler}
										   price={this.state.totalPrice} />
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

export default withErrorHandler(BurgerBuilder,axios);