// var promise = new Promise(function(resolve, reject){
//   var error = "nope";
  
//   if(error == "nope"){
//     resolve("[1, 2, 3, 4]");
//   }
//   else{
//     reject(Error("It broke"));
//   }
// });

// promise.then(function(result){
//   console.log(result);},
//   function(err){
//     console.log(err);
// });

function promisingOperation() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            if( Math.round(Math.random())){
                resolve('Success!');
              }
            else{
                reject('Failure!');
              }
        }, 1000);
    });
}
 
async function foo() {
    var message = await promisingOperation();
    console.log(message);
}