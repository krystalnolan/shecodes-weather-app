import axios from "axios";

let now = new Date();
let date = now.getDate();
let today = document.querySelector("#todays-date");
let year = now.getFullYear();
let hour = now.getHours();
let min = now.getMinutes();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

min = (min < 10 ? "0" : "") + min;

today.innerHTML = `${day} ${month} ${date}, ${year} ${hour}:${min}`;
/*
function farenheight(event) {
  event.preventDefault();
  let link = document.querySelector("#temperature");
  link.innerHTML = `77°F`;
}

let tempChange = document.querySelector("#farenheight");
tempChange.addEventListener("click", farenheight);

function celcius(event) {
  event.preventDefault();
  let link = document.querySelector("#temperature");
  link.innerHTML = `25°C`;
}

let tempCelcius = document.querySelector("#celcius");
tempCelcius.addEventListener("click", celcius);
*/

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let searchtext = document.querySelector("#city");
  searchtext.innerHTML = `${searchInput.value}`;
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function searchCity(city) {
  let apiKey = `195837c5bf2f571138b4c14bcf699b1e`;
  let cityapi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  console.log(cityapi);

  axios.get(`${cityapi}&appid=${apiKey}`).then(showTemperature);
}

function showTemperature(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;
}

function searchLocation(position) {
  let apiKey = "195837c5bf2f571138b4c14bcf699b1e";
  let cityapi = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(cityapi).then(showTemperature);
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);
