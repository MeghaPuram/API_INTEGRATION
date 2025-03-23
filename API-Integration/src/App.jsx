
import axios from "axios";
import { WiThermometer, WiHumidity, WiStrongWind, WiBarometer } from "react-icons/wi";
import { FaSun, FaMoon, FaSearch } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { useEffect, useState } from "react";
import { TiWeatherPartlySunny } from "react-icons/ti";

const API_KEY = "8993720a422ae0412701e6ee39139cad";
const weatherImages = {
  Clear: "https://cdn-icons-png.flaticon.com/512/869/869869.png",
  Clouds: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
  Rain: "https://cdn-icons-png.flaticon.com/512/1163/1163657.png",
  Snow: "https://cdn-icons-png.flaticon.com/512/4834/4834553.png",
  Thunderstorm: "https://cdn-icons-png.flaticon.com/512/1779/1779940.png",
  Drizzle: "https://cdn-icons-png.flaticon.com/512/1724/1724378.png",
  Mist: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
};
function App() {

  const [city, setCity] = useState("Nagpur");
  const [weather, setWeather] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const fetchWeather = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const fetchCurrentLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
          );
          setWeather(response.data);
        } catch (error) {
          console.error("Error fetching location weather:", error);
        }
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (

    <div className={darkMode ? "bg-gray-800 text-white min-h-screen" : "bg-gray-100 text-black min-h-screen"}>
      <button className="my-1 absolute right-15  p-2 border rounded-full " onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          <div className="flex justify-center p-4">
            <TiWeatherPartlySunny size={100}/>
          </div>
          
      <h1 className=" my-3 text-center text-xl font-bold">Welcome to Weather App</h1>


      <div className="flex justify-center p-4">
        <input
          type="text"
          className="p-2 relative border rounded-lg bg-gray-300 text-gray-900 bg-opacity-60 placeholder-gray-200 "
          placeholder="Search your city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className=" ml-2 z-10 p-2 bg-gray-500 text-white rounded-lg" onClick={() => fetchWeather(city)}>
          <FaSearch />
        </button>
        <button className="ml-2 p-2 bg-gray-500 text-white rounded-lg" onClick={fetchCurrentLocationWeather}>
          <GrLocation />
        </button>
        <div className="flex justify-center items-center">
          
        </div>
      </div>



      {weather && (
        <div className="max-w-md mx-auto bg-gray-300 p-4 rounded-lg drop-shadow-xl mt-4">

          <h2 className="text-center text-xl font-bold text-gray-900">{weather.name}, {weather.sys.country}</h2>
          <p className="text-center text-gray-600">{new Date().toLocaleString()}</p>
          <div className="flex justify-center mt-4">
            <p className="font-bold text-5xl text-pink-800 mb-2">{Math.round(weather.main.temp)}&deg;C</p>
            <img src={weatherImages[weather.weather[0].main]} alt={weather.weather[0].main} className="w-20 h-20 ml-4" />
          </div><p className="text-center text-lg uppercase font-semibold mt-2  text-gray-900">{weather.weather[0].description}</p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-gray-100 text-gray-900 rounded-lg flex items-center justify-between">
              <WiThermometer size={24} /> <span>Feels Like</span>
              <span>{weather.main.feels_like}°C</span>
            </div>
            <div className="p-4 bg-gray-100 text-gray-900 rounded-lg flex items-center justify-between">
              <WiHumidity size={24} /> <span>Humidity</span>
              <span>{weather.main.humidity}%</span>
            </div>
            <div className="p-4 bg-gray-100 text-gray-900 rounded-lg flex items-center justify-between">
              <WiStrongWind size={24} /> <span>Wind</span>
              <span>{weather.wind.speed} m/s</span>
            </div>
            <div className="p-4 bg-gray-100 text-gray-900 rounded-lg flex items-center justify-between">
              <WiBarometer size={24} /> <span>Pressure</span>
              <span>{weather.main.pressure} hPa</span>
            </div>
          </div>
        </div>
      )}
    </div>

  )
}

export default App
