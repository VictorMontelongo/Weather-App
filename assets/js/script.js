const token = 'b595748ff48526d04b43f389171878b6'; var citySearchHistory = [];

// buttons
var searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", searchBtnEvent)
var buttonHistory = document.getElementById("searched-city-btn")
buttonHistory.addEventListener("click", searchBtnEvent)


// search city > get coords 
function searchBtnEvent(event) {
  var searchCity = document.getElementById("search-city-input");
  var cityName = searchCity.value;
  event.preventDefault();

  if (!cityName) {
    console.log("enter city name");
    return;
  } {
    console.log("searched city:", cityName);
  }

  searchedButton(cityName);
  getCoordinatesApi(cityName);
  saveCitySearch(cityName);

};
function searchedButton(cityName) {
  buttonHistory.append`${cityName}`
};
function saveCitySearch(cityName) {
  citySearchHistory.push(cityName);
  localStorage.setItem("searchHistory", JSON.stringify(citySearchHistory))
  // console.log(citySearchHistory);


};
JSON.parse(localStorage.getItem("searchHistory")) || [];

// get coordinates > get current weather & forecast
function getCoordinatesApi(cityName) {
  var geoURL = "https://api.openweathermap.org/geo/1.0/direct?q="
    + cityName + "&limit=1&appid=" + token + "&units=imperial";
  fetch(geoURL)
    .then(response => response.json())
    .then(data => {
      lat = data[0].lat;
      lon = data[0].lon;
      console.log("get cords from data", data);

      getWeatherApi(lat, lon)
      forecastWeather(lat, lon)
    })
    .catch(function (error) {
      console.log("failed", error);
    });
};

// get current weather using coords
function getWeatherApi(lat, lon) {
  var weatherURL = "https://api.openweathermap.org/data/2.5/weather?lat="
    + lat + "&lon=" + lon + "&appid=" + token + "&units=imperial";
  fetch(weatherURL)
    .then(response => response.json())
    .then(data => {
      console.log("data from weather api:", data);
      displayWeather(data);
    })
    .catch(function (error) {
      console.log("failed", error);

    });
};

// display current weather 
function displayWeather(data) {
  $("#city-name").html(data.name);
  $("#current-date").html(dayjs().format("MM/DD/YYYY"));
  $("#current-icon").html("https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png");
  $("#current-description").html(data.weather[0].description);
  $("#current-temp").html(data.main.humidity + "% humidity");
  $("#current-humidty").html(data.main.humidity + "% humidity");
  $("#current-wind-speed").html(data.wind.speed.toFixed(0) + " mph winds");
};

// get weather forecast then display to html
function forecastWeather(lat, lon) {
  var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat="
    + lat + "&lon=" + lon + "&appid=" + token + "&units=imperial";
  fetch(forecastURL)
    .then(response => response.json())
    .then(dataF => {
      console.log("dataF from forecast api:", dataF);

      $("#fiveDayForecast").html("")
      for (i = 6; i <= dataF.list.length; i += 7) {
        var forecastDay = `
      <card class="border p-3 shadow border-dark-subtle">
      <p class="card-text">` + dayjs(dataF.list[i].dt * 1000).format("MM/DD/YYYY") + `</p>
      <div class="card-body"><img src="https://openweathermap.org/img/wn/` + dataF.list[i].weather[0].icon + `.png"  id="icon-img">
      <div class="card-body">
                <p class="card-text">`+ dataF.list[i].main.temp.toFixed(0) + `° F</p>
                <p class="card-text">`+ dataF.list[i].main.humidity + `% humidity</p>
                <p class="card-text">`+ dataF.list[i].wind.speed.toFixed(0) + ` mph winds</p>
              </div>
            </div>
          </card>
          `
        $("#fiveDayForecast").append(forecastDay);
      }
    })
};














// populates bottom right boxes with forecasted weather conditions
// // var date = dayjs();
// var city = "";
// let citiesSaved = [];
// // var time = dayjs().format('YYYY-MM-DD HH:MM:SS');
// // var date = dayjs().format('dddd, MMMM D YYYY');
// const citySearch = document.querySelector('.search-city')
// const searchButton = document.querySelector('.search-btn')


// function currentWeather() {
//   const urlWeatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=Denver&appid=${token}`
//   console.log(urlWeatherEndpoint)
//   fetch(urlWeatherEndpoint).then(function (data) {
//     if (data.ok) {
//       return data.json()
//     }
//     // console.log(data)
//   }).then(function (weatherInfo) {
//     forecastWeather(weatherInfo.coord.lat, weatherInfo.coord.lon);
//     console.log(weatherInfo)
//   })
// }
// forecasting weather
// function forecastWeather(lat, lon) {
//   var urlWeatherForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${token}`
//   fetch(urlWeatherForecast).then(function (res) {
//     if (res.ok) {
//       return res.json()
//     }
//   }).then(function (weatherInfo) {
//     console.log(weatherInfo)
//   })
// }

// // should be for the main card display
// const createWeatherCard = (weatherInfo, index) => {
//   if (index === 0) {
//     return `<div class="details">
//       <h2>${cityName} (${weatherInfo.dt_txt.split(" ")[0]})</h2>
//       <h6>Temperature: ${(weatherInfo.main.temp - 273.15).toFixed(2)}°C</h6>
//       <h6>Wind: ${weatherInfo.wind.speed} M/S</h6>
//       <h6>Humidity: ${weatherInfo.main.humidity}%</h6>
//       </div>
//         <div class="icon">
//         <img src="https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@4x.png" alt="weather-icon">
//         <h6>${weatherInfo.weather[0].description}</h6>
//         </div>`;
//   } else { // HTML for the other five day forecast card, might try to make dynamically, but I am running out of time.
//     return `<li class="card">
//     <h3>(${weatherInfo.dt_txt.split(" ")[0]})</h3>
//     <img src="https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@4x.png" alt="weather-icon">
//     <h6>Temp: ${(weatherInfo.main.temp - 273.15).toFixed(2)}°C</h6>
//     <h6>Wind: ${weatherInfo.wind.speed} M/S</h6>
//     <h6>Humidity: ${weatherInfo.main.humidity}%</h6>
//     </li>`;
//   }
// }
// searchButton.addEventListener('click', currentWeather);
// searchButton.addEventListener('click', forecastWeather);
// searchButton.addEventListener('click', createWeatherCard);