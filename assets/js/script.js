const citySearch = document.querySelector('.search-city')
const searchButton = document.querySelector('.search-btn')
// const cityName = `https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=a1de2c11560a7edb71cd7169547ca85a`

function currentWeather(cityName) {
  const urlWeatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&
  appid=e99afe44363c30c28c06ae20b2b37ae9`
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
  var urlWeatherForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=e99afe44363c30c28c06ae20b2b37ae9`
  fetch(urlWeatherForecast).then(function (res) {
    if (res.ok) {
      return res.json()
    }
  }).then(function (weatherInfo) {
    console.log(weatherInfo)
  })
}

// should be for the main card display
const createWeatherCard = (weatherInfo, index) => {
  if (index === 0) {
    return `<div class="details">
      <h2>${cityName} (${weatherInfo.dt_txt.split(" ")[0]})</h2>
      <h6>Temperature: ${(weatherInfo.main.temp - 273.15).toFixed(2)}°C</h6>
      <h6>Wind: ${weatherInfo.wind.speed} M/S</h6>
      <h6>Humidity: ${weatherInfo.main.humidity}%</h6>
      </div>
        <div class="icon">
        <img src="https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@4x.png" alt="weather-icon">
        <h6>${weatherInfo.weather[0].description}</h6>
        </div>`;
  } else { // HTML for the other five day forecast card
    return `<li class="card">
    <h3>(${weatherInfo.dt_txt.split(" ")[0]})</h3> 
    <img src="https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@4x.png" alt="weather-icon">
    <h6>Temp: ${(weatherInfo.main.temp - 273.15).toFixed(2)}°C</h6>
    <h6>Wind: ${weatherInfo.wind.speed} M/S</h6>
    <h6>Humidity: ${weatherInfo.main.humidity}%</h6>
    </li>`;
  }
}
searchButton.addEventListener('click', currentWeather);
