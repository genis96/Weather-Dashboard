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


function getWeather(chosenCity) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${chosenCity}&APPID=${apiKey}&units=imperial`;
    $.ajax({
        url: apiUrl,
        method: 'GET'
    }).then(function(data) {
        let cityDataObj = {
            cityName: data.name,
            cityTemp: data.main.temp,
            cityHumidity: data.main.humidity,
            cityWindSpeed: data.wind.speed,
            cityUv: data.coord,
            cityWeatherIconName: data.weather[0].icon
        }

        let apiUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${cityDataObj.cityUv.lat}&lon=${cityDataObj.cityUv.lon}&APPID=${apiKey}&units=imperial`
        $.ajax({
            url: apiUrl,
            method: 'GET'
        }).then(function(uvData) {
            if(JSON.parse(localStorage.getItem('searchHistory')) == null) {
                let historyArr = [];

            }
        })
    })
}

// getWeekForecast();
function getWeekForecast() {
    cardRow.empty();
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${chosenCity}&APPID=${apiKey}&units=imperial`;
    $.ajax({
        url: apiUrl,
        method: 'GET'
    }).then(function(fiveDayForecast) {
        for(let i = 0; i != fiveDayForecast.list.length; i+=8) {
            let cityDataObj = {
                date: fiveDayForecast.list[i].dt_txt,
                icon: fiveDayForecast.list[i].weather[0].icon,
                temp: fiveDayForecast.list[i].main.temp,
                humidity: fiveDayForecast.list[i].main.humidity
            }
        }
    })
}


function forecastCards(date, icon, temp, humidity) {
    let weeklyCard = $('<div>').attr('class', 'five-day-card');
    let cardDate = $('<h3>').attr('class', 'card-text');
    let cardIcon = $('<img>').attr('class', 'iconWeather');
    let cardTemp = $('<p>').attr('class', 'card-text');
    let cardHumidity = $('<p>').attr('class', 'card-text');

    cardRow.append(fiveDayCard);
    cardDate.text(date);
    cardIcon.attr('src', icon);
    cardTemp.text(`Temp: ${temp} °F`);
    cardHumidity.text(`Humidity: ${humidity}%`);
    weeklyCard.append(cardDate, cardIcon, cardTemp, cardHumidity);   
}
