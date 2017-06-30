class API {
  static async geoCode(address){
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_TOKEN_GEOCODE}`;
    let response = await fetch(url);
    let json = await response.json();
    return json.results[0].geometry.location;
  }

  static async matrix(start, destination){
	  try{
    let url = "http://localhost:8000";
    let response = await fetch(url, 
          {method: 'GET',
          headers: {
            'start': start,
            'destination': destination
          }
        });
    let json = await response.json();
    // await console.log(json);
    //let output = JSON.stringify(json);
    return json;
  }
  catch(error){
    console.log(error);
  }
}

  static async fareEstimate(duration, distance){
  		//Average Price for an UberX in USD
  		var initialPrice=.4;
  		var serviceCost=1.58;
  		var priceMilage=((distance/1606.1565217391)*.97);
  		var priceDuration=(duration/60)*.14;
  		var price = initialPrice + serviceCost + priceMilage + priceDuration;
  		return price.toFixed(2);
  }

 /* static async uberAPI(){
	let response = fetch("https://api.uber.com/v1.2/estimates/price?start_latitude=37.7752315&start_longitude=-122.418075&end_latitude=37.7752415&end_longitude=-122.518075", {
	  		header: {
	    	"Accept-Language": "en_US",
	   		 "Authorization": `${process.env.REACT_APP_UBER_API}`,
	    	"Content-Type": "application/json"
	  	}
		});
	let json = await response.json();
	return json;
  } */

}

export default API;