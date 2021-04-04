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

if(JSON.parse(localStorage.getItem('itemHistory')) === null) {
    console.log('history not found')
} else {
    console.log('history loaded');
    getHistory();
}

searchBtn.on("click", function(x) {
    x.preventDefault();
    if(searchInput.val() === '') {
        alert('Required: Enter City');
        return;
    }
    console.log('working??')
    getWeather(searchInput.val());
});

$(document).on('click', '.historyEntry', () => {
    console.log('clicked on item history')
    let thisElem = $(this);
    getWeather(thisElem.text());
})

function getHistory(cityName) {
    itemHistory.empty();
    let historyArr = JSON.parse(localStorage.getItem('itemHistory'));
    for(let i = 0; i < historyArr.length; i++) {
        let newListItem = $('<li>').attr('class', 'historyEntry');
        newListItem.text(historyArr[i]);
        historyArr.prepend(newListItem);
    }
}


function getWeatherData() {}
function getWeather() {}
function getWeekForecast() {}
function forecastCards() {}
