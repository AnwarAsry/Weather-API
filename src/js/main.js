import '../css/style.css';
import searchIMG from '../../images/search.png'; 
import humidCond from '../../images/humidity.png'; 
import windCond from '../../images/wind.png'; 
import sunnyIMG from '../../images/clear.png'; 
import cloudyIMG from '../../images/clouds.png'; 
import drizzleIMG from '../../images/drizzle.png'; 
import mistIMG from '../../images/mist.png'; 
import rainIMG from '../../images/rain.png'; 
import snowIMG from '../../images/snow.png'; 

document.querySelector('body').innerHTML = `
  <div class="form">
    <form action="#" method="get">
      <input id="what-city" type="text" placeholder="Enter City"/>
      <button id="form-button"><img src="${searchIMG}" alt="search"/></button>
    </form>
    <section id="weather-now" class="text">
      <img id="state" src=""/>
      <p id="degree"></p>
      <p id="city"></p>
    </section>
    <section id="weather-conditions">
      <div>
        <div class="condition">
          <div class="div-nextTo">
            <img src="${humidCond}"/>
          </div>
          <div class="div-nextTo">
            <p id="humid" class="text"></p>
          </div>
        </div>
        <p id="what-state" class="text">Humidity</p>
      </div>
      <div>
        <div class="condition">
          <div class="div-nextTo">
            <img src="${windCond}"/>
          </div>
          <div class="div-nextTo">
            <p id="wind-speed" class="text"></p>
          </div>
        </div>
        <p id="what-state" class="text">Wind Speed</p>
      </div>
    </section>
  </div>
`



const apiKey = "589bc44c8f784d999b891052230611";
const apiURL = "http://api.weatherapi.com/v1/current.json?";

async function checkWeather(city) {
  const response = await fetch(apiURL + `q=${city}` + `&key=${apiKey}`)
  let data = await response.json();

  console.log(data);
  document.querySelector("#city").innerHTML = data.location.name;
  document.querySelector("#degree").innerHTML = `${Math.round(data.current.temp_c)}&degC`;
  document.querySelector("#humid").innerHTML = `${data.current.humidity}%`;
  document.querySelector("#wind-speed").innerHTML = `${data.current.wind_kph} km/h`;

  if (data.current.condition.text == "Snowy") {
    document.querySelector("#state").src = `${snowIMG}`;
  }
  if (data.current.condition.text == "Sunny") {
    document.querySelector("#state").src = `${sunnyIMG}`;
  }
  if (data.current.condition.text == "Partly cloudy" || data.current.condition.text == "Cloudy") {
    document.querySelector("#state").src = `${cloudyIMG}`;
  }
  if (data.current.condition.text == "Light rain" || data.current.condition.text == "Moderate rain" || data.current.condition.text == "Shower") {
    document.querySelector("#state").src = `${drizzleIMG}`;
  }
}

const formInp = document.getElementById("what-city");
const formBtn = document.getElementById("form-button");
formBtn.addEventListener("click", () => {
  checkWeather(formInp.value);
});

