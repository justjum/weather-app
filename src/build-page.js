export { buildPage, displayCurrent, displayFuture };

function buildPage() {
    const content = document.getElementById("content");
    content.innerHTML = `
        <div class="navbar" id="navbar">
            <h1>Where are you going?</h1>
            <input type="textbox" class="location" id="location">
            <button type="submit" class="search-button" id="search-button">Search</button>
        </div>
        <div class="forecast" id="forecast">
            <div class="current" id="current"></div>
            <div class="future" id="future"></div>   
        </div>
        `;
}

function displayCurrent(city, temperature) {
    const current = document.getElementById("current");
    current.innerHTML = `
        <h1>${city}</h1>
        <h2>${temperature}&degC</h2>
    `
}

function displayFuture(t0, c0, t1, c1, t2, c2) {
    const future = document.getElementById("future")
    future.innerHTML = `
        <div class="day-table" id="today-table"><h3>${t0}&degC</h3><h3>${c0}</h3></div>
        <div class="day-table" id="tomorrow-table"><h3>${t1}&degC</h3><h3>${c1}</h3></div>
        <div class="day-table" id="tomorrow-tomorrow-table"<h3>${t2}&degC</h3><h3>${c2}</h3>
    `
}