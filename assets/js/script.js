var urlWeatherEndpoint = "https://api.openweathermap.org/data/2.5/weather?q=Dallas&appid=d7bcd9a8196a376ec618bad9fd98ff5d"
function currentWeather() {
  fetch(urlWeatherEndpoint).then(function (res) {
    if (res.ok) {
      return res.json()
    }
    // console.log(res)
  }).then(function (weatherInfo) {
    forecastWeather(weatherInfo.coord.lat, weatherInfo.coord.lon);
    console.log(weatherInfo)
  })
}
function forecastWeather(lat, lon) {
  var urlWeatherForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=d7bcd9a8196a376ec618bad9fd98ff5d`
  fetch(urlWeatherForecast).then(function (res) {
    if (res.ok) {
      return res.json()
    }
  }).then(function (weatherInfo) {
    console.log(weatherInfo)
  })
}
// forecastWeather();
currentWeather();