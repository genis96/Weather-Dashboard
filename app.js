let apiKey = '78143e709d4093268bfac14691b1a091';
let searchInput = $('.searchInput');
let searchBtn = $('.searchBtn');
//search 
let cityName = $('.cityName');
let currDate = $('.currDate');
let weatherIcon = $('.weatherIcon');
let itemHistory = $('.itemHistory');
// results
let temp = $('.temp');
let humidity = $('.humidity');
let windSpeed = $('.windSpeed');
let uvIndex = $('.uvIndex');
let cardRow = $('.card-row');

//get days/days/year
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();
let today = mm + '/' + dd + '/' + yyyy;

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
