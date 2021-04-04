let apiKey = '78143e709d4093268bfac14691b1a091';
let searchInput = $('.searchInput');
let searchBtn = $('.searchBtn');
//search 
let cityNamed = $('.cityName');
let currDate = $('.currDate');
let weatherIcon = $('.weatherIcon');
let itemHistory = $('.itemHistory');
// results
let tempClass = $('.temp');
let humidityClass = $('.humidity');
let windSpeedClass = $('.windSpeed');
let uvIndexClass = $('.uvIndex');
let cardRow = $('.card-row');

//get days/days/year
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();
today = mm + '/' + dd + '/' + yyyy;

//create functions 
//if statement for localStorage where I have to parse the data

if(JSON.parse(localStorage.getItem('searchHistory')) == null) {
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
    let historyArr = JSON.parse(localStorage.getItem('searchHistory'));
    for(let i = 0; i < historyArr.length; i++) {
        let newListItem = $('<li>').attr('class', 'historyEnter');
        newListItem.text(historyArr[i]);
        itemHistory.prepend(newListItem);
    }
}


function getWeatherData(cityName, cityTemp, cityHumidity, cityWindSpeed, cityWeatherIcon, uvVal) {
    cityNamed.text(cityName);
    currDate.text(`(${today})`);
    tempClass.text(`Temperature: ${cityTemp} °F`);
    humidityClass.text(`Humidity: ${cityHumidity}%`);
    windSpeedClass.text(`Wind Speed: ${cityWindSpeed} MPH`);
    uvIndexClass.text(`UV Index: ${uvVal}`);
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
                // prevent adding city more than once 
                if(historyArr.indexOf(cityDataObj.cityName) === -1) {
                    historyArr.push(cityDataObj.cityName);
                    // store and save
                    localStorage.setItem('searchHistory', JSON.stringify(historyArr));
                    let getWeatherIcon = `https:///openweathermap.org/img/w/${cityDataObj.cityWeatherIconName}.png`;
                    getWeather(cityDataObj.cityName, cityDataObj.cityTemp, cityDataObj.cityHumidity, cityDataObj.cityWindSpeed, getWeatherIcon, uvData.value);

                } else {
                    console.log('city has history now');
                    let getWeatherIcon = `https:///openweathermap.org/img/w/${cityDataObj.cityWeatherIconName}.png`;
                    getWeather(cityDataObj.cityName, cityDataObj.cityTemp, cityDataObj.cityHumidity, cityDataObj.cityWindSpeed, getWeatherIcon, uvData.value);
                    getHistory(cityDataObj.cityName);
                } 
            } else {
                let historyArr = JSON.parse(localStorage.getItem('searchHistory'));
                if(historyArr.indexOf(cityDataObj.cityName) === -1) {
                    historyArr.push(cityDataObj.cityName);
                    // store and save
                    localStorage.setItem('searchHistory', JSON.stringify(historyArr));
                    let getWeatherIcon = `https:///openweathermap.org/img/w/${cityDataObj.cityWeatherIconName}.png`;
                    getWeather(cityDataObj.cityName, cityDataObj.cityTemp, cityDataObj.cityHumidity, cityDataObj.cityWindSpeed, getWeatherIcon, uvData.value);
                    getHistory(cityDataObj.cityName);
                } else {
                    console.log('city has history now');
                    let getWeatherIcon = `https:///openweathermap.org/img/w/${cityDataObj.cityWeatherIconName}.png`;
                    getWeather(cityDataObj.cityName, cityDataObj.cityTemp, cityDataObj.cityHumidity, cityDataObj.cityWindSpeed, getWeatherIcon, uvData.value);
                }
            }
        })
    });
    getWeekForecast();

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
                let theDate = cityDataObj.date;
                let dateTrim = theDate.substring(0, 10);
                let theWeatherIcon = `https:///openweathermap.org/img/w/${cityDataObj.icon}.png`;
                forecastCards(dateTrim, theWeatherIcon, cityDataObj.temp, cityDataObj.humidity);
            }
        })
    }
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
