

var fetchWeather = "/weather"

const weatherform = document.querySelector('form')
const search = document.querySelector('input')

const weathericon = document.querySelector('img')
weathericon.style.display = "none"
const city = document.querySelector('.city')
const weathercondition = document.querySelector('.weather-condition')
const temp = document.querySelector('.temp')
const mintemp = document.querySelector('.min-temp')
const maxtemp = document.querySelector('.max-temp')
const date = document.querySelector('.date')

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
date.textContent = new Date().getDate() + ' ' + months[new Date().getMonth()].substring(0,3)

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault();
    const locationapi = fetchWeather + "?address=" + search.value
    console.log(locationapi)
     fetch(locationapi).then(response => {
         response.json().then(data => {
             if(data.error){
                 city.textContent = data.error
             }else{
             console.log(data)
                city.textContent = data.city
                temp.textContent = (data.temp - 273.5).toFixed(2) + String.fromCharCode(176)
                weathercondition.textContent = data.description
                mintemp.textContent = (data.min_temp - 273.5).toFixed(2) + String.fromCharCode(176) + '/'
                maxtemp.textContent = (data.max_temp - 273.5).toFixed(2) + String.fromCharCode(176)
                weathericon.style.display = "block"
                weathericon.src = '../img/' + weathercondition.textContent +'.png'
             }
         }) 
     });
})