import { useState } from "react"
import '../components/weatherCard.css'

const WeatherCard = ({weather, temp}) => {
    const [isCelsius, setIsCelsius] = useState(true)
    const hadleChange = () => {
        setIsCelsius(!isCelsius)
    }
  return (
    <article className="weather">
    <h1 className="weather__tilte">Weather APP</h1> 
    <h2 className="weather__sutitle">{weather?.name} {weather?.sys.country}</h2>  
    <section className="weather__body">
        <header className="weather__img">
        <img className="weather__icom" src={weather && `https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`}alt="" />
        </header>
        <article className="weather__info">
            <h3 className="weather__info__title">{weather?.weather[0].description}</h3>
                <ul className="weather__list">
                    <li className="weather__item"><span className="weather__label">Wind speed: </span><span className="weather__value">{weather?.wind.speed}m/s</span></li> 
                    <li className="weather__item"><span className="weather__label">Clouds: </span><span className="weather__value">{weather?.clouds.all}%</span></li>
                    <li className="weather__item"><span className="weather__label">Pressure: </span><span className="weather__value">{weather?.main.pressure}hPa</span></li>
                </ul>
        </article>
    </section> 
    <footer className="weather__footer">
        <h2 className="weather__temp">{isCelsius
        ? `${temp?.celsius} °C`
        : `${temp?.fahrenheit} °F`
        }</h2>
        <button className="weather__btn" onClick={hadleChange}>Change Temperture</button>
    </footer>
    </article>
  )
}

export default WeatherCard