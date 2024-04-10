//weather Application using XMLhttpRequest()
const temp = document.querySelector("#temperature");
const desc = document.querySelector("#description");
const icon = document.querySelector("#icon");
const weather = document.querySelector(".weather-container");
var form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  var city = event.target[0].value;
  //console.log(city);
  getWeatherdata(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=634fb04c4809aebfaed5160edb4f336d&units=metric`
  );
});

var getWeatherdata = (url, method = "GET") => {
  let request = new XMLHttpRequest();
  request.addEventListener("readystatechange", () => {
    if (request.readyState === 4 && request.status === 200) {
      const data = JSON.parse(request.responseText);
      updatedWeather(data);
    } else if (request.readyState === 4 && request.status !== 200) {
      console.log("Something Went Wrong");
    }
  });
  request.open(method, url);
  request.send();
};

var updatedWeather = (data) => {
  temp.textContent = `${data.main.temp}°C`;
  desc.textContent = `${data.weather[0].description}`;
  icon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  weather.style.display = "block";
};
