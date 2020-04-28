const request = require('request');

const geocode = (address,callback)=>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicnVwZXNoLWJoYWdhdCIsImEiOiJjazlhY3JtY2IwYWI0M2ZvaWdzNXpyZGplIn0.uVSqCpB8rVJaSeBTrEFr3w&limit=1';
    request({url,json:true},(error,{ body })=>{
      if(error){
        callback('Unable to connect weather app', undefined);
      }else if(body.features.length === 0){
        callback('Please specify a valid location identifier using the query parameter.', undefined);
      }else{
        callback(undefined,{
          longitude:body.features[0].center[0],
          latitude:body.features[0].center[1],
          location:body.features[0].place_name   
        })
      }
    })
  }
  
module.exports = geocode;