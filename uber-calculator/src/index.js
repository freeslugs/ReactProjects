// API Key Google: AIzaSyC3bJ2vwET_bqUOaa5kzlkQ1_Dodn8YAAs

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class AddressForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			address: {
				firstDestination: null,
				lastDestination: null
			}
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event){
		this.setState({
			address:{
				firstDestination: this.firstDestinationInput.value,
				lastDestination: this.lastDestinationInput.value
			}
		});
		event.preventDefault();
	}

	render(){
		return(
			<div>
				<form onSubmit= {this.handleSubmit}>
					First Destination:
					<input type = "text" ref={(ref) => this.firstDestinationInput = ref} /> 		
					<br />
					Last Destination:
					<input type = "text" ref={(ref) => this.lastDestinationInput = ref} />
					<br />
					<input type="submit" value="Submit" />
				</form>
				{outputFare(this.state.address)}
			</div>
			);
	}
}

function geoCode(address){
	var latLong= this.serverRequest
				.get("https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyC3bJ2vwET_bqUOaa5kzlkQ1_Dodn8YAAs")
				.then(function(result){

				});
}

function getFareEstimate(address){
	return address.firstDestination + ' + ' + address.lastDestination;
}

function outputFare(address){
	if(address.firstDestination == null || address.lastDestination == null){
		return <p> No input </p>;
	}
	else{
		return <p> Addresses: {getFareEstimate(address)} </p>;
	}
}

// <Greeting />

ReactDOM.render(
	<div>
		<h1> Uber Fare Calculator </h1>
		<AddressForm />
	</div>,
	document.getElementById('root'));
