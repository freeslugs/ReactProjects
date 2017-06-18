class API {
  static async geoCode(address){
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_TOKEN}`;
    let response = await fetch(url);
    let json = await response.json();
    return json.results[0].geometry.location;
  }

  static fareEstimate(address){
    // call uber api
  }

}

export default API;
