const citySearch = document.querySelector('.search-city')
const searchButton = document.querySelector('.search-btn')
const cityName = citySearch
const urlWeatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=Dallas&
appid=d4f3cbc3f357360fd4b9df2654abf4ae`

function currentWeather() {
  fetch(urlWeatherEndpoint).then(function (data) {
    if (data.ok) {
      return data.json()
    }
    // console.log(data)
  }).then(function (weatherInfo) {
    forecastWeather(weatherInfo.coord.lat, weatherInfo.coord.lon);
    console.log(weatherInfo)
  })
}
// forecasting weather 
function forecastWeather(lat, lon) {
  var urlWeatherForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=d4f3cbc3f357360fd4b9df2654abf4ae`
  fetch(urlWeatherForecast).then(function (res) {
    if (res.ok) {
      return res.json()
    }
  }).then(function (weatherInfo) {
    console.log(weatherInfo)
  })
}

// should be for the main card display
const createWeatherCard = (cityName, weatherItem, index) => {
  if (index === 0) {
    return `<div class="details">
      <h2>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2>
      <h6>Temperature: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
      <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
      <h6>Humidity: ${weatherItem.main.humidity}%</h6>
      </div>
        <div class="icon">
        <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
        <h6>${weatherItem.weather[0].description}</h6>
        </div>`;
  } else { // HTML for the other five day forecast card
    return `<li class="card">
    <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3> 
    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
    <h6>Temp: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
    <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
    <h6>Humidity: ${weatherItem.main.humidity}%</h6>
    </li>`;
  }
}
searchButton.addEventListener('click', currentWeather);
