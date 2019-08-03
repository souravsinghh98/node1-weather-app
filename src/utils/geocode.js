const request=require('request')

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic291cmF2MTk5OCIsImEiOiJjanlvNGY4Zm4xMHd5M2RvOWVvYXd3YTIzIn0.F9x_P9Ymy22713UJbJyZKA&limit=1'
    request({url:url,json:true},(error,response)=>{
      if(error)
      {
        callback('Unable to connect to location services',undefined)
      }
      else if(response.body.features.length===0)
      {
        callback('Unable to find location.Try another search!',undefined)
  
      }
      else{
        callback(undefined,{
          latitude:response.body.features[0].center[0],
          longitude:response.body.features[0].center[1],
          location:response.body.features[0].place_name
        })
      }
    })
  
  
  }

  module.exports=geocode