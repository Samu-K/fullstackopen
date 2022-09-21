import axios from "axios"

const getWeather = async capital => {
    const api_key = process.env.REACT_APP_API_KEY
    const weather_url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${capital}?unitGroup=metric&key=${api_key}&contentType=json`
    const response = await axios.get(weather_url)
    return response.data.currentConditions
}

export default getWeather;