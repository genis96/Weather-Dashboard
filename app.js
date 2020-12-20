let apiKey = '78143e709d4093268bfac14691b1a091';
let searchInput = document.querySelector('.searchInput');
let searchBtn = document.querySelector('.searchBtn');
//get days/days/year
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let month = String(today.getMonth() + 1).padStart(2, '0');
let year = today.getFullYear();
let today = mm + '/' + dd + '/' + yyyy;
//rest of selectors
let itemHistory = document.getElementsByClassName('itemHistory');
let cityName = document.getElementsByClassName('cityName');
let currDate = document.getElementsByClassName('currDate');
let weatherIcon = document.getElementsByClassName('weatherIcon');
let temp = document.getElementsByClassName('temp');
let humidity = document.getElementsByClassName('humidity');
let windSpeed = document.getElementsByClassName('windSpeed');
let uvIndex = document.getElementsByClassName('uvIndex');
let cardRow = document.getElementsByClassName('card-row');

//create functions 
//if statement for localStorage where I have to parse the data

if(JSON.parse(localStorage.getItem('itemHistory')) === null) {}

searchBtn.on("click", function(x) {
    x.preventDefault();
    if(searchInput.val() === '') {
        alert('Required: Enter City');
        return;
    }
    console.log('working??')
    getWeatherCity(searchInput.val());
});

$(document).on("click", ".historyEnter", () => {
    console.log('clicked on item history')
    let thisElem = $(this);
    getWeatherCity(thisElem.text());
})

function getHistory() {}
function getWeatherData() {}
function getWeatherCity() {}
function getWeekForecast() {}
function forecastCards() {}
