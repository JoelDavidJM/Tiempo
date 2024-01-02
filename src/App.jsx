
import { useEffect } from 'react'
import './App.css'
import { useState } from 'react'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'

function App() {

  const [coords, setCoords] = useState()
  const [weather, setweather] = useState()
  const [temp, setTemp] = useState()
  const [isloading, setIsloading] = useState(true)
 
  const success = pos => {
    const obj = {
      lat: pos.coords.latitude,
      long: pos.coords.longitude
    }
    setCoords(obj)
  }


  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    setIsloading(true)
    navigator.geolocation.getCurrentPosition(success, error)
  }, [])

  useEffect(() => {
    if(coords){
        const API__KEY = '31b08cae0cd087d31c31dfab2e6a0bad'
        const {lat, long} = coords
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API__KEY}`
      axios.get(url)
      .then(res => { 
        setweather(res.data)
        const objeto = {
          celsius: ((res.data.main.temp - 273.15)).toFixed(1),
          fahrenheit: ((res.data.main.temp - 273.15) * 9 / 5 + 32).toFixed(1)
        }
        setTemp(objeto)
      })
      .catch(err => console.log(err))
      .finally(() => setIsloading(false))
    }
  }, [coords])

  return (
   <div className='app'>
    {
        isloading 
        ? <img className='app__loading' src="https://torresburriel.com/wp-content/uploads/2022/03/barra-de-progreso.gif" alt="" /> 
        : <WeatherCard weather={weather}
        temp={temp}
        />
      }
   </div>
  )
}

export default App
