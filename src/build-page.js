export { buildPage, displayCurrent, displayFuture };
import { compareAsc, format, parseISO, addDays } from "date-fns";

const today = new Date();

function buildPage() {
    const content = document.getElementById("content");
    content.innerHTML = `
        <div class="navbar" id="navbar">
            <h1>Where are you going?</h1>
            <input type="textbox" class="location" id="location">
            <button type="submit" class="search-button" id="search-button">Let's Go!</button>
        </div>
        <div class="forecast" id="forecast">
            <div class="current" id="current"></div>
            <div class="future" id="future"></div>   
        </div>
        <div class="popup-box" id="error-box"style="display: none"> 
            <h3 id="error-text">Insert error here</h3><br>
            <button id="clear-error">Ooops!</button>
        </div>
        `;
}

function displayCurrent(city, country, temperature, icon) {
    const current = document.getElementById("current");
    current.innerHTML = `
        <h1>${city}</h1>
        <h3>${country}</h3>
        <img src="https://${icon}" class="icon-large">
        <h3>Current: ${temperature}&degC</h3>
    `
}

function displayFuture(t0, c0, i0, t1, c1, i1, t2, c2, i2) {
    const future = document.getElementById("future")
    future.innerHTML = `
        <div class="day-table" id="today-table"><h4>${format(today, "iii dd/MM")}</h4><h3>${t0}&degC</h3><h3>${c0}</h3><img src="https://${i0}"></div>
        <div class="day-table" id="tomorrow-table"><h4>${format(addDays(today, 1), "iii dd/MM")}</h4><h3>${t1}&degC</h3><h3>${c1}</h3><img src="https://${i1}"></div>
        <div class="day-table" id="tomorrow-tomorrow-table"><h4>${format(addDays(today, 2), "iii dd/MM")}</h4><h3>${t2}&degC</h3><h3>${c2}</h3><img src="https://${i2}"></div>
    `
}