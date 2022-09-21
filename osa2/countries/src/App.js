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
