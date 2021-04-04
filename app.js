let apiKey = '78143e709d4093268bfac14691b1a091';
let searchInput = $('.searchInput');
let searchBtn = $('.searchBtn');
//search 
let cityNamed = $('.cityName');
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

// itemHistory changed name to searchHistory
if(JSON.parse(localStorage.getItem('searchHistory')) === null) {
    console.log('history not found')
} else {
    console.log('history loaded');
    getHistory();
}

searchBtn.on('click', function(x) {
    x.preventDefault();
    if(searchInput.val() === '') {
        alert('Required: Enter City');
        return;
    }
    console.log('btn clicked')
    getWeather(searchInput.val());
});

$(document).on('click', '.historyEnter', () => {
    console.log('clicked on item history')
    let thisElem = $(this);
    getWeather(thisElem.text());
})

function getHistory(cityName) {
    itemHistory.empty();
    let historyArr = JSON.parse(localStorage.getItem('searcHistory'));
    for(let i = 0; i < historyArr.length; i++) {
        let newListItem = $('<li>').attr('class', 'historyEnter');
        newListItem.text(historyArr[i]);
        historyArr.prepend(newListItem);
    }
}


function getWeatherData(cityName, cityTemp, cityHumidity, cityWindSpeed, cityWeatherIcon, uvVal) {
    cityNamed.text(cityName);
    currDate.text(`(${today})`);
    temp.text(`Temperature: ${cityTemp} °F`);
    humidity.text(`Humidity: ${cityHumidity}%`);
    windSpeed.text(`Wind Speed: ${cityWindSpeed} MPH`);
    uvIndex.text(`UV Index: ${uvVal}`);
    weatherIcon.attr('src', cityWeatherIcon);
}


function getWeather() {}
function getWeekForecast() {}
function forecastCards() {}
