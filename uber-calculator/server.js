var fetch = require('node-fetch');

const express = require('express');
const app = express();

require('dotenv').config();



app.get('/', async function(req, res){
	try{
		let url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${req.headers['origin']}&destinations=${req.headers['destination']}&mode=driving&language=en-EN&key=${process.env.REACT_APP_GOOGLE_TOKEN_MATRIX}`;
		let response = await fetch(url);
		let json = await response.json();
		
		let duration = json.rows[0].elements[0].duration.value;
		let durationString = JSON.stringify(duration);
		
		let distance = json.rows[0].elements[0].distance.value
		let distanceString = JSON.stringify(distance);

		let output = {
					'distance': `${distanceString}`, 
					'duration': `${durationString}`
					};

		console.log("JSON loaded");
		await res.send(`${output}`);
		console.log("Data sent");
		console.log(`Headers – Origin: ${req.headers['origin']}; Destination: ${req.headers['destination']}`);
	}
	catch(error){
		console.log(error);
	}
});

app.listen(8000, function(){
	console.log('Running on port 8000');
});