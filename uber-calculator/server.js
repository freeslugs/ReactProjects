//Problems:
//Token is undefined --> can't connect to .env file
//serverTest.js can't pull the res.send value

var fetch = require('node-fetch');

const express = require('express');
const app = express();




app.get('/', async function(req, res){
	try{
		let url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=NYC&destinations=Times%20Square&mode=driving&language=en-EN&key=${process.env.REACT_APP_GOOGLE_TOKEN_MATRIX}`;
		let response = await fetch(url);
		let json = await response.json();
		let output = json.rows[0].elements[0].duration.value;
		let outputString = JSON.stringify(output);
		console.log("JSON loaded");
		res.send(outputString);
		console.log("Data sent");
		console.log(req.headers['addresses']);
	}
	catch(error){
		console.log(error);
	}
});

app.listen(8000, function(){
	console.log('Running on port 8000');
});