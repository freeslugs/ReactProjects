var fetch = require('node-fetch');

const express = require('express');
const app = express();


app.get('/', async function(req, res){
	try{
		let url = "http://localhost:8000";
		let response = await fetch(url, 
					{method: 'GET',
					headers: {
						'origin': '54 East 92nd Street',
						'destination': '75th and park'
					}
				});
		let json = await response.json();
		await console.log(json);
		let output = JSON.stringify(json);
		await res.send(`Server Data: ${output}`);
	}
	catch(error){
		console.log(error);
	}
});

app.listen(3000, function(){
	console.log('Running on port 3000');
});