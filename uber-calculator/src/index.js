import React from 'react';
import ReactDOM from 'react-dom';
import API from './API';
import './index.css';

class AddressForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			fare: null,
			generatedAddresses:{
				start: null,
				destination: null
			},
			iframe: null,
			weather: {
				start: null,
				destination: null
			}
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}
	

	async handleSubmit(event){
		//const iframe = `<iframe width="400" height="400" src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyDKAHBiaEKc8P5qZzvl7d_PJqMKSermmag&#10;&amp;origin=${NYC}&amp;destination=NYT" allowFullScreen="" />`;
		var getOuput = await fareOutput(this.startInput.value, this.destinationInput.value, event);
		
		console.log("START VALUE: " + this.startInput.value);
		console.log("DESTINATION VALUE: " + this.destinationInput.value);

		var generatedStartAddress = getOuput.generatedAddresses.start;
		var generatedDestinationAddress = getOuput.generatedAddresses.destination;

		var startWeather = await API.weather(`${generatedStartAddress}`);
		var destinationWeather = await API.weather(`${generatedDestinationAddress}`);


		this.setState({
			fare: `$${getOuput.fare}`,
			generatedAddresses:{
				start: `${generatedStartAddress}`,
				destination: `${generatedDestinationAddress}`
			},
			iframe: `<iframe width="400" height="400" src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyDKAHBiaEKc8P5qZzvl7d_PJqMKSermmag&#10;&amp;origin=${getOuput.generatedAddresses.start}&amp;destination=${getOuput.generatedAddresses.destination}" allowFullScreen="" />`,
			weather: {
				start: `): ${startWeather}`,
				destination: `): ${destinationWeather}`
			}
		});
	}

	render(){
		
		var mapIframe = this.state.iframe;

		if(this.state.fare != null){
			var outputHeader = "Output:",
			fareHeader = "Fare:",
			addressesHeader = "Addresses: ",
			startHeader = "Start: ",
			destinationHeader = "Destination: ",
			weatherHeader = "Weather On Route: ",
			weatherStartHeader = "Start: (",
			weatherDestinationHeader = "Destination: (";
		}
		else{
			var outputHeader, fareHeader, addressesHeader, startHeader, destinationHeader, weatherHeader, weatherDestinationHeader, weatherStartHeader;
		}

		return(
			<div>
				<form onSubmit= {this.handleSubmit}>
					Start:
					<input type = "text" ref={(ref) => this.startInput = ref} /> 		
					<br />
					Destination:
					<input type = "text" ref={(ref) => this.destinationInput = ref} />
					<br />
					<input type="submit" value="Submit" />
				</form>
				<br />
				<h2>{outputHeader}</h2>
				<p align="left"> 
					<b> {fareHeader} </b>{this.state.fare}  <br />
					<b> {addressesHeader} </b> <br />
					
					&nbsp;&nbsp;&nbsp;&nbsp;
					<b>{startHeader}</b>
					{this.state.generatedAddresses.start} <br />

					&nbsp;&nbsp;&nbsp;&nbsp;
					<b>{destinationHeader}</b>
					{this.state.generatedAddresses.destination}
				</p>
					<div dangerouslySetInnerHTML={{__html: mapIframe}} />

					<br />
					<br />
				<h2> {weatherHeader} </h2>
				<p align="left">
					&nbsp;&nbsp;&nbsp;&nbsp;
					<b> {weatherStartHeader}</b>{this.state.generatedAddresses.start}{this.state.weather.start} <br />

					&nbsp;&nbsp;&nbsp;&nbsp;
					<b> {weatherDestinationHeader}</b>{this.state.generatedAddresses.destination}{this.state.weather.destination}
				</p>
			</div>
			);
	}
}

async function fareOutput(start, destination, event){
		try{
			await event.preventDefault();
			var GoogleMatrix = await API.matrix(start, destination);	

			if(GoogleMatrix.distance == 0){
				var errorMessage = "Addresses are not valid, please put in valid or different addresses";
				return errorMessage;
			}
			else{
				var fareValue = await API.fareEstimate(GoogleMatrix.duration, GoogleMatrix.distance);
				var output = {
					'fare': fareValue,
					'generatedAddresses': GoogleMatrix.generatedAddresses
				};
				return output;
			}
		}
		catch(error){
			console.log(error);
			return "Addresses are not valid, please put in valid addresses.";
		}
}


ReactDOM.render(
	<div>
		<h1> Uber Fare Calculator </h1>
		<AddressForm />
	</div>,
	document.getElementById('root'));
