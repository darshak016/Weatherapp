const request = require('request')
const constants = require('../config')

const weatherdata = (address,callback)=>{
    const url = constants.OpenWeatherMap.BaseURL + encodeURIComponent(address) + '&appid=' + constants.OpenWeatherMap.SecretKey
    console.log(url)
    request({url, json:true},(err,{body})=>{
        if(err){
            callback('Error',undefined)
        }else if(!body.main || !body.main.temp || !body.name || !body.weather){
            callback('Unable to fetch data',undefined)
        }
        else{
            callback(undefined,{
                temp: body.main.temp,
                min_temp: body.main.temp_min,
                max_temp: body.main.temp_max,
                description: body.weather[0].description,
                city: body.name
            })
        }
    })
}
module.exports = weatherdata