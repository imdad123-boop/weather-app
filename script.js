const API_KEY = "5c6d0d5752501f2f698d79e413ceb14a";  

const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-button");
const weatherIcon = document.getElementById("weather-icon");
const temperatureEl = document.getElementById("temperature");
const cityEl = document.getElementById("city");
const humidityEl = document.getElementById("humidity");
const windSpeedEl = document.getElementById("wind-speed");
const weatherSection = document.getElementById("weather-section"); // Weather section element

async function getWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        
        if (data.cod === 200) {
            displayWeather(data);
        } else if (data.cod === "404") {
            alert("invalid city.");
        } else {
            alert("An error occurred. Please try again later.");
        }
    } catch (error) {
        alert("Error fetching the weather data.");
        console.error(error);  
    }
}


function displayWeather(data) {
    const { temp } = data.main;
    const { description, icon } = data.weather[0];
    const { humidity } = data.main;
    const { speed } = data.wind;
    const { name, sys } = data;

    temperatureEl.textContent = `${Math.round(temp)}°C`;
    cityEl.textContent = `${name}, ${sys.country}`;
    humidityEl.textContent = `${humidity}%`;
    windSpeedEl.textContent = `${Math.round(speed)} km/h`;

    weatherIcon.src = `https://openweathermap.org/img/wn/${icon}.png`;

    
    weatherSection.style.display = "block"; 
}

searchButton.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
      
        weatherSection.style.display = "none";  
        getWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});

getWeather("New York");
