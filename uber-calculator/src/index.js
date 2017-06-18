import React from 'react';
import ReactDOM from 'react-dom';
import API from './API';
import './index.css';

class AddressForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			address: {
				origin: null,
				destination: null
			}
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async handleSubmit(event){
		this.setState({
			address:{
				origin: this.originInput.value,
				destination: this.destinationInput.value
			}
		});
		event.preventDefault();
		let latLngOrigin = await API.geoCode(this.state.address.origin);
		let latLngDestination = await API.geoCode(this.state.address.destination);
		console.log(latLngOrigin);
		console.log(latLngDestination);
	}

	render(){
		return(
			<div>
				<form onSubmit= {this.handleSubmit}>
					Origin:
					<input type = "text" ref={(ref) => this.originInput = ref} /> 		
					<br />
					Destination:
					<input type = "text" ref={(ref) => this.destinationInput = ref} />
					<br />
					<input type="submit" value="Submit" />
				</form>
				{outputFare(this.state.address)}
			</div>
			);
	}
}

// function outputFare(address){
// 	if(address.origin == null || address.destination == null){
// 		return <p> No input </p>;
// 	}
// 	else{
// 		return <p> Addresses: {getFareEstimate(address)} </p>;
// 	}
// }

ReactDOM.render(
	<div>
		<h1> Uber Fare Calculator </h1>
		<AddressForm />
	</div>,
	document.getElementById('root'));
