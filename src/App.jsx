import React, { useState } from "react";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const API_KEY = "6328fe28fb7d1d207be5565c0ed3d76d";

  const getWeather = async () => {
    if (!city) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      alert(error.message);
      setWeather(null);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getWeather();
  };

  // Use Unsplash to get city image; fallback to generic nature
  const backgroundImage = city
    ? `https://source.unsplash.com/1600x900/?${encodeURIComponent(city)}`
    : "https://source.unsplash.com/1600x900/?nature,sky";

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

      {/* Main weather card */}
      <div className="relative z-10 bg-white bg-opacity-80 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-md text-center">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-6">🌦️ Weather App</h1>

        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="flex-grow p-2 rounded-l-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md font-semibold transition"
          >
            Search
          </button>
        </form>

        {weather && weather.main && (
          <div>
            <h2 className="text-2xl font-bold text-blue-800">
              {weather.name}, {weather.sys.country}
            </h2>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather icon"
              className="mx-auto my-2"
            />
            <p className="text-4xl font-bold text-blue-700">
              {Math.round(weather.main.temp)}°C
            </p>
            <p className="capitalize text-gray-700 text-lg mb-4">
              {weather.weather[0].description}
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <p>💧 Humidity: {weather.main.humidity}%</p>
              <p>💨 Wind: {weather.wind.speed} m/s</p>
              <p>🔺 Max: {Math.round(weather.main.temp_max)}°C</p>
              <p>🔻 Min: {Math.round(weather.main.temp_min)}°C</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
