const request = require('request');

const forecast = (latitude,longitude,callback)=>{
 const url ='http://api.weatherstack.com/current?access_key=3ea88bd7a020b1cc0a82df9e17111ddf&query='+latitude+','+longitude+'&units=f';
//  console.log(url);
request({url,json:true},(error,{body})=>{
    if(error){
        callback('Unable to connect weather app', undefined);
      }else if(body.error){
        callback('Unable to find search content', undefined);
      }else{
        callback(undefined, body.current.weather_descriptions[0] + '. It is currently'+ body.current.temperature +'°F .There is '+ body.current.precip +'% chance of rain')
      }
})

}

module.exports = forecast;
