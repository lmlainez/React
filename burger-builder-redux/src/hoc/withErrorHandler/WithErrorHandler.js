import React,{Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux';

/**
 * We create a wrapper for Axios Error Handling in which, if there any issue with errors, we need to
 * show a modal saying that there was something wrong. In order to do that, we will simply create the interceptors
 * for Axios errors and render a modal describing the error AND then render the component that it is wrapping.
 * This is used not as JSX but as a method, in BurgerBuilder.js.
 * @param WrappedComponent
 * @param axios
 * @returns {{}}
 */
const withErrorHandler = (WrappedComponent, axios) =>{
	return class extends Component{
		
		state = {
			error:null
		}
		
		componentWillMount(){
			//We can create variables on the fly
			this.reqInterceptor = axios.interceptors.request.use(req=>{
				this.setState({error:null});
				
				return req;
			})
			this.respInterceptor = axios.interceptors.response.use(res => res, error => {
				this.setState({error:error})
				console.log("Error" , error)
			})
		}
		
		//Cleanup interceptors that will not be needed anymore
		componentWillUnmount(){
			axios.interceptors.request.eject(this.reqInterceptor);
			axios.interceptors.response.eject(this.respInterceptor);
		}
		
		errorConfirmedHandler = () =>{
			this.setState({error:null});
		}
		render(){
			return (
				<Aux>
					<Modal show={this.state.error != null}
					    modalClosed={this.errorConfirmedHandler}>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
				
				</Aux>
			);
		}
	}
	
}
export default withErrorHandler;