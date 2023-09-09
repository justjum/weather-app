import './style.css'
import { displayCurrent, displayFuture, buildPage } from './build-page.js'

let errorBox = false;
let greyout = false;

//build main containers in HTML
buildPage();

// function to activate greyout
function greySwitch() {
    const greyOut = document.getElementById("grey-out");
    greyout ? greyOut.setAttribute("style", "display: none"): greyOut.setAttribute("style", "display: flex");
    greyout = !greyout;
}

function errorViewSwitch() {
    greySwitch();
    const errorDisplay = document.getElementById("error-box");
    console.log("this");
    errorBox ? errorDisplay.setAttribute("style", "display: none"): errorDisplay.setAttribute("style", "display: flex");
    errorBox = !errorBox
}

// function to display error popup
function displayError(error) {
    errorViewSwitch();
    const errorText = document.getElementById("error-text");
    errorText.textContent = error;
};

// function to close error popup
const okButton = document.getElementById("clear-error");
okButton.onclick = () => errorViewSwitch()


//function to fetch current weather data from api using promise
function getCurrentWeather(location) {
    fetch(`https://api.weatherapi.com/v1/current.json?key=8a9102aa8dd74b81b0652208230609&q=${location}`, {mode: 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        const city = response.location.name;
        console.log(response.location);
        const country = response.location.country;
        const currentTemp = response.current.temp_c;
        const icon = response.current.condition.icon;
        displayCurrent(city, country, currentTemp, icon);
        return;
    })
    .catch(function(error) {
        displayError("Are you sure that's a place?!");
    });
}

// function to fetch future weather data from api using async function

async function getFutureWeather(location) {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=8a9102aa8dd74b81b0652208230609&q=${location}&days=3`, {mode: 'cors'})
    const forecast = await response.json();  
    const t0 = forecast.forecast.forecastday[0].day.maxtemp_c;
    const c0 = forecast.forecast.forecastday[0].day.condition.text;
    const i0 = forecast.forecast.forecastday[0].day.condition.icon;
    const t1 = forecast.forecast.forecastday[1].day.maxtemp_c;
    const c1 = forecast.forecast.forecastday[1].day.condition.text;
    const i1 = forecast.forecast.forecastday[1].day.condition.icon;
    const t2 = forecast.forecast.forecastday[2].day.maxtemp_c;
    const c2 = forecast.forecast.forecastday[2].day.condition.text;
    const i2 = forecast.forecast.forecastday[2].day.condition.icon;
    displayFuture(t0, c0, i0, t1, c1, i0, t2, c2, i2)
};


const location = document.getElementById("location");
location.addEventListener('keyup', (e) => {

    if (e.key === 'Enter') {
        getCurrentWeather(location.value);
        getFutureWeather(location.value);
    }
})


getCurrentWeather("adelaide");
getFutureWeather("adelaide");