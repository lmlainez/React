import React, {Component} from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
	
	shouldComponentUpdate(nextProps, nextState){
		//We won't be re-rendering the model if we are not showing it or hiding it
		console.log("[Modal] shouldComponentUpdate ", nextProps,nextState);
		return (nextProps.show !== this.props.show) || (nextProps.children !== this.props.children);
	}
	
	componentWillUpdate(){
		console.log("[Modal] componentWillUpdate");
	}
	
	render() {
		
		return (
			<Aux>
				<Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
				
				<div
					className={classes.Modal}
					style={{
						translate: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
						opacity: this.props.show ? '1' : '0',
						zIndex: !this.props.show ? '-1' : '500'
					}}>
					{this.props.children}
				</div>
			
			</Aux>
		
		)
	}
}



export default Modal;