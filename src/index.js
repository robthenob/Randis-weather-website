let currentTimeElement = document.querySelector("#currentTime");
let now = new Date();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let day = now.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
day = days[now.getDay()];

currentTimeElement.innerHTML = `${day} ${hours}:${minutes}`;

function showCityAndTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let searchPositionTemp = document.querySelector("#currentTemp");
  searchPositionTemp.innerHTML = `${temperature}°C`;
  let city = response.data.name;
  let country = response.data.sys.country;
  let citySearch = document.querySelector("#city-name");
  citySearch.innerHTML = `${city}, ${country}`;
}
function searchCity(response) {
  let input = document.querySelector("#search-bar");
  let units = "metric";
  let city = input.value;
  let apiKey = "cf1e1f327071b0a9a112e3002f002b99";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCityAndTemp);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

function showTemperature(response) {
  console.log(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);
  let currentPositionTemp = document.querySelector("#currentTemp");
  currentPositionTemp.innerHTML = `${temperature}°C`;
  let city = response.data.name;
  let country = response.data.sys.country;
  let cityPosition = document.querySelector("#city-name");
  cityPosition.innerHTML = `${city}, ${country}`;
}

function showPosition(position) {
  console.log(position);
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let units = "metric";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "cf1e1f327071b0a9a112e3002f002b99";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let getCurrentPositionButton = document.querySelector("#currentPosition");
getCurrentPositionButton.addEventListener("click", getCurrentPosition);
