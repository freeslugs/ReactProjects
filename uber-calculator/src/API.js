class API {
  static async geoCode(address){
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_TOKEN_GEOCODE}`;
    let response = await fetch(url);
    let json = await response.json();
    return json.results[0].geometry.location;
  }

  static async matrix(){
	  try{
		    // let url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=54%20East%2092nd%20Street&destinations=Times%20Square&mode=driving&language=en-EN&key=${process.env.REACT_APP_GOOGLE_TOKEN_MATRIX}`;
			let url = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=54%20East%2092nd%20Street&destinations=Times%20Square&mode=driving&language=en-EN&key=AIzaSyAqtshuX8bnlNjupHCH2YkH1dOgc8RxssQ";
			let response = await fetch(url);
			let json = await response.json();
			return json.rows[0].elements[0].distance.value;
		}
		catch(error){
			console.log("error");
		}

  }

  static async fareEstimate(duration, distance){
  		//Average Price for an UberX in USD
  		var initialPrice=.4;
  		var serviceCost=1.58;
  		var priceMilage=(distance*.97);
  		var priceDuration=duration*.14;
  		var price = initialPrice + serviceCost + priceMilage + priceDuration;
  		return price;
  }

}

export default API;