var fetch = require('node-fetch');

const express = require('express');
const app = express();


app.get('/', async function(req, res){
	try{
		let url = "http://localhost:8000";
		let response = await fetch(url, 
					{method: 'GET',
					headers: {
						'addresses': "NYC"
					}
				});

		res.send(response);
	}
	catch(error){
		console.log(error);
	}
});

app.listen(3000, function(){
	console.log('Running on port 3000');
});