const currentWeather = document.querySelector("#current-weather");
const weatherCast = document.querySelector("#weather-cast");

function capitalize(phrase) {
  const words = phrase.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].slice(1);
  }

  return words.join(" ");
}

const API_KEY = "25d0cdc349df104e9328ed40b7e789f3";
const LON = "-64.1811";
const LAT = "-31.4135";
const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=imperial`;

// Fetching data from the API

async function fetchWeatherData() {
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    displayResults(data);
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    return null;
  }
}

fetchWeatherData();

function currentWeatherTemplate(data) {
  const temperature = document.createElement("p");
  temperature.innerHTML = `<b>${data.list[0].main.temp.toFixed(0)}</b> °F`;

  const description = document.createElement("p");
  description.textContent = capitalize(data.list[0].weather[0].description);

  const high = document.createElement("p");
  high.innerHTML = `<b>High:</b> ${data.list[0].main.temp_max.toFixed(0)} °F`;

  const low = document.createElement("p");
  low.innerHTML = `<b>Low:</b> ${data.list[0].main.temp_min.toFixed(0)} °F`;

  const humidity = document.createElement("p");
  humidity.innerHTML = `<b>Humidity:</b> ${data.list[0].main.humidity.toFixed(
    0
  )} %`;

  const sunrise = document.createElement("p");
  sunrise.innerHTML = `<b>Sunrise:</b> ${getHours12hTime(data.city.sunrise)}am`;

  const sunset = document.createElement("p");
  sunset.innerHTML = `<b>Sunset:</b> ${getHours12hTime(data.city.sunset)}pm`;

  currentWeather.appendChild(temperature);
  currentWeather.appendChild(description);
  currentWeather.appendChild(high);
  currentWeather.appendChild(low);
  currentWeather.appendChild(humidity);
  currentWeather.appendChild(sunrise);
  currentWeather.appendChild(sunset);
}

function getHours12hTime(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return `${hours}:${minutes} ${ampm}`;
}

function weatherCastTemplate(data) {
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = new Date();

  let weather1 = document.createElement("p");
  weather1.innerHTML = `Today: <b>${data.list[0].main.temp.toFixed(0)} °F</b>`;
  weatherCast.appendChild(weather1);

  let weather2 = document.createElement("p");
  weather2.innerHTML = `${
    weekDays[day.getDay() + 1]
  }: <b>${data.list[8].main.temp.toFixed(0)} °F</b>`;
  weatherCast.appendChild(weather2);

  let weather3 = document.createElement("p");
  weather3.innerHTML = `${
    weekDays[day.getDay() + 2]
  }: <b>${data.list[16].main.temp.toFixed(0)} °F</b>`;
  weatherCast.appendChild(weather3);
}

function displayResults(data) {
  currentWeather.innerHTML = "";
  weatherCast.innerHTML = "";

  currentWeatherTemplate(data);
  weatherCastTemplate(data);
}
