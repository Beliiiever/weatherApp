/* eslint-disable no-unused-vars */
import React, { useState } from 'react'

const App = () => {
  const [weather, setWeather] = useState(null)
  const [city,setCity] = useState("")
  const API_KEY = '6328fe28fb7d1d207be5565c0ed3d76d'
  const getWeather = async () =>{
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      )
      if(!response.ok) throw new Error("city not found");
      const data = await response.json();
      setWeather(data)
  }catch (error){
    alert(error.message)
    setWeather(null)
  }
}
  const handler = (e) =>{
     e.preventDefault();
     getWeather();
  }
  return (
    <div>
      <h1>Weather in city is </h1>
      <form onSubmit={handler}> 
        <input className='bg-amber-100 border' type="text" 
        value={city}
        placeholder='enter your city'
        onChange={(e)=>setCity(e.target.value)} />
        <button type='submit' className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md font-semibold transition" >Search</button>
      </form>
      {weather && weather.main &&(
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
  )
}

export default App