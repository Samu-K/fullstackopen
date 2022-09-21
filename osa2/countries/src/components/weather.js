import {useState} from "react";
import getWeather from "../calls/weather"

const Weather = ({capital}) => {
    const [weather,setWeather] = useState()
    
    getWeather(capital).then(e => setWeather(e))

    if (weather === undefined) {
        return (
            <>
                <h1>Weather in {capital}</h1>
                <p>Loading...</p>
            </>
        )
    } else {
        return(
        <div>
            
            <p>Temperature {weather.temp}</p>
            <p>Wind {weather.windspeed}</p>
        </div>
        )
    }
}

export default Weather;