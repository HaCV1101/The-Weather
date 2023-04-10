const timeE1 = document.getElementById("time");
const dateE1 = document.getElementById("date");
const currentWeatherItemsE1 = document.getElementById("current-weather-items");
const timezone = document.getElementById("time-zone");
const countryE1 = document.getElementById("country");
const weatherForecastE1 = document.getElementById("weather-forecast");
const currentTempE1 = document.getElementById("current-temp");
// const API_KEY = "CmU6KKmDGfEHXRTxL51WmxGRrhMNj3ka";
const API_KEY = "0c9714a0ff2cf7a4d29563feb0100069";
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
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`
      // `https://dataservice.accuweather.com/forecasts/v1/daily/5day/353412?apikey=CmU6KKmDGfEHXRTxL51WmxGRrhMNj3ka&language=en&detail=true`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        showWeatherData(data);
      });
  });
}

function showWeatherData(data) {
  let { humidity, pressure } = data.main;
  let { speed } = data.wind;
  let { sunrise, sunset } = data.sys;
  timezone.innerHTML = data.sys.country + "/" + data.name;
  countryE1.innerHTML = data.coord.lat + "N " + data.coord.lon + "E";

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
        <div>${speed}</div>
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
  //   data.daily.foreach();
}
