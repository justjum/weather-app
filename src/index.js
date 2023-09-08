import './style.css'
import { displayCurrent, displayFuture, buildPage } from './build-page.js'

//build main containers in HTML
buildPage();

//function to fetch current weather data from api using promise
function getCurrentWeather(location) {
    fetch(`https://api.weatherapi.com/v1/current.json?key=8a9102aa8dd74b81b0652208230609&q=${location}`, {mode: 'cors'})
    .then(function(response) {
        console.log(response);
        return response.json();
    })
    .then(function(response) {
        const city = response.location.name;
        const currentTemp = response.current.temp_c;
        displayCurrent(city, currentTemp);
        console.log(response.current.condition.text);
        return city
    })
    .catch(function(error) {
        console.log("error");
    });
}

// function to fetch future weather data from api using async function

async function getFutureWeather(location) {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=8a9102aa8dd74b81b0652208230609&q=${location}&days=3`, {mode: 'cors'})
    const forecast = await response.json();
    const t0 = forecast.forecast.forecastday[0].day.maxtemp_c;
    const c0 = forecast.forecast.forecastday[0].day.condition.text;
    const t1 = forecast.forecast.forecastday[1].day.maxtemp_c;
    const c1 = forecast.forecast.forecastday[1].day.condition.text;
    const t2 = forecast.forecast.forecastday[2].day.maxtemp_c;
    const c2 = forecast.forecast.forecastday[2].day.condition.text;
    displayFuture(t0, c0, t1, c1, t2, c2)
};

//function to fetch related gif from giphy using async function
const location = document.getElementById("location");
location.addEventListener('keyup', (e) => {

    if (e.key === 'Enter') {
        getCurrentWeather(location.value);
        getFutureWeather(location.value);
    }
})
