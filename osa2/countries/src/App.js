import {useState, useEffect} from "react";
import axios from "axios";

const ShowList = ({countries,currentFilter}) => {
  const countriesToShow = countries.filter(
    country => country.name.common.toLowerCase()
    .includes(currentFilter.toLowerCase())
  )

  if (countriesToShow.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  } else if (countriesToShow.length===1) {
    const api_key = process.env.REACT_APP_API_KEY
    const country = countriesToShow[0]
    const languages = Object.values(country.languages)

    const weather_url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${country.name.common}?unitGroup=metric&key=${api_key}&contentType=json`

    const weather = fetch(weather_url, {
      "method": "GET",
      "headers": {
      }
    })
    .then(response => response.json())
    .then(data => {return data})

    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>

        <h2>languages:</h2>
        <ul>
            {languages.map(language => <li>{language}</li>)}
        </ul>
        <div>
          <img src={country.flags.png} alt="country flag"/>
        </div>

        <h2>Weather in {country.capital}</h2>

      </div>
    )
  } else {
    return(
      <div>
        {countriesToShow.map(country => <li>{country.name.common}</li>)}
      </div>
    )
  }
}

const App = () => {
  const [countries,setCountries] = useState([])
  const [currentFilter,setCurrentFilter] = useState("")

  const handleFilterChange = (event) => {
    setCurrentFilter(event.target.value)
  }

  useEffect(()=> {
    axios
    .get("https://restcountries.com/v3.1/all")
    .then(response => setCountries(response.data))
  },[])

  return (
    <div>
      <h2>Test</h2>
      <form>
        filter countries <input value={currentFilter} onChange={handleFilterChange}/>
      </form>
      <ul>
        <ShowList countries={countries} currentFilter={currentFilter}/>
      </ul>
    </div>
  );
}

export default App;
