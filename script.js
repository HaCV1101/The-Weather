const timeE1 = document.getElementById("time");
const dateE1 = document.getElementById("date");
const currentWeatherItemsE1 = document.getElementById("current-weather-items");
const timezone = document.getElementById("time-zone");
const countryE1 = document.getElementById("country");
const weatherForecastE1 = document.getElementById("weather-forecast");
const currentTempE1 = document.getElementById("current-temp");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
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

setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
  const minutes = time.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";

  timeE1.innerHTML =
    (hoursIn12HrFormat < 10 ? "0" + hoursIn12HrFormat : hoursIn12HrFormat) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    " " +
    `<span id="am-pm">${ampm}</span>`;
  dateE1.innerHTML = days[day] + ", " + date + " " + months[month];
}, 1000);

getWeatherData();

function getWeatherData() {
  navigator.geolocation.getCurrentPosition((success) => {
    let { latitude, longitude } = success.coords;
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=21.0071107&lon=105.846911&exclude=hourly,minutely&units=metric&appid=49cc8c821cd2aff9af04c9f98c36eb74`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        showWeatherData(data);
      });
  });
}
function showWeatherData(data) {
  let { humidity, pressure, wind_speed, sunrise, sunset } = data.current;
  timezone.innerHTML = data.timezone;
  countryE1.innerHTML = data.lat + "N " + data.lon + "E";

  let timeRise = new Date(sunrise * 1000);
  let timeSet = new Date(sunset * 1000);
  let sunriseH = timeRise.getHours();
  let sunriseM = timeRise.getMinutes();
  let hoursIn12HrFormatSR = sunriseH >= 13 ? sunriseH % 12 : sunriseH;
  let ampmSR = sunriseH >= 12 ? "PM" : "AM";

  let sunsetH = timeSet.getHours();
  let sunsetM = timeSet.getMinutes();
  let hoursIn12HrFormatSS = sunsetH >= 13 ? sunsetH % 12 : sunsetH;
  let ampmSS = sunsetH >= 12 ? "PM" : "AM";
  var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  currentWeatherItemsE1.innerHTML = ` <div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}%</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressure}</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${wind_speed}</div>
    </div>
    <div class="weather-item">
        <div>Sunrise</div>
        <div id ='sunrise'>${hoursIn12HrFormatSR}:${sunriseM} <span>${ampmSR}</span></div>
        </div> 
        <div class="weather-item">
        <div>Sunset</div>
        <div id ='sunset'>${hoursIn12HrFormatSS}:${sunsetM}<span >${ampmSS}</span></div>
        </div>
        `;
  let otherDayForcast = "";
  data.daily.forEach((day, idx) => {
    let date = new Date(day.dt * 1000);
    var dayName = days[date.getDay()];
    if (idx == 0) {
      currentTempE1.innerHTML = `
      <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
      <div class="others">
          <div class="day">${dayName}</div>
          <div class="temp">Night -  ${day.temp.night}&#176; C</div>
          <div class="temp">Day - ${day.temp.day}&#176; C</div>
      </div>
      `;
    } else {
      otherDayForcast += `
      <div class="weather-forecast-item">
      <div class="day">${dayName}</div>
      <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
      <div class="temp">Night - ${day.temp.night}&#176; C</div>
      <div class="temp">Day - ${day.temp.day}&#176; C</div>
  </div>
      `;
    }
  });

  weatherForecastE1.innerHTML = otherDayForcast;
}
