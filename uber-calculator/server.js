var fetch = require('node-fetch');

const express = require('express');
const app = express();

require('dotenv').config();

var start = null;
var destination = null;

app.use(function (req, res, next) {
	start = req.headers['start'];
	destination = req.headers['destination'];

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'origin, destination, start');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});



app.get('/', async function(req, res){
	try{
		let url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${start}&destinations=${destination}&mode=driving&language=en-EN&key=${process.env.REACT_APP_GOOGLE_TOKEN_MATRIX}`;
		let response = await fetch(url);
		let json = await response.json();
		
		let duration = json.rows[0].elements[0].duration.value;
		let durationString = JSON.stringify(duration);
		
		let distance = json.rows[0].elements[0].distance.value;
		let distanceString = JSON.stringify(distance);

		let generatedAddresses = {
			start: `${json.origin_addresses}`,
			destination: `${json.destination_addresses}`
		};
		
		console.log(generatedAddresses);

		let output = {
					'distance': `${distanceString}`, 
					'duration': `${durationString}`,
					'generatedAddresses': generatedAddresses
					};

		console.log("JSON loaded");
		await res.send(output);
		console.log("Data sent");
		console.log(`Headers – Start: ${start}; Destination: ${destination}`);
	}
	catch(error){
		console.log(error);
	}
});

app.listen(8000, function(){
	console.log('Running on port 8000');
});